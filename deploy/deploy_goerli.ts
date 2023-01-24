import { DeployFunction } from "hardhat-deploy/types";
import hre from "hardhat";

const func: DeployFunction = async (hre) => {
  const LayerZeroSendReceive = await hre.ethers.getContractFactory(
    "LayerZeroSendReceive"
  );

  // Deploy our contract to Goerli
  const sendReceiveGoerli = await LayerZeroSendReceive.deploy(
    "0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23"
  );
  await sendReceiveGoerli.deployed();
  console.log(
    "LayerZeroSendReceive deployed on Goerli to:",
    sendReceiveGoerli.address
  );
};

func(hre).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
