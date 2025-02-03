import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
const primaryColor = import.meta.env.VITE_APP_PRIMARY_COLOR || "#FFD700"; 
const HeadingText =import.meta.env.VITE_APP_HERO_TITLE || "Smartest System of investing in BNB";
const percentStart = import.meta.env.VITE_APP_START_PERCENTAGE || 2;
const percentEnd = import.meta.env.VITE_APP_END_PERCENTAGE || 2.3;
const referralLevels = import.meta.env.VITE_APP_REFERRAL_LEVELS || 10;
const depositLink = import.meta.env.VITE_APP_DEPOSIT_LINK || '#deposit';
const presentationLink = import.meta.env.VITE_PRESENTATION_LINK || '#presentation';


const Hero: React.FC = () => (
  <Container className="py-5 col-lg-10 ">
    <Row className="align-items-center">
      <Col md={6} className="text-center text-md-start">
        <h1 className="display-4 fw-bold mb-4">
          {HeadingText}
        </h1>
        <p className="lead mb-4">
          From {percentStart} to <span style={{ color:primaryColor }}>{percentEnd}</span> Daily ROI
          <br />
          {referralLevels} of Referral Rewards
        </p>
        <div className=" d-flex flex-column flex-md-row mt-4 gap-3 ">
        <Button href={depositLink} variant="warning" size="lg" className="px-5 py-3 fw-bold">
          Deposit
        </Button>
        <Button href={presentationLink} variant="warning" size="lg" className="px-5 py-3 fw-bold">
          Presentation
        </Button>
        </div >
      </Col>
      <Col md={6} className="mt-5 mt-md-0">
        <Card bg="dark" text="white" className="shadow-lg">
          <Card.Body>
            <div className="mb-4 text-center">
              <h5>Total BNB Invested</h5>
              <p className="display-6 fw-bold" style={{ color:primaryColor }}>0 BNB</p>
            </div>
            <div className="text-center">
              <h5>Total Referral BNB Reward</h5>
              <p className="display-6 fw-bold" style={{ color:primaryColor }}>0 BNB</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Hero;
