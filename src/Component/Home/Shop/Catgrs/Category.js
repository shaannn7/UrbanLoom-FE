import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Button } from 'react-bootstrap';
import { Mycontext } from '../../../../App';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Category = ({ nav }) => {

    const { type } = useParams();
    const [Product, setProduct] = useState([{}])

    useEffect(() => {
        const Catgry = async () => {
            try {
                let res = await axios.get(`https://localhost:7115/api/Product/PRODUCT BY CATEGORY/${type}`)
                setProduct(res.data);
            }
            catch (err) {
                console.log(err)
            }
        }
            Catgry()
        }, [type, Product])


    return (
        <div>
            <h3 style={{ color: "silver" }}>{type}</h3>
            <div className='container'>
                <div className='row'>
                    {
                        Product.map((item) => (
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
        </div>
    )
}

export default Category