// NavbarComponent.js
import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Aos from "aos";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/navbar.css";


function NavbarComponent() {
  const [showBulbPage, setShowBulbPage] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleToggleBulbPage = () => {
    setShowBulbPage(!showBulbPage);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 }); 
  }, []);

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ right: "0", top: "0", left: "0", bottom: "0" ,backgroundColor:"black"}}
      >
        <Container style={{ margin: "0px 20px", borderRadius: "15px" }}>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{ fontSize: "30px", fontWeight: "500", marginRight: "50px" }}
            data-aos="fade-right"
          >
            Home Automation Analytics
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/"
                style={styles}
                className="home"
                data-aos="fade-left"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="https://docs.google.com/document/d/19oAGFREX2Zq9Z2Lgp9g_dBvG49Zc7ZfilDtn2l4RTsY/edit?usp=sharing" target="_blank"
                style={styles}
                className="home"
                data-aos="fade-left"

              >
                Docs
              </Nav.Link>
              <NavDropdown
                title="Sensors"
                style={{marginLeft:"20px"}}
                id="basic-nav-dropdown"
                className="home"
              >
                <NavDropdown.Item
                  onClick={() => scrollToSection("airsection")}
                  data-aos="fade-left"
                  
                >
                  Air Quality Sensor
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => scrollToSection("tempsection")}
                  data-aos="fade-left"
                >
                  Temperature Sensor
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => scrollToSection("ultrasection")}
                  data-aos="fade-left"
                >
                  Ultrasonic Sensor
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/bulb" onClick={handleToggleBulbPage} data-aos="fade-left"> 
                  Blink an LED
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
