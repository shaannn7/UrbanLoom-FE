import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import Login from '../../User/Login';
import { useNavigate } from 'react-router-dom';

function OrderDetails({ token}) {

    const [userOrderDetails, setUserOrderDetails] = useState([{}])
    const nav = useNavigate()
    const orderDetails = async () => {
        try {
            let response = await axios.get("https://localhost:7115/api/Order/GetOrdersDetails", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            let result = await response.data
            setUserOrderDetails(result)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        orderDetails()
    }, [token])

    return (
        <div>
            {
                token != null ? (
                    <div className='container mt-5 mb-5' style={{ display: "flex", justifyContent: "center" }}>
                        <div className='row'>
                            <h3 style={{color:"sienna"}}>ORDER STATUS</h3>
                            <Table striped bordered hover variant="light">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Order Date</th>
                                        <th>OrderId</th>
                                        <th>order status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userOrderDetails.map((item) => (
                                            <tr>
                                                <td><img className='img-fluid' style={{ height: "5rem" }} src={item.productImage} alt="" /></td>
                                                <td>{item.productName}</td>
                                                <td>{item.totalPrice}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.orderDate}</td>
                                                <td>{item.orderId}</td>
                                                <td style={{color:"silver"}}> {item.orderStatus}</td>
                                            </tr>
                                        ))
                                    },ig
                                </tbody>
                            </Table>
                        </div>
                    </div>
                ) : <Login />
            }
        </div>
    )
}

export default OrderDetails