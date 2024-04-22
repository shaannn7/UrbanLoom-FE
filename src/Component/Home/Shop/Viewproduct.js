import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Button } from 'react-bootstrap';
import axios from 'axios';



 
const Viewproduct = ({ Addcart,Buynow ,Product }) => {

  const { id } = useParams();
  const[viewproduct , setViewproduct]=useState([{}])
  useEffect(()=>{
    const viewPro = async()=>{
      try{
        let res = await axios.get(`https://localhost:7115/api/Product/PRODUCT BY ${id}`)
        setViewproduct(res.data)
      }catch(err){
        console.log(err);
      }
    }
    viewPro()
  },[id])
  
  return (
    <div>
      <div>
        <h3 style={{ color: "silver" }}>{viewproduct?.productName}</h3>
      </div>
      <div>
        <div className='container'>
          <div className='row'>
            {viewproduct &&
              <CardGroup className='col-12 col-md-6'>
                <Card className='m-4 mt-2 md-2'>
                  <div className="row">
                    <div className="col-md-6">
                      <Card.Img style={{ maxHeight: "20rem" }} src={viewproduct?.productImage} />
                    </div>
                    <div className="col-md-6 mt-5">
                      <Card.Body>
                        <Card.Text>{viewproduct?.productName}</Card.Text>
                        <Card.Text>Product Description : {viewproduct?.productDescription}</Card.Text>
                        <Card.Text>Product Id : {viewproduct?.id}</Card.Text>
                        <Card.Text>Price : {viewproduct?.price}₹</Card.Text>
                        <Card.Text>Category : {viewproduct?.catagoryName}</Card.Text>
                        <span><Button className='m-1' variant='secondary' onClick={() => Addcart(viewproduct?.id)}>Add to Cart</Button></span>
                      </Card.Body>
                    </div>
                  </div>
                </Card>
              </CardGroup>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Viewproduct