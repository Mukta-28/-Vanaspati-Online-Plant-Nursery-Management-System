import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Nidhi_Mehendale from '../assets/Nidhi_Mehendale.jpg'


function About() {
  return (
    <section className="py-5 bg-light">
      <Container>
        <h1 className="text-center mb-4 display-4">About Vanaspati</h1>

        <p className="mb-4 fs-5">
          Welcome to Vanaspati, where we believe your home is a living, breathing expression of your style,
          and every plant, pot, and accessory is a brushstroke in your personal botanical masterpiece. We're
          more than just a plant store; we're your partner in creating vibrant, green spaces that inspire and delight.
        </p>

        <h2 className="mb-3 h4">Our Story:</h2>
        <p className="mb-4 fs-5">
          Founded in 2024 by Vinod Hariharan R, Vanaspati emerged from a shared love for plants and a vision to
          make bringing nature indoors an accessible and enriching experience. What started as a small stall at the
          local farmer's market, filled with unique succulents and aromatic herbs, has grown into a thriving
          community for plant lovers everywhere.
        </p>

        <h2 className="mb-3 h4">More Than Just Foliage:</h2>
        <p className="mb-3 fs-5">
          At Vanaspati, we're dedicated to providing you with more than just plants. We offer:
        </p>

        <ListGroup className="mb-4 fs-5">
          <ListGroup.Item className="mb-2 border-0">
            🌿 A diverse selection of plants: From easy-care air plants to statement-making cacti, we curate a collection to suit every taste and lifestyle.
          </ListGroup.Item>
          <ListGroup.Item className="mb-2 border-0">
            🪴 Unique pots and planters: Elevate your greenery with our range of hand-painted ceramics, stylish macrame hangers, and modern stands.
          </ListGroup.Item>
          <ListGroup.Item className="mb-2 border-0">
            🌱 Expert advice: Our knowledgeable team is here to help you choose the right plants and provide guidance on plant care.
          </ListGroup.Item>
          <ListGroup.Item className="mb-2 border-0">
            🎨 Workshops and events: Join us for hands-on workshops on terrarium building, macrame, and more.
          </ListGroup.Item>
        </ListGroup>

        <h1 className="text-center mb-4 display-5">
          Cultivate Your Canvas with Nature's Hues - Start Creating at Vanaspati!
        </h1>

        <p className="text-center mb-4 fs-5">
          Visit us today to explore our collection, get personalized advice, and bring the beauty of nature into your home.
        </p>

        <div className="d-flex justify-content-center">
          <Button
            as={Link}
            to="/products"
            size="lg"
            className="px-4 py-2 rounded-pill"
            style={{ backgroundColor: '#136c13', border: 'none' }}
          >
            Explore Our Collection
          </Button>
        </div>
      </Container>

      <div className="about-us-page">
      <Container className="content-section py-5 text-center">
       <h1 className=" mb-4 display-4">Team Members</h1>
       
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <Card className="card-hover">
              <Card.Body className="text-center">
              <img src={Nidhi_Mehendale} alt="Nidhi Mehendale" className="rounded-circle mx-auto d-block" width="100" height="100" />
              <h5 className="text-center mt-3">Nidhi Mehendale</h5>
                <Card.Text>
                   CDAC Mumbai
                </Card.Text>
                <Card.Text className="text-center social-icons">
                <a href="https://facebook.com" target="_blank">
                  <i class="bi bi-instagram"></i>
                </a>
              <a href="https://facebook.com" target="_blank">
                <i class="bi bi-linkedin"></i>
              </a>
              <a href="https://facebook.com" target="_blank">
                  <i class="bi bi-github"></i>
              </a>
             </Card.Text>
              </Card.Body>
            </Card>
          </Col>

         <Col lg={4} md={6} className="mb-4">
            <Card className="card-hover">
              <Card.Body className="text-center">
              <img src={Nidhi_Mehendale} alt="Nidhi Mehendale" className="rounded-circle mx-auto d-block" width="100" height="100" />
              <h5 className="text-center mt-3">Nidhi Mehendale</h5>
                <Card.Text>
                   CDAC Mumbai
                </Card.Text>
                <Card.Text className="text-center social-icons">
                <a href="https://facebook.com" target="_blank">
                  <i class="bi bi-instagram"></i>
                </a>
              <a href="https://facebook.com" target="_blank">
                <i class="bi bi-linkedin"></i>
              </a>
              <a href="https://facebook.com" target="_blank">
                  <i class="bi bi-github"></i>
              </a>
             </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <Card className="card-hover">
              <Card.Body className="text-center">
              <img src={Nidhi_Mehendale} alt="Nidhi Mehendale" className="rounded-circle mx-auto d-block" width="100" height="100" />
              <h5 className="text-center mt-3">Nidhi Mehendale</h5>
                <Card.Text>
                   CDAC Mumbai
                </Card.Text>
                <Card.Text className="text-center social-icons">
                <a href="https://facebook.com" target="_blank">
                  <i class="bi bi-instagram"></i>
                </a>
              <a href="https://facebook.com" target="_blank">
                <i class="bi bi-linkedin"></i>
              </a>
              <a href="https://facebook.com" target="_blank">
                  <i class="bi bi-github"></i>
              </a>
             </Card.Text>
              </Card.Body>
            </Card>
          </Col>

           <Col lg={4} md={6} className="mb-4">
            <Card className="card-hover">
              <Card.Body className="text-center">
              <img src={Nidhi_Mehendale} alt="Nidhi Mehendale" className="rounded-circle mx-auto d-block" width="100" height="100" />
              <h5 className="text-center mt-3">Nidhi Mehendale</h5>
                <Card.Text>
                   CDAC Mumbai
                </Card.Text>
                <Card.Text className="text-center social-icons">
                <a href="https://facebook.com" target="_blank">
                  <i class="bi bi-instagram"></i>
                </a>
              <a href="https://facebook.com" target="_blank">
                <i class="bi bi-linkedin"></i>
              </a>
              <a href="https://facebook.com" target="_blank">
                  <i class="bi bi-github"></i>
              </a>
             </Card.Text>
              </Card.Body>
            </Card>
          </Col>

           <Col lg={4} md={6} className="mb-4">
            <Card className="card-hover">
              <Card.Body className="text-center">
              <img src={Nidhi_Mehendale} alt="Nidhi Mehendale" className="rounded-circle mx-auto d-block" width="100" height="100" />
              <h5 className="text-center mt-3">Nidhi Mehendale</h5>
                <Card.Text>
                   CDAC Mumbai
                </Card.Text>
                <Card.Text className="text-center social-icons">
                <a href="https://facebook.com" target="_blank">
                  <i class="bi bi-instagram"></i>
                </a>
              <a href="https://facebook.com" target="_blank">
                <i class="bi bi-linkedin"></i>
              </a>
              <a href="https://facebook.com" target="_blank">
                  <i class="bi bi-github"></i>
              </a>
             </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </div>
       
    </section>
  );
}

export default About;
