import React from 'react';
import { useReadContract } from 'wagmi';
import {  AbiItem } from 'viem';
import { useAccount } from 'wagmi';
import abi from '../utils/abi.json';

// Define the ABI (replace with your actual ABI)

const USDTAbi: AbiItem[] = abi as AbiItem[];
const USDTAddress = '0xA1f9d358406fB7f4C90EC1AF9bA0e533B398CD53'; // Replace with your contract address

const SmartContractInteraction: React.FC = () => {
  const { data,  } = useReadContract({
    abi: USDTAbi,
    address: USDTAddress,
    functionName: 'totalSupply'
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
