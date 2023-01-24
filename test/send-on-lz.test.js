const Harbor = require("@harbor-xyz/harbor");
const hre = require("hardhat");
const { ethers } = require("ethers");
const { expect } = require("chai");

describe.only("Layer zero test", () => {
  let messageToSend;
  let sendReceiveMumbai;
  let sendReceiveGoerli;
  before(async () => {
    const LayerZeroSendReceive = await hre.ethers.getContractFactory(
      "LayerZeroSendReceive"
    );
    // Add your Mumbai contract here
    sendReceiveMumbai = LayerZeroSendReceive.attach("");

    // Add your Goerli contract address here
    sendReceiveGoerli = LayerZeroSendReceive.attach("");

    // Default message. Change it if you'd like!
    messageToSend = "Hey Mumbai! It's me, Goerli.";
  });

  it("Check that Goerli sent the message", async () => {
    const tx = await sendReceiveGoerli.sendMsg(
      10109,
      ethers.utils.solidityPack(
        ["address", "address"],
        [
          "0xC3459067800465db3cf78c884637Aa39E3D9d1CB",
          "0xE6056c9cB984eCd47b7ccCEd0eacfDd94A426F23",
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
