import './App.css';
import Register from './Component/User/Register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Component/User/Login';
import Home from './Component/Home/Home';
import { createContext, useEffect, useState } from 'react';
import Shop from './Component/Home/Shop/Shop';
import Cart from './Component/Home/Cart/Cart';
import Payment from './Component/Home/Payment/Payment';
import { validateCpassword, validateEmail, validateMnumber, validateName, validatePassword } from './ValidationUser';
import NavBar from './Component/Home/NavBar/Nav';
import Category from './Component/Home/Shop/Catgrs/Category'
import Viewproduct from './Component/Home/Shop/Viewproduct';
import Search from './Component/Home/Search/Search';
import Admin from './Component/User/Admin/Admin';
import Products from './Component/User/Admin/Products/Products';
import Users from './Component/User/Admin/users/Users';
import Productview from './Component/User/Admin/Products/Productview';
import Addproduct from './Component/User/Admin/Products/Addproduct';
import Viewusers from './Component/User/Admin/users/Viewusers';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import OrderDetails from './Component/Home/userOrders/OrderDetails';
import ViewCategory from './Component/User/Admin/Products/ViewCatgr/ViewCategory';
import AddCategory from './Component/User/Admin/Products/ViewCatgr/AddCategory';
import Orders from './Component/User/Admin/OrdersDetails/Orders';
import SingleOrderDetails from './Component/User/Admin/OrdersDetails/SingleOrderDetails'




export const Mycontext = createContext()




function App() {


  const [adminlogin, setadminlogin] = useState(false)
  const nav = useNavigate()

  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)

  // Signup //

  const [valUser, setvalUser] = useState({})
  const validateUser = async (name, email, mnumber, password, cpassword) => {
    if (validateName(name) && validateEmail(email) && validateMnumber(mnumber) && validatePassword(password) && validateCpassword(cpassword, password)) {
      try {
        let res = await axios.post("https://localhost:7115/api/User/REGISTER", {
          name: name,
          mail: email,
          password: password
        });
        let result = await res.data
        setvalUser(result);
        nav('/login')
      } catch (err) {
        console.error(err);
      }
    }
  }

  // Login //

  const [login, setlogin] = useState({})
  const [ifLogin, setifLogin] = useState(false)
  const LoginUser = async (login) => {
    if (validateEmail(login.email) && validatePassword(login.password)) {
      try {
        let res = await axios.post("https://localhost:7115/api/User/LOGIN", {
          mail: login.email,
          password: login.password
        })
        let result = await res.data
        const dectoken = jwtDecode(result.token)
        Cookies.set('role', dectoken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"], { expires: 1 / 24, secure: true })
        Cookies.set('token', result.token, { expires: 1 / 24, secure: true })
        setToken(result.token)
        Cookies.set('email', result.email, { expires: 1 / 24, secure: true })
        Cookies.set('name', result.name, { expires: 1 / 24, secure: true })
        if (dectoken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'Admin') {
          nav('/Admin')
          setadminlogin(true)
        } else {
          nav('/')
          setlogin(result)
          setifLogin(true)
        }
      } catch (err) {
        toast.error(err.response.data);
      }
    }
    else {
      toast.error("Email or Password is incorrect !!!!")
    }
  }
  


  //  Logout //


  const Logout = () => {
    setifLogin(false)
    Cookies.remove('token')
    Cookies.remove('email')
    Cookies.remove('name');
    Cookies.remove('role');
    setRole(null)
    setToken(null)
    setadminlogin(false)
    nav('/')
  };



  // Shop //

  const [products, setProducts] = useState([{}])
  const Product = async () => {
    try {
      let res = await axios.get('https://localhost:7115/api/Product/ALL PRODUCTS')
      let result = await res.data
      setProducts(result)
    } catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    setToken(Cookies.get('token'))
    Product()
  }, [products , token , login , ifLogin])


  // search //
  const [search, setsearch] = useState(" ")
  const [searchresult, setsearchresult] = useState([{}])
  const searchpro = async () => {
    try {
      const res = await axios.get(`https://localhost:7115/api/Product/SEARCH?Name=${search}`)
      const result = await res.data
      setsearchresult(result)
      nav('/Search')
    } catch(err){
      console.error(err)
    }
  }

  // Add To Cart //
  const Addcart = async (id) => {
    try {
       let res = await axios.post(`https://localhost:7115/api/Cart/ADD TO CART?productid=${id}`,null,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
       let result = res.data
       toast.success(result,"Item Added to cart")
      } catch {
        toast.error("Oops! It looks like you need to log in first before adding products to your cart. Please login to continue shopping.")
        nav('/Login')
      }
    } 

  //  Buyitem //

  const [orderStatus , setOrderStatus] = useState(false)
  const [ordersec, setOrderSec] = useState([{}]);
  const [orderItems, setOrderItems] = useState([{}])
  const [totalPrice , setTotalPrice] = useState(0)
  const PlaceOrder =(cart , total) => {
    try{
       setOrderItems(cart)
        setTotalPrice(total)
        nav('/Payment')
      }catch(err){
        console.log(err)  
      }
  } 


  return (
    <div className="App">
      <div><Toaster /></div>
      <Mycontext.Provider value={{adminlogin }}>
        <NavBar Logout={Logout} Loguser={login} ifLogin={ifLogin} adminlogin={adminlogin} searchpro={searchpro} setsearch={setsearch} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/register" element={<Register validateUser={validateUser} />} />
          <Route path="/login" element={<Login LoginUser={LoginUser} />} />
          <Route path='/Shop' element={<Shop Addcart={Addcart} nav={nav} Product={products} />} />
          <Route path='/Cart' element={<Cart token={token} adminlogin={adminlogin} ifLogin={ifLogin} LoginUser={LoginUser} orderItems={orderItems} PlaceOrder={PlaceOrder} Token={token}/>} />
          <Route path='/Payment' element={<Payment Loguser={login} PlaceOrder={PlaceOrder} totalPrice={totalPrice} Token={token} orderItems={orderItems} />} />
          <Route path='/OrderDetails' element={<OrderDetails Loguser={login} ifLogin={ifLogin} token={token}/>}/>
          <Route path='/Category/:type' element={<Category Addcart={Addcart} nav={nav} />} />
          <Route path='/Viewproduct/:id' element={<Viewproduct Product={products} Addcart={Addcart} />} />
          <Route path='/Search' element={<Search searchresult={searchresult} />} />
          <Route path='/Admin' element={<Admin Token={token} adminlogin={adminlogin}/>} />
          <Route path='/Products' element={<Products nav={nav} Token={token} adminlogin={adminlogin}/>} />
          <Route path='/Productview/:id' element={<Productview nav={nav} Token={token} adminlogin={adminlogin}/>} />
          <Route path='/ViewCategory/:type' element={<ViewCategory nav={nav} Token={token} adminlogin={adminlogin}/>} />
          <Route path='/Users' element={<Users nav={nav} valUser={valUser} Token={token} adminlogin={adminlogin}/>} />
          <Route path='/Viewusers/:id' element={<Viewusers valUser={valUser} setvalUser={setvalUser} loguser={login} Token={token} adminlogin={adminlogin}/>} />
          <Route path='/Addproduct' element={<Addproduct nav={nav} Token={token} adminlogin={adminlogin}/>} />
          <Route path='/AddCategory' element={<AddCategory Token={token} adminlogin={adminlogin}/>} />
          <Route path='/Orders' element={<Orders Token={token} adminlogin={adminlogin}/>} />
          <Route path='/SingleOrderDetails/:id' element={<SingleOrderDetails Token={token} adminlogin={adminlogin}/>} />
        </Routes>
      </Mycontext.Provider>
    </div>
  );
}

export default App;
