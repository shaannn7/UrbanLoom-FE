import axios from 'axios'
import Cookies from 'js-cookie'
import { MDBBadge, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const SingleOrderDetails = (adminlogin, Token) => {

    const { id } = useParams()
    const idd = parseInt(id)
    const [order, setorder] = useState({})
    console.log(order)

    useEffect(() => {
        const singleorder = async () => {
            let dat = await axios.get(`https://localhost:7115/api/Order/GET DETAIL OF A SINGLE ORDER?orderid=${idd}`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get('token')}`
                }
            })
            setorder(dat.data)
        }
        singleorder()
    }, [idd])

    const updateOrder = async (idd, status) => {
        try {
            let response = await axios.put(`https://localhost:7115/api/Order/UPDATE ORDER STATUS?orderid=${idd}`, {
                orderStatus: status
            },
                {
                    headers: {
                        "Authorization": `Bearer ${Cookies.get('token')}`
                    }
                })
            let result = await response.data
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            {
                adminlogin && Token ?
                    <>
                        <h3 style={{ color: "sienna" }}>SINGLE ORDER DETAILS</h3>
                        <div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Card >
                                    <Card.Body style={{ width: '30rem', display: "flex", flexDirection: "column", alignItems: "start" }}>
                                        <Card.Title style={{ fontSize: "30px", margin: "5px", textDecoration: "none", color: "sienna" }}>OrderID        : {idd}</Card.Title>
                                        <Card.Title style={{ fontSize: "30px", margin: "5px", textDecoration: "none", color: "sienna" }}>Name  : {order?.customerName}</Card.Title>
                                        <Card.Subtitle style={{ fontSize: "20px", margin: "5px", textDecoration: "none", color: "sienna" }} className="mb-2 text-muted">E-Mail         : {order?.customerEmail}</Card.Subtitle>
                                        <Card.Subtitle style={{ fontSize: "20px", margin: "5px", textDecoration: "none", color: "sienna" }} className="mb-2 text-muted">Phone          : {order?.customerPhone}</Card.Subtitle>
                                        <Card.Subtitle style={{ fontSize: "20px", margin: "5px", textDecoration: "none", color: "sienna" }} className="mb-2 text-muted">City           : {order?.customerCity}</Card.Subtitle>
                                        <Card.Subtitle style={{ fontSize: "20px", margin: "5px", textDecoration: "none", color: "sienna" }} className="mb-2 text-muted">Address        : {order?.homeAddress}</Card.Subtitle>
                                        <Card.Subtitle style={{ fontSize: "20px", margin: "5px", textDecoration: "none", color: "sienna" }} className="mb-2 text-muted">Transaction ID : {order?.transactionId}</Card.Subtitle>
                                        <Card.Subtitle style={{ fontSize: "20px", margin: "5px", textDecoration: "none", color: "sienna" }} className="mb-2 text-muted">Order Date     :{order?.orderDate}</Card.Subtitle>
                                        <Card.Subtitle style={{ fontSize: "20px", margin: "5px", textDecoration: "none", color: "sienna" }} className="mb-2 text-muted">Order Status   : {order?.orderStatus}</Card.Subtitle>
                                        <div>
                                            <Button link style={{ fontWeight: "700", fontSize: "15px", margin: "5px", textDecoration: "none", backgroundColor: "transparent", color: "sienna", border: "1px solid", borderColor: "sienna" }} onClick={() => updateOrder(order.id, 'Proccessing')}>Processing</Button>
                                            <Button link style={{ fontWeight: "700", fontSize: "15px", margin: "5px", textDecoration: "none", backgroundColor: "transparent", color: "sienna", border: "1px solid", borderColor: "sienna" }} onClick={() => updateOrder(order.id, 'Shipped')}>Shipped</Button>
                                            <Button link style={{ fontWeight: "700", fontSize: "15px", margin: "5px", textDecoration: "none", backgroundColor: "transparent", color: "sienna", border: "1px solid", borderColor: "sienna" }} onClick={() => updateOrder(order.id, 'Deliverd')}>Delivered</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className='container mt-3' style={{ border: "2px solid", borderColor: "sienna" }}>
                                <MDBTable align='middle'>
                                    <MDBTableHead>
                                        <tr >
                                            <th scope='col' style={{ color: "sienna" }}>Product Name</th>
                                            <th scope='col' style={{ color: "sienna" }}>Price ₹</th>
                                            <th scope='col' style={{ color: "sienna" }}>Quantity</th>
                                            <th scope='col' style={{ color: "sienna" }}>Total Price ₹</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {

                                            order?.orderProducts?.map((item) => (
                                                <tr>
                                                    <td>
                                                        <div className='d-flex align-items-center'>
                                                            <img
                                                                src={item.productImage}
                                                                style={{ width: '45px', height: '45px' }}
                                                                className='rounded-circle'
                                                            />
                                                            <div className='ms-3'>
                                                                <p className='fw-bold mb-1'>{item.productName}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{item.price}</p>
                                                    </td>
                                                    <td>
                                                        <p className='fw-normal mb-1'>{item.quantity}</p>
                                                    </td>
                                                    <td>{item.totalAmount}</td>
                                                </tr>
                                            ))
                                        }
                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                        </div>
                    </> : <h3 style={{ color: "red" }}>ACCESS DENIED</h3>
            }
        </div >
    )
}

export default SingleOrderDetails