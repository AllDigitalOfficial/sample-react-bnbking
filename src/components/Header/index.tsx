import React from "react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { WalletConnect } from "..";
const primaryColor = import.meta.env.VITE_APP_PRIMARY_COLOR || "#FFD700"; 
const depositLink = import.meta.env.VITE_APP_DEPOSIT_LINK || '#deposit';
const header_Bg = import.meta.env.VITE_APP_HEADER_BACKGROUND_COLOR || '';

const logo = import.meta.env.VITE_APP_LOGO || '/bnbking-icon.svg';


const Header: React.FC = () => {

  return (
    <Navbar   className="py-3 sticky-top" style={{ backgroundColor: header_Bg }}>
      <Container className="d-flex flex-column flex-md-row align-items-center">
        <Navbar.Brand href="#" className="d-flex align-items-center mx-auto mx-md-0" style={{ color: primaryColor }}>
          <img src="/crown-icon.svg" alt="Crown" width="32" height="32" className="me-2" />
          <span className="fw-bold">{logo}</span>
        </Navbar.Brand>
        <Nav className="d-flex flex-row align-items-center mt-3 mt-md-0">
          <Nav.Item className="me-2 mb-2 mb-md-0">
            <Button href={depositLink} variant="outline-warning">Deposit</Button>
          </Nav.Item>
          <Nav.Item className="me-2 mb-2 mb-md-0">
            
              <WalletConnect />
         
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
