import React,{useState} from 'react';
import { Container, Card, Button, Row,Alert } from 'react-bootstrap';
import { InvestmentStats } from '../../types/types';
import StatCard from '../StatCard';
import ReferralCard from '../RefferalCard';



const Dashboard: React.FC = () => {
  const stats: InvestmentStats = {
    withdrawable: 0,
    totalInvested: 0,
    totalWithdrawal: 0,
    totalReferralReward: 0,
  };
  
  const [showAlert, setShowAlert] = useState(false);

  const handleCopy = () => {
    // const referralLink = data?.referralLink || "";
    navigator.clipboard.writeText("You will get your ref link after investing");
    setShowAlert(true);

    // Hide alert after 2 seconds
    setTimeout(() => setShowAlert(false), 2000);
  };
  const totalLevel = import.meta.env.VITE_APP_TOTAL_LEVEL_LENGTH || 10;
  const levels = Array.from({ length: totalLevel }, (_, i) => import.meta.env[`VITE_APP_LEVEL_${i + 1}_PERCENTAGE`] || 0);
  return (
    <Container className="col-lg-10 mb-5">
      <Card bg="light" style={{ border: `2px solid yellow` }}>
        <Card.Body>
          <h2 className="text-center mb-4">DASHBOARD</h2>
          <Row className="g-4 mb-4">
            <StatCard  title="Withdrawable" value={`${stats.withdrawable} BNB`} />
            <StatCard  title="Total Invested" value={`${stats.totalInvested} BNB`} />
            <StatCard  title="Total Withdrawal" value={`${stats.totalWithdrawal} BNB`} />
            <StatCard  title="Total Referral Reward" value={`${stats.totalReferralReward} BNB`} />
          </Row>
          <div className='d-flex justify-content-center align-items-center'>
          <Button variant="warning" className="w-50 py-3 fw-bold mb-4">
            Withdraw
          </Button>
          </div>
          <p className="text-center mb-4">
            <strong style={{ fontSize: '1.5rem' }}>You will get your ref link after investing</strong> <i className="h-5 bi bi-clipboard"    onClick={handleCopy} style={{ fontSize: '1.5rem' }}></i>
          </p>
            {/* Alert for Copy */}
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

          <Row className=" justify-content-center g-4" style={{ }}>
            {levels.map((level, index) => (
              <ReferralCard
              key={index}
              level={index + 1}
              referralparcentage={`${level}% Referral Rewards`}
              downlinecount={`0 Referrals`}
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