import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { ProfitCalculatorProps } from "../../types/types";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

import abi from "../../utils/abi.json";
import './style.css';

const RANGE_START = Number(import.meta.env.VITE_APP_RANGE_START) || 70;
const RANGE_END = Number(import.meta.env.VITE_APP_RANGE_END) || 100;
const DEFAULT_DEPOSIT_PERIOD = Number(import.meta.env.VITE_APP_DEFAULT_DEPOSIT_PERIOD) || 85;
const BASE_TOTAL_PROFIT = Number(import.meta.env.VITE_APP_BASE_TOTAL_PROFIT) || 140;
const DAILY_PROFIT_INCREASE = Number(import.meta.env.VITE_APP_DAILY_PROFIT_INCREASE) || 3;
const MIN_DEPOSIT = Number(import.meta.env.VITE_APP_MIN_DEPOSIT) || 0.02;
const MAX_DEPOSIT = Number(import.meta.env.VITE_APP_MAX_DEPOSIT) || 300;
const primaryColorBorder = import.meta.env.VITE_APP_PRIMARY_COLOR || 'yellow';

const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({
  minDeposit = MIN_DEPOSIT,
  maxDeposit = MAX_DEPOSIT,
}) => {
 
  const { address, isConnected } = useAccount();
  const [depositPeriod, setDepositPeriod] = useState<number>(DEFAULT_DEPOSIT_PERIOD);
  const [depositAmount, setDepositAmount] = useState<number>(minDeposit);
  const contractAddress = import.meta.env.VITE_APP_INFURA_CONTRACT_ADDRESS;

  // Contract interaction hooks
  const {
    writeContract,
    data: hash,
    isPending,
    error: investError
  } = useWriteContract();

  const {
    isLoading: isWaitingForTransaction,
    isSuccess: isTransactionSuccess
  } = useWaitForTransactionReceipt({
    hash
  });

  // Get referrer from URL
  const getReferrer = () => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    return (ref && ref.length === 42 && ref.startsWith('0x')) ? ref : import.meta.env.VITE_APP_DEFAULT_REFERRER;
  };

  // Handle investment function
  const handleInvestment = async () => {
    try {
      if (!isConnected || !address || !depositAmount) return;

      if (depositAmount < minDeposit || depositAmount > maxDeposit) {
        throw new Error(`Investment must be between ${minDeposit} and ${maxDeposit} BNB`);
      }

      await writeContract({
        address: contractAddress,
        abi: abi,
        functionName: 'deposit',
        args: [getReferrer()],
        value: parseEther(depositAmount.toString())
      });

    } catch (error) {
      console.error('Investment error:', error);
    }
  };

  // Show success message when transaction completes
  useEffect(() => {
    if (hash) {
      alert("Investment Complete!");
    }
  }, [hash]);

  // Calculate the total profit percentage based on deposit period
  const calculateTotalProfit = (days: number): number => {
    const additionalDays = days - RANGE_START;
    return BASE_TOTAL_PROFIT + (additionalDays * DAILY_PROFIT_INCREASE);
  };

  // Calculate the daily ROI percentage
  const calculateROI = (days: number): string => {
    const totalProfit = calculateTotalProfit(days);
    return (totalProfit / days).toFixed(2);
  };

  // Calculate total earnings
  const calculateEarnings = (): string => {
    const roi = parseFloat(calculateROI(depositPeriod));
    const dailyEarning = depositAmount * (roi / 100);
    return (dailyEarning * depositPeriod).toFixed(2);
  };

  return (
    <Container id="deposit" className="mb-5 col-lg-6 rounded-3"  >
      <Card bg="light" className="p-4 shadow-sm" style={{ border: `4px solid ${primaryColorBorder}` }}>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Deposit Period (days): {depositPeriod}</Form.Label>
              <Form.Range
                min={RANGE_START}
                max={RANGE_END}
                value={depositPeriod}
                onChange={(e) => setDepositPeriod(Number(e.target.value))}
                className="custom-range"
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
                In {depositPeriod} days you will earn: <strong>{calculateEarnings()} BNB</strong>
              </p>
            </div>

            {investError && (
              <div className="alert alert-danger">
                Investment Failed
              </div>
            )}

            {isTransactionSuccess && hash && (
              <div className="alert alert-success">
                Investment successful! View on{' '}
                <a
                  href={`https://testnet.bscscan.com/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BscScan
                </a>
              </div>
            )}

            <div className="d-flex justify-content-center align-items-center">
              <Button
                variant="warning"
                className="w-50 w-md-50 py-3 fw-bold mb-4"
                onClick={handleInvestment}
                disabled={!isConnected || isPending || isWaitingForTransaction || !depositAmount}
              >
                {isPending || isWaitingForTransaction ? 'Processing...' : 'Invest'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfitCalculator;