import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas'
import './Nav.css'
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaRegCircleUser } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';




function NavBar({ Logout, Loguser, ifLogin, searchpro, setsearch,adminlogin }) {

  const nav = useNavigate()
  const ToCart=()=>{
    if(ifLogin || adminlogin == true){
      nav('/Cart')
    }else{
      nav("/login")
      toast.error("Oops! It looks like you need to log in first before checking your cart. Please login.")
    }
  }


  const[categ, setcateg]=useState([{}])
  const getcateg = async()=>{
    try{
      let res = await axios.get("https://localhost:7115/api/Category/CATEGORIES")
      setcateg(res.data)
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{    
      getcateg()
     
  },[]) 


  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="NavBar mb-3" style={{ zIndex: '2', marginTop: "-10px", marginBottom: "0px", alignContent: "center" }} >
          <Container fluid>
            <Navbar.Brand href="/" >
              <Link to={'/'}>
                <img className='Logo' src={require('./Logo/LogoF.png')} alt='Logo' />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src={require('./Logo/LogoF.png')} />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">

                  <Nav.Link href=""><Link className='NavPages' to={'/'}><h4>HOME</h4></Link></Nav.Link>
                  <Nav.Link href=""><Link className='NavPages' to={'/Shop'}><h4>SHOP</h4></Link></Nav.Link>
                  <Nav.Link href=""><Link className='NavPages' to={'/Cart'} onClick={()=>ToCart()}><h4>CART</h4></Link></Nav.Link>

                  <div style={{ position: 'relative', top: '3px' }}>
                    <DropdownButton id="dropdown-basic-button" title="CATEGORIES" className='noborderbutton'>
                    {categ?.map((catg)=>( 
                      <Dropdown.Item style={{ backgroundColor: 'inherit' }}><Link className='NavPages' to={`/Category/${catg.catagoryName}`}><h5>{catg.catagoryName}</h5></Link></Dropdown.Item>
                    ))}
                    </DropdownButton>
                  </div>


                  <Nav.Link href="">
                    <Link className='NavPages'>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title={<FaRegCircleUser style={{ fontSize: '20px' }} />}
                        className='noborderbutton'
                        style={{ padding: '2px 2px', fontSize: '10px' }}
                      >
                        <h6 style={{ textAlign: "center", color: "gray", margin: 2 }}>{Loguser.name}</h6>
                        {
                          ifLogin|| adminlogin?
                            <Dropdown.Item style={{ textAlign: "center", padding: '2px 2px', fontSize: '10px' , backgroundColor: 'inherit' }}>
                              <Link className='NavPages' to={'/OrderDetails'}><h6>ORDER DETAILS</h6></Link>
                              <Link className='NavPages' to={'/'} onClick={Logout}><h6>LOGOUT</h6></Link>
                            </Dropdown.Item> :
                            <Dropdown.Item style={{ textAlign: "center", padding: '2px 2px', fontSize: '10px' , backgroundColor: 'inherit'  }}>
                              <Link className='NavPages' to={'/Login'}><h6>LOGIN</h6></Link>
                            </Dropdown.Item>
                        }
                      </DropdownButton>
                    </Link>
                  </Nav.Link>



                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="searchspace me-2"
                      aria-label="Search"
                      onChange={(e) => setsearch(e.target.value)}
                    />
                    <Button variant='secondary' className='Search' onClick={searchpro}>Search</Button>
                  </Form>


                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBar;