import { ethers } from "ethers";
import { getContract } from "./providers";

export const AirQualityRecordABI = [];

export const AirQualityRecordAddress = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as string;

export function getAirQualityContract() {
  return getContract(AirQualityRecordAddress, AirQualityRecordABI);
}
