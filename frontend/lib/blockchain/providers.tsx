import { ethers } from 'ethers';

let provider: ethers.providers.JsonRpcProvider;

export function getProvider() {
  if (!provider) {
    provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_POLYGON_RPC_URL
    );
  }
  return provider;
}

export function getContract(address: string, abi: any) {
  const provider = getProvider();
  return new ethers.Contract(address, abi, provider);
}