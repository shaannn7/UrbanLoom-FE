import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import toast from 'react-hot-toast';
import axios from 'axios';
import Login from '../../User/Login';
import { useNavigate } from 'react-router-dom';



const Payment = ({ Loguser, orderItems, totalPrice, Token }) => {

    const [validated, setValidated] = useState(false);
    const [raz, setRaz] = useState(null)
    const [orderStatus, setOrderStatus] = useState(false)
    const [orderDetails, setOrderDetails] = useState(null)
    const nav = useNavigate()

    const loadScript = (src) => {
        return new Promise((res) => {
            const script = document.createElement('script');
            script.src = src;

            script.onload = () => {
                res(true);
            };
            script.onerror = () => {
                res(false);
            };
            document.body.appendChild(script);
        });
    };

    const vfPayment = async () => {
        try {
            let response = await axios.post("https://localhost:7115/api/Order/payment", {
                razorpay_order_id: raz.razorpay_order_id,
                razorpay_payment_id: raz.razorpay_payment_id,
                razorpay_signature: raz.razorpay_signature

            }, {
                headers: {
                    "Authorization": `Bearer ${Token}`
                }
            })
            return await response.data
        } catch (err) {
            console.log(err)
        }
    }

    const generateOrderId = async (totalPrice) => {
        try {
            let response = await axios.post(`https://localhost:7115/api/Order/order-create?price=${totalPrice}`, null, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Token}`
                }
            })
            let result = await response.data
            return result
        } catch (err) {
            console.log(err)
        }
    }

    const handlePayment = async (price) => {
        try {
            const orderId = await generateOrderId(price)
            if (!orderId) {
                toast.error("Error during RazorPay initialization");
                return;
            }

            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

            if (!res) {
                toast.error("You are offline");
                return;
            }

            const options = {
                order_id: orderId,
                name: "UrbanLoom",
                description: "Thank you for purchasing",
                handler: function (res) {
                    setRaz({
                        razorpay_payment_id: res.razorpay_payment_id,
                        razorpay_order_id: res.razorpay_order_id,
                        razorpay_signature: res.razorpay_signature
                    });
                    setOrderStatus(true)
                },
                prefill: {
                    name: Loguser.name,
                    email: Loguser.email
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error(error);
            toast.error("An error occurred during RazorPay payment.");
        }
    };


    const handleSubmit = async (event) => {
        try {
            const form = event.currentTarget;
            event.preventDefault();
            if (form.checkValidity() === false) {
                event.stopPropagation();
            }
            setValidated(true);
            const paymentStatus = await vfPayment()
            if (paymentStatus) {

                let response = await axios.post("https://localhost:7115/api/Order/PLACE ORDER (CART)", {
                    customerName: orderDetails.customerName,
                    customerEmail: orderDetails.customerEmail,
                    customerPhone: orderDetails.customerPhone,
                    customerCity: orderDetails.customerCity,
                    homeAddress: orderDetails.customerCity,
                    orderString: raz.razorpay_order_id,
                    transactionId: raz.razorpay_payment_id,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${Token}`
                    }
                })

                let result = await response.data
                if (result) {
                    toast.success("order successfully  placed");
                    nav('/Shop')
                } else {
                    toast.error("order  placement failed");
                }
            } else {
                toast.error("must pay  to continue");
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <>
            {Token != null ? (
                <div style={{ margin: "10px", padding: "10px" }}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    defaultValue=""
                                    onChange={(e) => setOrderDetails({ ...orderDetails, customerName: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    onChange={(e) => setOrderDetails({ ...orderDetails, customerEmail: e.target.value })} />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue=""
                                onChange={(e) => setOrderDetails({ ...orderDetails, customerPhone: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                required onChange={(e) => setOrderDetails({ ...orderDetails, homeAddress: e.target.value })} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    onChange={(e) => setOrderDetails({ ...orderDetails, customerCity: e.target.value })} />
                            </Form.Group>
                        </Row>
                        <Button type='submit' className='m-3' variant='secondary'>Order Now</Button>
                    </Form>
                    <div>
                        <h3 style={{ color: "sienna" }}>BILL</h3><br />
                        <Table striped className="border border-2 border-secondary">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems?.map((item) => (
                                    <tr>
                                        <td>#{item.id}</td>
                                        <td>{item.productName}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td>{(item.price) * (item.quantity)}₹</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        {orderStatus ? (
                            <Button variant='success' disabled>Payment Success</Button>
                        ) : (
                            <Button onClick={() => handlePayment(totalPrice)} variant='secondary'>Pay Now</Button>
                        )}
                    </div>
                </div>
            ) : <Login />
            }
        </>
    )
}

export default Payment