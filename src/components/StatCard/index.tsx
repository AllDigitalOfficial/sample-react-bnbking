
import React from 'react';
import { Col, Card } from 'react-bootstrap';

import { StatCardProps } from '../../types/types';

const backgroundColor = import.meta.env.VITE_APP_BACKGROUND_COLOR || "#343a40";
const primaryColor = import.meta.env.VITE_APP_PRIMARY_COLOR || "#FFD700";
const borderBlack = import.meta.env.VITE_APP_DASHBOARD_CARD_BORDER_COLOR || '#FFD700';
const StatCard: React.FC<StatCardProps> = ({ title, value }) => (



<Col md={3} className="mb-4" >
    <Card className="h-100 text-center" style={{ backgroundColor: backgroundColor, border: `1px solid ${borderBlack}` }}>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
        <Card.Text className="fw-bold" style={{ color: primaryColor }}>{value}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

export default StatCard;