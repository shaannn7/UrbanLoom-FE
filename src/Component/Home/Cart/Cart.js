import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from "react-icons/md";
import Login from '../../User/Login';
import axios from 'axios';







const Cart = ({ifLogin ,LoginUser , PlaceOrder , token , adminlogin}) => {

    const nav = useNavigate()

    const[cart , setCart]=useState(null)


    const setToCart=async()=>{
        try{
            const res = await axios.get('https://localhost:7115/api/Cart/CART-ITEMS',{
                headers:{Authorization:`Bearer ${token}`}
            })
            const result = await res.data
            setCart(result)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        setToCart()
    },[cart,token])

    const QtyCountinc = async(id) => {
        try{
            let res = await axios.put(`https://localhost:7115/api/Cart/QTY INC?productid=${id}`,null,{
                headers:{Authorization:`Bearer ${token}`}
            })
            const result = await res.data
        }catch(err){
            console.log(err)
        }
    }

    const QtyDlt = async(id) => {
        try{
            console.log(id);
            let res = await axios.delete(`https://localhost:7115/api/Cart/DELETE CART?productid=${id}`,{
                headers:{Authorization:`Bearer ${token}`}
            })
            const result = await res.data
        }catch(err){
            console.log(err)
        }
    };


    const QtyCountdec = async(id) => {
        try{
            let res = await axios.put(`https://localhost:7115/api/Cart/QTY DEC?productid=${id}`,null,{
                headers:{Authorization:`Bearer ${token}`}
            })
            const result = await res.data
        }catch(err){
            console.log(err)
        }
    };

    const total = cart?.reduce((tot,item)=>item.totalAmount + tot , 0) 


    return (
        <>
            {
                ifLogin || adminlogin ?( 
                    cart?.length > 0? (
                    <div>
                        <h3 style={{ color: "silver" }}>CART</h3>
                        <div className='container'>
                            <div className='row'>
                                {cart.map((item) =>
                                    <CardGroup className='col-6 col-md-3'>
                                        <Card className='m-2 mt-4 md-3'>
                                            <Card.Img style={{ maxHeight: "10rem" }} src={item.productImage} />
                                            <Card.Body>
                                                <Card.Title>{item.productName}</Card.Title>
                                                <Card.Text>Price:{item.price}₹</Card.Text>
                                                <Card.Text>Qty:{item.quantity}</Card.Text>
                                                <Card.Text>Total :{item.totalAmount} </Card.Text>
                                                <Button variant='secondary' className='m-1' onClick={() => QtyCountinc(item.productId)} >Qty +</Button>
                                                <Button variant='secondary' className='m-1' onClick={() => QtyDlt(item.productId)}><MdDeleteOutline /></Button>
                                                <Button variant='secondary' onClick={() => QtyCountdec(item.productId)} >Qty -</Button>
                                            </Card.Body>
                                        </Card>
                                    </CardGroup>
                                )}
                            </div>
                        </div><br />
                       
                        <Button variant='secondary' className='m-2' onClick={() => PlaceOrder(cart , total)}>Place order</Button>
                    </div>
                    ) : (
                    <h1 style={{color:"silver"}}>Cart is Empty</h1>
                    )
                ) : <Login LoginUser={LoginUser} />
            }
        </>

    )

}

export default Cart