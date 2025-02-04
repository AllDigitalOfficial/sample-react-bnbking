
interface ContractData {
    totalDeposits: number;
    totalUsers: number;
    withdrawnData: number;
    refRewards: number;
  }

  export const getCardDataContractData = (data: ContractData) => [
    {
      id: "deposited",
      title: "Deposited",
      value: data?.totalDeposits || 0,
      unit: "BNB",
      iconClass: "bi bi-wallet2 fs-3 text-primary",
    },
    {
      id: "refRewards",
      title: "Ref Rewards",
      value: data?.refRewards || 0,
      unit: "BNB",
      iconClass: "bi bi-gift fs-3 text-primary",
    },
  ];
  
interface IncomeData {
  userTotalDeposit: number;
  userProfit: number;
  userTotalWithdrawn: number;
  userPercentRate: string;
}

export const getCardDataYourIncome = (data: IncomeData) => {
    return [
      {
        id: "userDeposits",
        title: "Total Deposit",
        value: data?.userTotalDeposit || 0.0,
        color: import.meta.env.VITE_APP_TOTAL_DEPOSIT_COLOR || "#28a745",
      },
      
      {
        id: "totalUserTotalWithdrawn",
        title: "Total Withdrawn",
        value: data?.userTotalWithdrawn || 0.0,
        color: import.meta.env.VITE_APP_TOTAL_WITHDRAWN_COLOR || "#dc3545",
      },
     
    ];
  };
  
