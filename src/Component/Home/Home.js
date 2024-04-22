import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import './Home.css'
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { LuSofa } from "react-icons/lu";
import { LiaBedSolid } from "react-icons/lia";
import { MdOutlineTableBar } from "react-icons/md";
import { MdStorage } from "react-icons/md";
import { LiaChairSolid } from "react-icons/lia";
import { GiKidSlide } from "react-icons/gi";
import { LuLamp } from "react-icons/lu";
import { GiMirrorMirror } from "react-icons/gi";
import { PiOfficeChair } from "react-icons/pi";
import { MdOutlineOutdoorGrill } from "react-icons/md";

const Home = () => {
  return (
    <div>
      <Carousel data-bs-theme="dark" className='Carouse' >
        <Carousel.Item>
          <img
            style={{ maxHeight: "100vh" }}
            className="d-block w-100"
            src={require('./Bacckground/modern.jpg')}
            alt="First slide"
          />
          <Carousel.Caption>
            <h4 className='Modern fs-3 fs-sm-4 fs-md-5'>Modern Luxe</h4>
            <p className='Moderndis fs-6 fs-sm-7 fs-md-8'>Timeless, clean lines, and functional designs</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ maxHeight: "100vh" }}
            className="d-block w-100"
            src={require('./Bacckground/Miniimal.jpg')}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h4 className='Minimal fs-3 fs-sm-4 fs-md-5'>Scandinavian Minimalism</h4>
            <p className='Minimaldis fs-6 fs-sm-7 fs-md-8'>Elegant simplicity, natural materials, and a focus on functionality</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            style={{ maxHeight: "100vh" }}
            className="d-block w-100"
            src={require('./Bacckground/LuxUrb.jpg')}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h4 className='Urban fs-3 fs-sm-4 fs-md-5'>LuxUrban</h4>
            <p className='Urbandis fs-6 fs-sm-7 fs-md-8'>A blend of sleek, sophisticated designs with luxurious materials and a classy urban vibe</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className='container-fluid ideal' style={{ width: "100%", minHeight: "250px", backgroundColor: "white", alignItems: "center", border: "1px solid black" }}>
        <h3 style={{ justifyContent: "center", paddingTop: "40px", color: "goldenrod" }}>Our Ideals</h3>
        <p style={{ fontFamily: "sans-serif", fontSize: "20px" }}>
          At UrbanLoom, customer delight inspires our journey. Crafting exquisite, personalized furniture, we seamlessly blend innovation with your unique style, creating timeless pieces that elevate every space        </p>
        <Image src={require('./Bacckground/icons8-oak-tree-50.png')} style={{ width: "1.5%", color: "darkgreen" }} />
      </div>
      <div style={{ margin: "10px" }}>
        <Image src={require('./Bacckground/Screenshot 2024-03-11 182704.png')} style={{ width: "90%" }} />
      </div>

      <div style={{ paddingRight: "20px", margin: "2px" }}>
        <Container style={{ padding: "20px" }}>
          <Row>
            <Col md={4}>
              <img src={require('./Bacckground/1-1.webp')} alt="Image 1" className="img-fluid" />
            </Col>
            <Col style={{ alignContent: "center", paddingTop: "50px" }}>
              <h2 style={{ color: "darkgreen" }}>The Delicate Duo</h2>
              <p style={{ fontFamily: "sans-serif", fontSize: "25px" }}>
                The Delicate Duo represents a harmonious blend of classic and contemporary design constituting panels with an intricate array of rattan knits. They seamlessly complement any décor and space. The entire collection is sculpted out of mahogany wood with a walnut finish and possesses clean angular edges.
              </p>
              <Image src={require('./Bacckground/pngwing.com (1).png')} style={{ width: "10%" }} />
            </Col>
          </Row>
        </Container>
      </div>

      <div className='container-fluid ideal' style={{ width: "100%", minHeight: "250px", backgroundColor: "white", alignItems: "center", border: "1px solid black" }}>
        <h3 style={{ justifyContent: "center", paddingTop: "40px", color: "darkgreen" }}>Shop for your home, by room</h3>
        <p style={{ fontFamily: "sans-serif", fontSize: "20px", color: "GrayText" }}>
          Explore our curated selection, tailored to your every room need From living room to bedroom, we’ve got you covered Elevate your home decor game with our room-based shopping options Transform your home, one space at a time.</p>
        <div className="container" style={{ fontSize: "30px", textDecoration: "none" }}>
          <div className="row">
            <div className="col"><Link to={'/Couches'} style={{ textDecoration: 'none', color: '#004643' }}><LuSofa /><p>Couches</p></Link></div>
            <div className="col"><Link to={'/Bedroom'} style={{ textDecoration: 'none', color: '#004643' }}><LiaBedSolid /><p>Bedroom</p></Link></div>
            <div className="col"><Link to={'/Dinning'} style={{ textDecoration: 'none', color: '#004643' }}><MdOutlineTableBar /><p>Dinnings</p></Link></div>
            <div className="col"><Link to={'/Storage'} style={{ textDecoration: 'none', color: '#004643' }}><MdStorage /><p>Storages</p></Link></div>
            <div className="col"><Link to={'/Seating'} style={{ textDecoration: 'none', color: '#004643' }}><LiaChairSolid /><p>Seatings</p></Link></div>
          </div>
          <div className="row">
            <div className="col"><Link to={'/Kids'} style={{ textDecoration: 'none', color: '#004643' }}><GiKidSlide /><p>Kids</p></Link></div>
            <div className="col"><Link to={'/Lights'} style={{ textDecoration: 'none', color: '#004643' }}><LuLamp /><p>Lights</p></Link></div>
            <div className="col"><Link to={'/Mirrors'} style={{ textDecoration: 'none', color: '#004643' }}><GiMirrorMirror /><p>Mirrors</p></Link></div>
            <div className="col"><Link to={'/Office'} style={{ textDecoration: 'none', color: '#004643' }}><PiOfficeChair /><p>Office</p></Link></div>
            <div className="col"><Link to={'/Outdoor'} style={{ textDecoration: 'none', color: '#004643' }}><MdOutlineOutdoorGrill /><p>Outdoor</p></Link></div>
          </div>
        </div>
      </div>

      <footer className="text-light m-2" style={{backgroundColor:"silver",color:"darkgreen" }}>
        <Container>
          <Row className='Footer'>
            <Col md={4} className="mb-4 mb-md-0 d-flex align-items-center justify-content-center">
              <h5>About Us</h5>
            </Col>
            <Col md={4} className="mb-4 mb-md-0 d-flex align-items-center justify-content-center">
              <ul>
                <li>Contact Us</li>
                <li>FAQs</li>
                <li>Shipping Information</li>
              </ul>
            </Col>
            <Col md={4} className="d-flex align-items-center justify-content-center">
              <ul>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Copyright © 2023 UrbanLoom</li>
              </ul>
            </Col>
          </Row>
          <hr style={{ borderColor: '#FFF' }} className="mt-4 mb-3" />
          <Row>
            <Col>
              <p className="text-center">&copy; 2023 UrbanLoom. All rights reserved</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default Home