import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardGroup } from 'react-bootstrap';
import { Mycontext } from '../../../../../App';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddCategory from './AddCategory';



const ViewCategory = ({ nav, adminlogin, Token }) => {


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
      {
        adminlogin && Token ?
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
          </div>  : <h1 style={{color:"red"}}>ACCESS DENIED</h1>
      }
    </div>
  )
}


export default ViewCategory