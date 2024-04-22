import React, { useState } from 'react'
import { FormCheck, FormLabel } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import axios from 'axios';
import toast from 'react-hot-toast';


const Addproduct = ({ setItem, item, adminlogin, Token }) => {


    const nav = useNavigate()

    const [Productname, setProductname] = useState("")
    const [Price, setPrice] = useState(0)
    const [Type, setType] = useState("")
    const [Image, setImage] = useState("")
    const [description , setdesription]=useState("")





    const Addproducttt = async () =>{
        try {
            const formdata = new FormData()
            formdata.append('product.ProductName',Productname)
            formdata.append('product.ProductDescription',description)
            formdata.append('product.Price',Price)
            formdata.append('product.CategoryId', Type)
            formdata.append('Img', Image)
            let response = await axios.post("https://localhost:7115/api/Product/ADD PRODUCT",formdata, {
                headers : {
                    "Content-Type" : "multipart/form-data",
                    "Authorization" : `Bearer ${Token}`
                }
            })
            let result = await response.data
            toast.success("Product added successfully")
        }catch(err){
            console.log(err)
        }
    }





    return (
        <div>
            {adminlogin && Token ?
                <div>
                    <IoChevronBackCircleOutline onClick={() => nav('/Products')} />
                    <h3 style={{ color: "sienna" }}>ADD PRODUCT</h3>
                    <div className='d-flex' style={{ justifyContent: "center", marginTop: "20px" }}>
                        <Form className='signup-form border border-2' onSubmit={(e) => e.preventDefault()} style={{ padding: "30px", borderColor: "sienna" }} >

                            <Form.Group className="mb-3" style={{ backgroundColor: "white", color: "sienna" }}>
                                <Form.Label >PRODUCT NAME</Form.Label>
                                <Form.Control type="text" onChange={(e) => setProductname(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" style={{ backgroundColor: "white", color: "sienna" }}>
                                <Form.Label >PRODUCT DESCRIPTION</Form.Label>
                                <Form.Control type="text" onChange={(e) => setdesription(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" style={{ backgroundColor: "white", color: "sienna" }}>
                                <Form.Label className='login-label'>PRICE</Form.Label>
                                <Form.Control type="text" onChange={(e) => setPrice(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" style={{ backgroundColor: "white", color: "sienna" }}>
                                <Form.Label className='login-label'>TYPE</Form.Label>
                                <Form.Control type="textarea" onChange={(e) => setType(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" style={{ backgroundColor: "white", color: "sienna" }}>
                                <Form.Label>UPLOAD IMAGE</Form.Label>
                                <Form.Control type="file" onChange={(e)=>setImage(e.target.files[0])} />
                            </Form.Group>
                            <Button onClick={Addproducttt} className='mb-3' type="submit" style={{ width: '50%', margin: "2px", textDecoration: "none", backgroundColor: "sienna", color: "white", border: "none" }}>
                                ADD PRODUCT
                            </Button>
                        </Form>
                    </div>
                </div> : <h1 style={{color:"red"}}>ACCESS DENIED</h1>
        }
        </div>
    )
}

export default Addproduct