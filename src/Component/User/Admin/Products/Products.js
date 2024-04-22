import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Card, CardGroup, Button } from 'react-bootstrap'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Mycontext } from '../../../../App'
import { IoChevronBackCircleOutline } from "react-icons/io5";
import axios from 'axios'


const Products = ({ nav, adminlogin, Token }) => {


    const [categ, setcateg] = useState([{}])
    const getcateg = async () => {
        try {
            let res = await axios.get("https://localhost:7115/api/Category/CATEGORIES")
            setcateg(res.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getcateg()

    }, [])

    const [products, setProducts] = useState([{}])
    const Product = async () => {
        try {
            let res = await axios.get('https://localhost:7115/api/Product/ALL PRODUCTS')
            let result = await res.data
            setProducts(result)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        Product()
    }, [products])


    return (
        <div>
            {
                adminlogin && Token ?
                    <div>
                        <IoChevronBackCircleOutline onClick={() => nav('/Admin')} />
                        <h3 style={{ color: "sienna ", marginTop: "15px" }}>PRODUCTS</h3>
                        <div className='row' style={{ position: 'relative', top: '3px' }}>
                            <div className='col-6'>
                                <Button onClick={() => nav('/Addproduct')} style={{ textDecoration: "none", backgroundColor: "white", color: "sienna", borderColor: "sienna" }}>ADD PRODUCT</Button>
                            </div>
                            <div className='col-6'>
                                <DropdownButton id="dropdown-basic-button" title="CATEGORIES" className='noborderbutton'>
                                    {categ.map((catg) => (
                                        <Dropdown.Item style={{ backgroundColor: 'inherit' }}><Link className='NavPages' to={`/ViewCategory/${catg.catagoryName}`}><h5>{catg.catagoryName}</h5></Link></Dropdown.Item>
                                    ))}
                                    <Dropdown.Item style={{ backgroundColor: 'inherit' }}><Link className='NavPages' to={'/AddCategory'}><h5 style={{ color: "silver" }}>ADD CATEGORY</h5></Link></Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>
                        <div className='container'>
                            <div className='row'>
                                {
                                    products.map((item) => (
                                        <CardGroup key={item.id} className='col-6 col-md-3'>
                                            <Card className='m-2 mt-4 md-3'>
                                                <Card.Img style={{ maxHeight: "12rem" }} src={item.productImage} />
                                                <Card.Body>
                                                    <Card.Text>{item.productName}</Card.Text>
                                                    <Card.Text>Price:{item.price}₹</Card.Text>
                                                    <Button style={{ margin: "2px", textDecoration: "none", backgroundColor: "sienna", color: "white", border: "none" }} onClick={() => nav(`/Productview/${item.id}`)}>View Product</Button>
                                                </Card.Body>
                                            </Card>
                                        </CardGroup>
                                    ))
                                }
                            </div>
                        </div>
                    </div> : <h1 style={{ color: "red" }}>ACCESS DENIED</h1>
            }
        </div>
    )
}

export default Products