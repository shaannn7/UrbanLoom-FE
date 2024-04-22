import React from 'react'
import { Button, Card, CardGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'



const Search = ({ searchresult }) => {
    const nav = useNavigate()
    return (
        <div>
            <h3 style={{ color: "silver" }}>SEARCH</h3>
            <div className='container'>
                <div className='row'>
                    {
                        searchresult.map((item) => (
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

export default Search