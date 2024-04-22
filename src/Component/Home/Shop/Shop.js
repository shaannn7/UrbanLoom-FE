import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



const Shop = ({ nav, Product }) => {

    const [page, setpage] = useState([{}])
    const [pnumber, setPNumber] = useState(1)

    const handleChange = (e, p) => {
        setPNumber(p)
    }
    const pageNumber = Math.ceil(Product.length / 5)
    useEffect(() => {
        const pagination = async () => {
            try {
                const dat = await axios.get(`https://localhost:7115/api/Product/PAGE?page=${pnumber}&pagesize=5`)
                const datas = dat.data
                setpage(datas)
            } catch (err) {
                console.log(err)
            }
        }
        pagination()

    }, [pnumber, pageNumber])
    return (
        <div>
            <h3 style={{ color: "silver" }}>SHOP</h3>
            <div className='container'>
                <div className='row'>
                    {
                        page?.map((item) => (
                            <CardGroup className='col-6 col-md-3'>
                                <Card className='m-2 mt-4 md-3'>
                                    <Card.Img style={{ maxHeight: "12rem" }} src={item.productImage} />
                                    <Card.Body>
                                        <Card.Text>{item.productName}</Card.Text>
                                        <Card.Text>Price:{item.price}₹</Card.Text>
                                        <Button variant='secondary' style={{ margin: "2px" }} onClick={() => nav(`/Viewproduct/${item.id}`)}>View Product</Button>
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                        ))
                    }
                </div>
            </div>
            <div style={{display:"flex" , justifyContent:'center',width:"100%" }}>
                <Pagination count={pageNumber} onChange={handleChange} color="secondary" shape="rounded" />
            </div>
        </div>
    )
}

export default Shop