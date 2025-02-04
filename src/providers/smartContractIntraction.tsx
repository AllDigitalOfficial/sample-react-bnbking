import React from 'react';
import { useReadContract } from 'wagmi';
import {  AbiItem } from 'viem';
import { useAccount } from 'wagmi';
import abi from '../utils/abi.json';

// Define the ABI (replace with your actual ABI)

const USDTAbi: AbiItem[] = abi as AbiItem[];
const USDTAddress = '0x79A3852db17897C0D16B8fF3a0eeD4cC1f5f5F4E'; // Replace with your contract address

const SmartContractInteraction: React.FC = () => {
  const { data,  } = useReadContract({
    abi: USDTAbi,
    address: USDTAddress,
    functionName: 'BASE_PERCENT',
  });
  const { address } = useAccount();


  return (

    <div>
      <h1>My Address</h1>
      <p>{address}</p>
      <h1>Total Supply</h1>
      <p>{data}</p>
    </div>
  );
};

export default SmartContractInteraction;
