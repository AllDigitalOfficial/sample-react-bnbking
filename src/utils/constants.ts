import ABI from './abi.json';

export const INFURA_API_URL = import.meta.env.VITE_APP_INFURA_API_URL; 
export const CONTRACT_ADDRESS = import.meta.env.VITE_APP_INFURA_CONTRACT_ADDRESS || "0xA1f9d358406fB7f4C90EC1AF9bA0e533B398CD53";
console.log("CONTRACT_ADDRESS", CONTRACT_ADDRESS);
export { ABI };