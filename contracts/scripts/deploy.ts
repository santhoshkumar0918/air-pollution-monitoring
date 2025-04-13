import { ethers } from "hardhat";

async function main() {
  console.log("Deploying AirQualityRecord contract to Polygon Amoy...");
  
  // Get the deployer's account
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying with account: ${deployer.address}`);
  
  // Check account balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Account balance: ${ethers.formatEther(balance)} MATIC`);
  
  // Deploy the contract
  const airQualityRecordFactory = await ethers.getContractFactory("AirQualityRecord");
  const airQualityRecord = await airQualityRecordFactory.deploy();
  
  // Wait for deployment to complete
  await airQualityRecord.waitForDeployment();
  
  const deployedAddress = await airQualityRecord.getAddress();
  console.log(`AirQualityRecord deployed to: ${deployedAddress}`);
  
  // Get the deployment transaction
  const deploymentTransaction = airQualityRecord.deploymentTransaction();
  console.log("Deployment transaction:", deploymentTransaction?.hash);
  
  // Wait for a few block confirmations
  if (deploymentTransaction) {
    console.log("Waiting for block confirmations...");
    await deploymentTransaction.wait(6);
    console.log("Contract deployment confirmed");
    
    // Verify the contract on PolygonScan (optional but recommended)
    try {
      console.log("Verifying contract on PolygonScan Amoy...");
      await verifyContract(deployedAddress, []);
      console.log("Contract verified successfully");
    } catch (error) {
      console.log("Error verifying contract:", error);
    }
  }
}

async function verifyContract(contractAddress: string, args: any[]) {
  const { run } = await import("hardhat");
  
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
      network: "polygonAmoy"
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Contract is already verified!");
    } else {
      console.log(e);
    }
  }
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });