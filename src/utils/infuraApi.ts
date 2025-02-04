import { ethers } from "ethers";
import { INFURA_API_URL, CONTRACT_ADDRESS, ABI } from "./constants";


  // Types
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
  
  interface PlayerInfo {
    upline: string;
    dividends: bigint;
    match_bonus: bigint;
    last_payout: number;
    total_invested: bigint;
    total_withdrawn: bigint;
    total_match_bonus: bigint;
  }

  
  export const fetchContractData = async (address: string): Promise<ContractData> => {
    if (!address) throw new Error("Wallet address is required");
  
    try {
      const provider = new ethers.JsonRpcProvider(INFURA_API_URL);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        provider
      );
  
      const ownerAddress = import.meta.env.VITE_APP_OWNER_ADDRESS as string;
      const referralLink = import.meta.env.VITE_APP_REFFERAL_LINK_DOMAIN || "You will get your ref link after investing";
  
      // Fetch contract-wide data
      const totalDeposits = await contract.invested();
      const refRewards = await contract.match_bonus();
  
      // Fetch user-specific data
      const userInfoResult = await contract.userInfo(address);
      const playerInfo: PlayerInfo = await contract.players(address);
  
      // Generate referral link
      const generateReferralLink = (addr: string): string => `${referralLink}${addr}`;
      const isOwner = address.toLowerCase() === ownerAddress.toLowerCase();
      const hasDeposits = Number(playerInfo.total_invested) > 0;
      
      const referralLinkValue = (isOwner || hasDeposits) 
        ? generateReferralLink(address)
        : "You will get your ref link after investing";
  
      // Calculate payout
      const currentPayout = await contract.payoutOf(address);
  
      return {
        totalDeposits: Number(ethers.formatEther(totalDeposits)),
        refRewards: Number(ethers.formatEther(refRewards)),
        userInfo: {
          forWithdraw: Number(ethers.formatEther(userInfoResult[0])),
          totalInvested: Number(ethers.formatEther(userInfoResult[1])),
          totalWithdrawn: Number(ethers.formatEther(userInfoResult[2])),
          totalMatchBonus: Number(ethers.formatEther(userInfoResult[3])),
          structure: userInfoResult[4].map((count: bigint) => Number(count))
        },
        userTotalWithdrawn: Number(ethers.formatEther(playerInfo.total_withdrawn)),
        userWithdrawalBalance: Number(ethers.formatEther(currentPayout)),
        userTotalReferralBonus: Number(ethers.formatEther(playerInfo.total_match_bonus)),
        userDownlineCountArray: userInfoResult[4].map((count: bigint) => Number(count)),
        referralLink: referralLinkValue
      };
  
    } catch (error) {
      console.error("Error fetching contract data:", error);
      throw error;
    }
  };