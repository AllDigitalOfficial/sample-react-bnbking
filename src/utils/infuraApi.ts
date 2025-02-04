import { ethers } from "ethers";
import { INFURA_API_URL, CONTRACT_ADDRESS, ABI } from "./constants";
  const referralLink = import.meta.env.VITE_APP_REFFERAL_LINK_DOMAIN || "You will get your ref link after investing"; // Default referral link


interface ContractData {
    totalDeposits: number;
    refRewards: number;
  
    userTotalDeposit: number;
    userTotalWithdrawn: number;
    userWidthdrawalBalance: number;
    userTotalReferralBouns: number;
  
    userDownlineCountArray: number[];
    referralLink: string;
}

export const fetchContractData = async (address: string): Promise<ContractData> => {
  if (!address) throw new Error("Wallet address is required");

  try {
    const provider = new ethers.JsonRpcProvider(INFURA_API_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

    const ownerAddress = import.meta.env.VITE_APP_OWNER_ADDRESS as string;
    const totalDeposits = await contract.totalInvested();
    const refRewards = await contract.totalReferrals();

    const userTotalDeposit = await contract.getUserTotalDeposits(address);
    const userTotalWithdrawn = await contract.getUserTotalWithdrawn(address);
    const userTotalReferralBouns = await contract.getUserReferralTotalBonus(address);
    const userDownlineCountArray = await contract.getUserDownlineCount(address);
    const userWidthdrawalBalance = await contract.getUserWithdrawalBalance(address);

  
    const generateReferralLink = (address: string): string => `${referralLink}${address}`;
    const isOwner = address.toLowerCase() === ownerAddress.toLowerCase();
    const hasDeposits = Number(userTotalDeposit) > 0;
    let referralLinkElement = "You will get your ref link after investing";

    if (isOwner || hasDeposits) {
      referralLinkElement = generateReferralLink(address);
    }
    return {
   
      totalDeposits: Number(ethers.formatEther(totalDeposits)),
      refRewards: Number(ethers.formatEther(refRewards)),
      userTotalDeposit: Number(ethers.formatEther(userTotalDeposit)),
      userTotalWithdrawn: Number(ethers.formatEther(userTotalWithdrawn)),
      userTotalReferralBouns: Number(ethers.formatEther(userTotalReferralBouns)),
      userWidthdrawalBalance: Number(ethers.formatEther(userWidthdrawalBalance)),
      userDownlineCountArray: userDownlineCountArray.map((count: bigint) => Number(count)),
      referralLink: referralLinkElement,
    };
  } catch (error) {
    console.error("Error fetching contract data:", error);
    throw error;
  }
};
