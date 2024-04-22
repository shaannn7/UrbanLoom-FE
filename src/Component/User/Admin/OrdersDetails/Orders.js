import React, { useEffect, useState } from 'react'
import Login from '../../Login'
import Cookies from 'js-cookie'
import axios from 'axios'
import { MDBBadge } from 'mdb-react-ui-kit'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Orders = (adminlogin, Token) => {

  const [ord, setord] = useState([])

  const orderDetails = async () => {
    try {

      let response = await axios.get("https://localhost:7115/api/Order/GET ALL ORDERS", {
        headers: {
          "Authorization": `Bearer ${Cookies.get('token')}`
        }
      })
      let result = await response.data
      setord(result)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    orderDetails()
  }, [Token])
  return (
    <div>
      {
        adminlogin && Token ?
          <>
            <div className='container mt-5 mb-5' style={{ display: "flex", justifyContent: "center" }}>
              <div className='row'>
                <h1 style={{ color: "sienna" }}>ORDERS</h1>
                <Table style={{ border: "2px solid", borderColor: "silver" }}>
                  <thead style={{ border: "2px solid", borderColor: "silver" }}>
                    <tr >
                      <th style={{ border: "2px solid", borderColor: "silver" }}>OrderId</th>
                      <th style={{ border: "2px solid", borderColor: "silver" }}>E-Mail</th>
                      <th style={{ border: "2px solid", borderColor: "silver" }}>Order Date</th>
                      <th style={{ border: "2px solid", borderColor: "silver" }}>Transaction Id</th>
                      <th style={{ border: "2px solid", borderColor: "silver" }}>Order Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      ord?.map((item) => (
                        <tr>

                          <td style={{ border: "2px solid", borderColor: "silver", textDecoration: "none",padding:"25px" ,fontSize:"18px" , fontWeight:"bold"}}>
                            <Link to={`/SingleOrderDetails/${item.id}`} style={{ textDecoration:"none" , color:"sienna" }}>
                              {item.id}
                            </Link>
                          </td>

                          <td style={{ border: "2px solid", borderColor: "silver" }}>{item.customerEmail}</td>
                          <td style={{ border: "2px solid", borderColor: "silver" }}>{item.orderDate}</td>
                          <td style={{ border: "2px solid", borderColor: "silver" }}>{item.transactionId}</td>
                          <td style={{ border: "2px solid", borderColor: "silver" ,fontSize:"17px" , fontWeight:"600" , color:"silver"}}>{item.orderStatus}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </div>
            </div>
          </> : <h3 style={{ color: "red" }}>ACCESS DENIED</h3>
      }
    </div >
  )
}

export default Orders