import React from 'react';
import { Card, Col } from 'react-bootstrap';

import { ReferralLevel } from '../../types/types';


const referralCard = import.meta.env.VITE_APP_DASHBOARD_CARD_BG_COLOR || '#343a40';


const ReferralCard: React.FC<ReferralLevel> = ({ level,referralparcentage, downlinecount,  }) => (
  <Col md={2} sm={4} xs={6}>
    <Card 
      className="text-center p-3 h-100" 
      style={{ backgroundColor: referralCard, color: '#fff' }}
    >
      <Card.Body>
        <h3 className="fw-bold mb-2">LEVEL {level}</h3>
        <p className="small mb-0">{referralparcentage}</p>
        <p className="small mb-0">{downlinecount}</p>
      </Card.Body>
    </Card>
  </Col>
);

export default ReferralCard;