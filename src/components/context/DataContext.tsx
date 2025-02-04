import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchContractData } from "../../utils/infuraApi";
import { useAccount } from "wagmi";

type ContractDataType = {
  totalDeposits: number;
  refRewards: number;

  userTotalDeposit: number;
  userTotalWithdrawn: number;
  userWidthdrawalBalance: number;
  userTotalReferralBouns: number;

  userDownlineCountArray: number[];
  referralLink: string;
};

type ContractDataContextType = {
  data: ContractDataType;
  loading: boolean;
};

const ContractDataContext = createContext<ContractDataContextType | undefined>(undefined);

export const ContractDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address } = useAccount();
  const [data, setData] = useState<ContractDataType>({
   
    totalDeposits: 0,
    refRewards: 0,
    userTotalDeposit: 0,
    userTotalWithdrawn: 0,
    userWidthdrawalBalance: 0, 
    userTotalReferralBouns: 0,
    userDownlineCountArray: [],
    referralLink: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchContractData( address || "");
      setData(fetchedData);
      setLoading(false);
    };
    getData();  
  }, []);

  return (
    <ContractDataContext.Provider value={{ data, loading }}>
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
