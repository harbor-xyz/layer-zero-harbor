import { DeployFunction } from "hardhat-deploy/types";
import hre from "hardhat";

const func: DeployFunction = async (hre) => {
  const LayerZeroSendReceive = await hre.ethers.getContractFactory(
    "LayerZeroSendReceive"
  );

  // Deploy our contract to Mumbai
  const sendReceiveMumbai = await LayerZeroSendReceive.deploy(
    "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8"
  );
  await sendReceiveMumbai.deployed();
  console.log(
    "LayerZeroSendReceive deployed on Mumbai to:",
    sendReceiveMumbai.address
  );
};

func(hre).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
