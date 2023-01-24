const hre = require("hardhat");
const { ethers } = require("ethers");
const { expect } = require("chai");

describe("Layer zero test", () => {
  let messageToSend;
  let sendReceiveMumbai;
  let sendReceiveGoerli;
  before(async () => {
    const LayerZeroSendReceive = await hre.ethers.getContractFactory(
      "LayerZeroSendReceive"
    );
    // Add your Mumbai contract here
    sendReceiveMumbai = LayerZeroSendReceive.attach(
      ""
    );

    // Add your Goerli contract address here
    sendReceiveGoerli = LayerZeroSendReceive.attach(
      ""
    );

    // Default message. Change it if you'd like!
    messageToSend = "Hey Mumbai! It's me, Goerli.";
  });

  it("Check that Goerli sent the message", async () => {
    const tx = await sendReceiveGoerli.sendMsg(
      10109,
      ethers.utils.solidityPack(
        ["address", "address"],
        [
          // remote contract address (mumbai) goes here
          "",
          // local contract address (goerli) goes here
          "",
        ]
      ),
      ethers.utils.formatBytes32String(messageToSend),
      { value: ethers.utils.parseEther("0.00001") }
    );
    expect(tx.hash).length.to.be.greaterThan(0);
  });
  it.skip("Check that the message count in Mumbai is > 0", async () => {
    const count = await sendReceiveMumbai.messageCount();
    expect(count).to.be.greaterThan(0);
  });
  it.skip("Check that the message received in Mumbai is correct", async () => {
    const msg = await sendReceiveMumbai.message();
    expect(ethers.utils.parseBytes32String(msg)).to.be.equal(messageToSend);
  });
});
