// Footer.js
import React from 'react';
import styles from './styles/footer.css';
import { Link } from 'react-router-dom';
import image from "./animations/Logo.jpeg"


const Footer = () => {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
    
        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",    
          });
        }
      };
    
  return (
    <footer style={styles} className='footer-container'>
      <div className='footer-padding'>
        <div className='footer-links'>
          <div className='footer-links-div'data-aos="fade-right">
            <ul className='logo'>
              <li><b>Our Website</b></li>
              <hr></hr>
              <li>
              <Link to="/" className='a'onClick={() => scrollToSection("basic-nav-dropdown")}><img src={image} alt="Logo" style={{height:'123px',width:'123px',backgroundSize:'cover',borderRadius:"10px"}} /></Link>
              </li>
              <br/>
              <li>
                <b><a href="index.html" className='a'>Home Automation Analytics ™</a></b>
              </li>
            </ul>
          </div>
          <div className='footer-links-div' data-aos="fade-down">
            <ul>
              <li><b>Services</b></li>
              <hr></hr>
              <li><Link to="/" className='a'onClick={() => scrollToSection("basic-nav-dropdown")}>Sensors</Link></li>
              <li><Link to="/AboutUs" className='a'>About Us</Link></li>
              <li><a href='https://docs.google.com/document/d/19oAGFREX2Zq9Z2Lgp9g_dBvG49Zc7ZfilDtn2l4RTsY/edit?usp=sharing'className='a' target="_blank" rel="noopener noreferrer" >Documentation</a></li>
            </ul>   
          </div>
          <div className='footer-links-div' data-aos="fade-left">
            <ul>
              <li><b>Contact Us</b></li>
              <hr></hr>
              <li>Phone : +91 90145XXXXX</li>
              <li>Email : 2024iot_project@gmail.com</li>
              <li>Location : CyberTowers, Hyderabad</li>
            </ul>
          </div>
        </div>
      </div>
        
    <p className='copyright'  style={{textAlign:'center'}} >&copy; 2024 All Rights Reserved</p>
    
    </footer>
  );
};


export default Footer;
