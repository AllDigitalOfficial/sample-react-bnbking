import React, { useState } from 'react';
import { Container, Card, Button, Row, Alert } from 'react-bootstrap';
import { useContractData } from '../context/DataContext'; // Adjust path as needed
import StatCard from '../StatCard';
import ReferralCard from '../RefferalCard';
const totalLevels = import.meta.env.VITE_APP_REFERRAL_LEVELS || 10;
const primaryColorBorder = import.meta.env.VITE_APP_PRIMARY_COLOR || 'yellow';

const Dashboard: React.FC = () => {
  const { data,  } = useContractData();
  const [showAlert, setShowAlert] = useState(false);
  const stats = {
    withdrawable: data?.userWithdrawalBalance || 0,
    totalInvested: data?.userInfo.totalInvested || 0,
    totalWithdrawal: data?.userTotalWithdrawn || 0,
    totalReferralReward: data?.userTotalReferralBonus || 0,
  };

  const handleCopy = () => {
    const referralLink = data?.referralLink || "You will get your ref link after investing";
    navigator.clipboard.writeText(referralLink);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const totalLevel = parseInt( totalLevels|| "10");
  const levels = Array.from(
    { length: totalLevel }, 
    (_, i) => import.meta.env[`VITE_APP_LEVEL_${i + 1}_PERCENTAGE`] || 0
  );

  return (
    <Container className="col-lg-10 mb-5">
      <Card bg="light" style={{ border: `4px solid ${primaryColorBorder}` }}>
        <Card.Body>
          <h2 className="text-center mb-4">USER DASHBOARD</h2>
          <Row className="g-4 mb-4">
            <StatCard 
              title="Withdrawable" 
              value={`${stats.withdrawable.toFixed(4)} BNB`} 
            />
            <StatCard 
              title="Total Invested" 
              value={`${stats.totalInvested.toFixed(4)} BNB`} 
            />
            <StatCard 
              title="Total Withdrawal" 
              value={`${stats.totalWithdrawal.toFixed(4)} BNB`} 
            />
            <StatCard 
              title="Total Referral Reward" 
              value={`${stats.totalReferralReward.toFixed(4)} BNB`} 
            />
          </Row>
          
          <div className='d-flex justify-content-center align-items-center'>
            <Button 
              variant="warning" 
              className="w-50 py-3 fw-bold mb-4"
              disabled={stats.withdrawable <= 0}
            >
              Withdraw
            </Button>
          </div>
          
          <p className="text-center mb-4">
            <strong style={{ fontSize: '1.5rem' }}>
              {data?.referralLink || "You will get your ref link after investing"}
            </strong>
            <i 
              className="h-5 bi bi-clipboard"
              onClick={handleCopy} 
              style={{ fontSize: '1.5rem', cursor: 'pointer', marginLeft: '10px' }}
            />
          </p>

          {showAlert && (
            <Alert
              variant="success"
              className="position-fixed bottom-0 end-0 mb-3 me-3"
              style={{ zIndex: 1050 }}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              Referral link copied!
            </Alert>
          )}

          <Row className="justify-content-center g-4">
            {levels.map((level, index) => (
              <ReferralCard
                key={index}
                level={index + 1}
                referralparcentage={`${level}% Referral Rewards`}
                downlinecount={`${data?.userDownlineCountArray[index] || 0} Referrals`}
                color="yellow"
              />
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;