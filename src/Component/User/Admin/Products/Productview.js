import React, { useEffect } from 'react'
import { Card, CardGroup } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Mycontext } from '../../../../App';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AiTwotoneDelete } from "react-icons/ai";
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';



const Productview = (adminlogin, Token) => {


    const nav = useNavigate()

    const { id } = useParams();
    const [viewproduct, setViewproduct] = useState([{}])
    useEffect(() => {
        const viewPro = async () => {
            try {
                let res = await axios.get(`https://localhost:7115/api/Product/PRODUCT BY ${id}`)
                setViewproduct(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        viewPro()
    }, [id])


    const RemoveItem = async(id) => {
        try{
            let tkn = Cookies.get("token")
            let res = await axios.delete(`https://localhost:7115/api/Product/DELETE PRODUCT?id=${id}`,{
                headers:{Authorization:`Bearer ${tkn}`}
            })
            const result = await res.data
            toast.success("Product Deleted")
            nav('/Products')
        }catch(err){
            console.log(err)
        }
    }


    const [Productname, setProductname] = useState("")
    const [Price, setPrice] = useState(0)
    const [Image, setImage] = useState("")
    const [desc , setdesc]=useState("")
    const [catg , setCategory]=useState(0)

    const Updateproduct = async () => {
        try{
            const tk = Cookies.get("token")
            const formdata = new FormData()
            formdata.append('product.ProductName',Productname)
            formdata.append('product.ProductDescription',desc)
            formdata.append('product.Price',Price)
            formdata.append('product.CategoryId', catg)
            formdata.append('Img', Image)
            let res = await axios.put(`https://localhost:7115/api/Product/UPDATE PRODUCT?id=${id}`,formdata,{
                headers :{Authorization:`Bearer ${tk}`}
            })
            let result = await res.data
            nav('/Products')
            toast.success("Product Updated Successfully")
        }catch(err){
            console.log(err);
        }
    }



    return (
        <div>
            {
                adminlogin && Token ?
                    <div>
                        <div>
                            <IoChevronBackCircleOutline onClick={() => nav('/Products')} />
                            <h3 style={{ color: "sienna" }}>{viewproduct?.productName}</h3>
                        </div>
                        <div className='container mt-5'>
                            <div className='row'>
                                {viewproduct &&
                                    <>
                                        <div className='col-12 col-md-6 d-flex' style={{ justifyContent: "center", alignItems: "center" }}>
                                            <img src={viewproduct?.productImage} style={{ width: "500px", height: "400px" }} className='img-fluid' />
                                        </div>
                                        <div className='col-12 col-md-6' >
                                            <CardGroup  >
                                                <Card >
                                                    <Form className='signup-form border border-2' onSubmit={(e) => e.preventDefault()} style={{ padding: "30px", borderColor: "sienna" }} >
                                                        <Form.Group className="mb-3" style={{ backgroundColor: "white", color: "sienna" }}>
                                                            <Form.Label >EDIT PRODUCT NAME</Form.Label>
                                                            <Form.Control type="text" defaultValue={viewproduct?.productName} onChange={(e) => setProductname(e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" style={{ backgroundColor: "white", color: "sienna" }}>
                                                            <Form.Label >EDIT CATEGORY</Form.Label>
                                                            <Form.Control type="text" defaultValue={viewproduct?.categoryId} onChange={(e) => setCategory(e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" style={{ backgroundColor: "white", color: "sienna" }}>
                                                            <Form.Label className='login-label'>CHANGE PRICE</Form.Label>
                                                            <Form.Control type="text" defaultValue={viewproduct?.price} onChange={(e) => setPrice(e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" style={{ backgroundColor: "white", color: "sienna" }}>
                                                            <Form.Label className='login-label'>CHANGE DESCRIPTION</Form.Label>
                                                            <Form.Control type="text" defaultValue={viewproduct?.productDescription} onChange={(e) => setdesc(e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" style={{ backgroundColor: "white", color: "sienna" }}>
                                                            <Form.Label>CHANGE IMAGE</Form.Label>
                                                            <Form.Control type="file" onChange={(e)=>setImage(e.target.files[0])} />
                                                        </Form.Group>

                                                        <Button onClick={Updateproduct} className='mb-3' type="submit" style={{ width: '50%', margin: "2px", textDecoration: "none", backgroundColor: "sienna", color: "white", border: "none" }}>
                                                            UPDATE
                                                        </Button>
                                                        <Button style={{ marginTop: "-13px", textDecoration: "none", backgroundColor: "sienna", color: "white", border: "none" }}> <AiTwotoneDelete onClick={()=>RemoveItem(viewproduct?.id)} /></Button>

                                                    </Form>

                                                </Card>

                                            </CardGroup>
                                        </div>
                                    </>
                                }

                            </div>
                        </div>
                    </div> : <h1 style={{color:"red"}}>ACCESS DENIED</h1>
            }
        </div>
    )
}

export default Productview