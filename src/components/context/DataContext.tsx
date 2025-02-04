import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { fetchContractData } from "../../utils/infuraApi";

// Types aligned with contract service interface
interface ContractData {
  totalDeposits: number;
  refRewards: number;
  userInfo: {
    forWithdraw: number;
    totalInvested: number;
    totalWithdrawn: number;
    totalMatchBonus: number;
    structure: number[];
  };
  userTotalWithdrawn: number;
  userWithdrawalBalance: number;
  userTotalReferralBonus: number;
  userDownlineCountArray: number[];
  referralLink: string;
}

// Default state with all values set to 0
const defaultContractData: ContractData = {
  totalDeposits: 0,
  refRewards: 0,
  userInfo: {
    forWithdraw: 0,
    totalInvested: 0,
    totalWithdrawn: 0,
    totalMatchBonus: 0,
    structure: []
  },
  userTotalWithdrawn: 0,
  userWithdrawalBalance: 0,
  userTotalReferralBonus: 0,
  userDownlineCountArray: [],
  referralLink: ""
};

interface ContractDataContextType {
  data: ContractData;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const ContractDataContext = createContext<ContractDataContextType | undefined>(undefined);

export const ContractDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { address, isConnected } = useAccount();
  const [data, setData] = useState<ContractData>(defaultContractData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!address || !isConnected) {
      setData(defaultContractData);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const contractData = await fetchContractData(address);
      setData(contractData);
      console.log('Contract Data:', contractData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch contract data'));
      console.error('Error fetching contract data:', err);
      setData(defaultContractData);
    } finally {
      setLoading(false);
    }
  };

  // Effect to handle wallet connection/disconnection
  useEffect(() => {
    if (!isConnected) {
      setData(defaultContractData);
      setError(null);
    } else {
      fetchData();
    }
  }, [address, isConnected]);

  const refetch = async () => {
    await fetchData();
  };

  return (
    <ContractDataContext.Provider value={{ data, loading, error, refetch }}>
      {children}
    </ContractDataContext.Provider>
  );
};

export const useContractData = () => {
  const context = useContext(ContractDataContext);
  if (!context) {
    throw new Error("useContractData must be used within a ContractDataProvider");
  }
  return context;
};