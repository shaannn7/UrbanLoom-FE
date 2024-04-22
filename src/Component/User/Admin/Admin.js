import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Mycontext } from '../../../App';
import { Card } from 'react-bootstrap';
import axios from 'axios';

const Admin = ({ Token }) => {

  const nav = useNavigate()
  const { adminlogin } = useContext(Mycontext)

  const [TotalOrders , setTotalOrders]=useState(0)
  const [TotalRevenue , setTotalRevenue]=useState(0)

  const [TodaysTotalOrders , SetTodaysTotalOrders] = useState(0)
  const [TodaysTotalRevenue , SetTodaysTotalRevenue]=useState(0)


  useEffect(() => {
    const TotalOrdersCount = async () => {
      try {
        let res = await axios.get("https://localhost:7115/api/Order/TOTAL ORDERS", {
          headers: { Authorization: `Bearer ${Token}` }
        })
        setTotalOrders(res.data)
      }catch(err){
        console.log(err);
      }
    }
    TotalOrdersCount()

    const TotalRevenue = async()=>{
      try{
        let res = await axios.get("https://localhost:7115/api/Order/TOTAL REVENUE",{
          headers:{Authorization:`Bearer ${Token}`}
        })
        setTotalRevenue(res.data)
      }catch(err){
        console.log(err);
      }
    }
    TotalRevenue()

    const TodaysTotOrder = async()=>{
      try{
        let res = await axios.get("https://localhost:7115/api/Order/TODAYS TOTAL ORDERS",{
          headers:{Authorization:`Bearer ${Token}`}
        })
        SetTodaysTotalOrders(res.data)
      }catch(err){
        console.log(err);
      }
    }
    TodaysTotOrder()

    const TodaysTotRevenue = async () =>{
      try{
        let res = await axios.get("https://localhost:7115/api/Order/TODAYS TOTAL REVENUE",{
          headers:{Authorization:`Bearer ${Token}`}
        })
        SetTodaysTotalRevenue(res.data)
      }catch(err){
        console.log(err);
      }
    }
    TodaysTotRevenue()


  },[TotalOrders,TotalRevenue,Token,TodaysTotalOrders,TodaysTotalRevenue])

  return (
    <div>
      {adminlogin && Token?
        <>
          <h3 style={{ color: "sienna", marginTop: "0px" }}>Hello , Admin </h3>
          <div className='row-6  d-flex ' style={{ color: "sienna", justifyContent: "center" }}>
            <h3 className='col-2  mt-2 me-5'>PRODUCTS</h3>
            <h3 className='col-2  mt-2 ms-5'>USERS</h3>
            <h3 className='col-2  mt-2 ms-5'>ORDERS</h3>
          </div>
          <div className='row ' style={{ color: "sienna", padding: "1px" }}>
            <Button className='col-4' style={{ paddingl: "5px", textDecoration: "none", backgroundColor: "white", color: "sienna", fontSize: "20px", fontWeight: "1000px", borderColor: "sienna" }} onClick={() => nav('/Products')}>Product Details</Button>
            <Button className='col-4' style={{ padding: "5px", textDecoration: "none", backgroundColor: "white", color: "sienna", fontSize: "20px", fontWeight: "1000px", borderColor: "sienna" }} onClick={() => nav('/Users')}>User Details</Button>
            <Button className='col-4' style={{ padding: "5px", textDecoration: "none", backgroundColor: "white", color: "sienna", fontSize: "20px", fontWeight: "1000px", borderColor: "sienna" }} onClick={() => nav('/Orders')}>Order Details</Button>
          </div>
          <div className='row  m-4'>
            <div className='col m-1' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Card border="sienna" style={{ width: '20rem' }}>
                <Card.Header style={{ padding: "10px", color: "sienna", fontSize: "25px" }}>TODAY'S TOTAL ORDERS</Card.Header>
                <Card.Body>
                  <Card.Title>
                    {TodaysTotalOrders}
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div className='col m-1' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Card border="sienna" style={{ width: '20rem' }}>
                <Card.Header style={{ padding: "10px", color: "sienna", fontSize: "25px" }}>TODAY'S TOTAL REVENUE</Card.Header>
                <Card.Body>
                  <Card.Title>{TodaysTotalRevenue} ₹</Card.Title>
                </Card.Body>
              </Card>
            </div>

          </div>

          <div className='row  m-4'>
            <div className='col m-1' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Card border="sienna" style={{ width: '20rem' }}>
                <Card.Header style={{ padding: "10px", color: "sienna", fontSize: "25px" }}>TOTAL ORDERS</Card.Header>
                <Card.Body>
                  <Card.Title>{TotalOrders}</Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div className='col m-1' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Card border="sienna" style={{ width: '20rem' }}>
                <Card.Header style={{ padding: "10px", color: "sienna", fontSize: "25px" }}>TOTAL REVENUE</Card.Header>
                <Card.Body>
                  <Card.Title>{TotalRevenue} ₹</Card.Title>
                </Card.Body>
              </Card>
            </div>

          </div>
        </> : <h3 style={{ color: "red" }}>ACCESS DENIED</h3>
      }
    </div >
  )
}

export default Admin