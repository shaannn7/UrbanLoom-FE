import React from 'react'
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { Mycontext } from '../../../../App';
import axios from 'axios';
import { Cookie } from 'react-bootstrap-icons';
import Cookies from 'js-cookie';
import { BiBlock } from "react-icons/bi";
import { CgUnblock } from "react-icons/cg";
import toast from 'react-hot-toast';


const Viewusers = ({ adminlogin, Token }) => {

  const nav = useNavigate()

  const [finduser, setfinduser] = useState({})
  const [block, setblock] = useState()
  const [orders, setorders] = useState([{}])
  const [orderstatus, setorderstatus] = useState()

  
  
  const { id } = useParams()
  const idd = parseInt(id)


  useEffect(() => {

    const openuser = async () => {
      try {
        let user = await axios.get(`https://localhost:7115/api/User/USER=${idd}`, {
          headers: {
            "Authorization": `Bearer ${Cookies.get('token')}`
          }
        })
        setfinduser(user.data)
      } catch (err) {
        console.log(err);
      }
    }
    openuser()


    const Orderdetails = async () => {
      try {
        const tkn = Cookies.get('token')
        let ordersdet = await axios.get(`https://localhost:7115/api/Order/USER ORDERS?userid=${idd}`, {
          headers: {
            "Authorization": `Bearer ${tkn}`
          }
        })
        setorders(ordersdet.data)
      } catch (err) {
        console.log(err);
      }
    }
    Orderdetails()

  }, [block,orders])

  const BlockUser = async () => {
    try {
      let response = await axios.put(`https://localhost:7115/api/User/BLOCK-USER?userId=${idd}`, null, {
        headers: {
          "Authorization": `Bearer ${Token}`
        }
      })
      let result = await response.data
      
      setblock(result)
      toast.success("BLOCKED")
    } catch (err) {
      console.log(err)
    }
  }
  const UnBlockUser = async () => {
    try {
      let response = await axios.put(`https://localhost:7115/api/User/UNBLOCK-USER?userId=${idd}`, null, {
        headers: {
          "Authorization": `Bearer ${Token}`
        }
      })
      let result = await response.data
      setblock(result)
      toast.success("UNBLOCKED")
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div>
      {adminlogin && Token ?
        <>
          <div>
            <h4 style={{ color: "grey" }}>{finduser.mail} - {finduser.role}</h4>
            <h4 style={{ color: "silver" }}>ID : {finduser.id}</h4>
            <h4 style={{ color: "silver" }}>{block}</h4>
            {
              finduser.isBlocked == false ?
                <>
                  <button style={{border:"none" , backgroundColor:"transparent" , fontSize:"25px" , color:"red"}} onClick={() => BlockUser(idd)}><BiBlock /></button>
                </> :
                <>
                  <button style={{border:"none" , backgroundColor:"transparent" , fontSize:"25px" , color:"green"}} onClick={() => UnBlockUser(idd)}><CgUnblock /></button>
                </>
            }
          </div>
          <br /><br />
          <div className='m-4'>
            <h4 style={{ color: "sienna" }}>ORDER DETAILS</h4>
            <Table striped bordered hover >
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Product Name</th>
                  <th>Total Price</th>
                  <th>Qty</th>
                  <th>OrderDate</th>
                  <th>OrderId</th>
                  <th>OrderStatus</th>
                </tr>
              </thead>
              {
                orders?.map((x) => (
                  <tbody>
                    <tr>
                      <td>{x.id}</td>
                      <td>{x.productName}</td>
                      <td>{x.totalPrice} ₹</td>
                      <td>{x.quantity}</td>
                      <td>{x.orderDate}</td>
                      <td>{x.orderId}</td>
                      <td>{x.orderStatus}</td>
                    </tr>
                  </tbody>
                )
                )
              }
            </Table>
          </div>
          <div>
          </div>
        </> : <h3 style={{ color: "red" }}>ACCESS DENIED</h3>
      }
    </div>
  )
}

export default Viewusers