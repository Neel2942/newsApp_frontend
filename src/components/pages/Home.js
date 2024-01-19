import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style/Home.css';

function Home() {

  return (
    <>
    <Container>
      {/* Newspaper Title and Date */}
      <Row>
        <Col>
          <header>
            <h1>Newspaper Title</h1>
            <p>October 30, 2023</p>
          </header>
        </Col>
      </Row>

      {/* Big Section with Image and Info */}
      <Row className="section-row">
        <Col md={6}>
          <section className="big-section">
            <img
              src="https://via.placeholder.com/400x300" // Placeholder image URL
              alt="Big Section Image"
              className="img-fluid"
            />
          </section>
        </Col>
        <Col md={6}>
          <section className="big-section-info">
            <h2>Big Section Title</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              convallis odio ut tellus elementum, vel auctor turpis viverra.
              Nulla facilisi.
            </p>
            <a href="#">Read More</a>
          </section>
        </Col>
      </Row>

      {/* Three Smaller Sections in Individual Boxes */}
      <Row className="section-row">
        <Col md={4}>
          <section className="small-section-box">
            <h2>Section 1</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              convallis odio ut tellus elementum.
            </p>
            <a href="#">Read More</a>
          </section>
        </Col>
        <Col md={4}>
          <section className="small-section-box">
            <h2>Section 2</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              convallis odio ut tellus elementum.
            </p>
            <a href="#">Read More</a>
          </section>
        </Col>
        <Col md={4}>
          <section className="small-section-box">
            <h2>Section 3</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              convallis odio ut tellus elementum.
            </p>
            <a href="#">Read More</a>
          </section>
        </Col>
      </Row>

      {/* Footer */}
      <Row>
        <Col>
          <footer>
            <p>&copy; 2023 Newspaper Name. All rights reserved.</p>
          </footer>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Home