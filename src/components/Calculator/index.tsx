import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { ProfitCalculatorProps } from "../../types/types";



const RANGE_START = Number(import.meta.env.VITE_APP_RANGE_START) || 70;
const RANGE_END = Number(import.meta.env.VITE_APP_RANGE_END) || 100;
const DEFAULT_DEPOSIT_PERIOD = Number(import.meta.env.VITE_APP_DEFAULT_DEPOSIT_PERIOD) || 85;
const BASE_TOTAL_PROFIT = Number(import.meta.env.VITE_APP_BASE_TOTAL_PROFIT) || 140;
const DAILY_PROFIT_INCREASE = Number(import.meta.env.VITE_APP_DAILY_PROFIT_INCREASE) || 3;
const MIN_DEPOSIT = Number(import.meta.env.VITE_APP_MIN_DEPOSIT) || 0.02;
const MAX_DEPOSIT = Number(import.meta.env.VITE_APP_MAX_DEPOSIT) || 300;


const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({
  minDeposit = MIN_DEPOSIT,
  maxDeposit = MAX_DEPOSIT,
}) => {
  // Initialize depositPeriod to DEFAULT_DEPOSIT_PERIOD (85 days)
  const [depositPeriod, setDepositPeriod] = useState<number>(DEFAULT_DEPOSIT_PERIOD);
  const [depositAmount, setDepositAmount] = useState<number>(minDeposit);

  // Calculate the total profit percentage based on deposit period.
  const calculateTotalProfit = (days: number): number => {
    const additionalDays = days - RANGE_START;
    return BASE_TOTAL_PROFIT + (additionalDays * DAILY_PROFIT_INCREASE);
  };

  // Calculate the daily ROI percentage based on total profit and deposit period.
  const calculateROI = (days: number): string => {
    const totalProfit = calculateTotalProfit(days);
    return (totalProfit / days).toFixed(2);
  };

  // Calculate total earnings based on deposit amount, calculated ROI, and deposit period.
  const calculateEarnings = (): string => {
    const roi = parseFloat(calculateROI(depositPeriod));
    const dailyEarning = depositAmount * (roi / 100);
    return (dailyEarning * depositPeriod).toFixed(2);
  };

  return (
    <Container id="deposit" className="mb-5 col-lg-6 rounded-3">
      <Card bg="light" className="p-4 shadow-sm" >
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Deposit Period (days): {depositPeriod}</Form.Label>
              <Form.Range
                min={RANGE_START}
                max={RANGE_END}
                value={depositPeriod}
                onChange={(e) => setDepositPeriod(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deposit Amount:</Form.Label>
              <Form.Control
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                min={minDeposit}
                max={maxDeposit} 
              />
            </Form.Group>
            <div className="text-muted text-center mb-4 d-flex flex-md-row flex-column justify-content-between">

              <p>Daily ROI: <strong>{calculateROI(depositPeriod)}%</strong></p>
              <p>Total Profit: <strong>{calculateTotalProfit(depositPeriod)}%</strong></p>
              <p>
                In {depositPeriod} days you will earn:  <strong>{calculateEarnings()} BNB</strong>
              </p>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <Button variant="warning" className="w-50 w-md-50 py-3 fw-bold mb-4">
                Invest
                </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfitCalculator;
