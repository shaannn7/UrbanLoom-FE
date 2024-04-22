import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaRegUserCircle } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { Mycontext } from '../../../../App';
import axios from 'axios';



const Users = ({ Token, adminlogin }) => {

  const [user, setUser] = useState(null)
  const userList = async () => {
    try {
      let response = await axios.get("https://localhost:7115/api/User/USERS", {
        headers: {
          "Authorization": `Bearer ${Token}`
        }
      })
      let result = await response.data
      setUser(result)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    userList()
  }, [user])


  return (
    <Container>
      {adminlogin && Token ?
        <>
          <h3 style={{ color: 'sienna', marginTop: '2rem' }}>USERS</h3>
          <>
            {user?.map((i) => (
              <Link to={`/Viewusers/${i.id}`} style={{ textDecoration: "none" }}>
                <Row className='d-flex justify-content-center align-items-center' style={{ marginTop: '2rem' }}>
                  <Col className='d-flex' style={{ backgroundColor: 'white', height: '50px', alignItems: 'center', justifyContent: 'space-between', borderRadius: "5px", border: "2px solid", borderColor: "sienna" }}>
                    <div className='d-flex align-items-center'>
                      <FaRegUserCircle style={{ color: 'sienna', fontSize: '25px', marginTop: '-3px', marginLeft: '15px' }} />
                      <span style={{ fontFamily: 'sans-serif', fontSize: 'larger', color: 'sienna', fontWeight: '500', marginLeft: '15px' }}>{i.name}</span>
                      <span style={{ fontFamily: 'sans-serif', fontSize: 'larger', color: 'sienna', fontWeight: '500', marginLeft: '15px' }}>{i.mail}</span>
                      {
                        i.role == 'Admin' ?
                          <>
                            <span style={{ fontFamily: 'sans-serif', fontSize: 'larger', color: 'green', fontWeight: '500', marginLeft: '15px' }}>{i.role}</span>
                          </> : <> <span style={{ fontFamily: 'sans-serif', fontSize: 'larger', color: 'red', fontWeight: '500', marginLeft: '15px' }}>User</span> </>
                          
                        }

                    </div>
                    <MdOutlineNavigateNext style={{ color: 'sienna', fontSize: '35px', marginRight: '10px' }} />
                  </Col>
                </Row>
              </Link>
            ))}

          </>
        </> : <h3 style={{ color: "red" }}>Error 404 : ACCESS DENIED</h3>
      }
    </Container>
  )
}

export default Users;




