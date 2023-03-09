import { ethers } from "./ethers-5.1.esm.min.js";
import { ABI, CONTRACT_ADDRESS } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balance");
const balanceText = document.getElementById("star");
const amountDiv = document.getElementById("amount");

console.log(ethers);
console.log(amountDiv.value);
let ethAmount;

amountDiv.addEventListener("input", (e) => {
  ethAmount = e.target.value;
  console.log(ethAmount);
});

const connect = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      connectButton.innerHTML = "connected";
    } catch (error) {
      console.log(error);
    }
  } else {
    connectButton.innerHTML = "install metamask";
  }
};

const fund = async () => {
  console.log(`funding with ${ethAmount}`);

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    try {
      const txn = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  }
};

const getBal = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balance = await provider.getBalance(CONTRACT_ADDRESS);
  const balanceInEth = ethers.utils.formatEther(balance);
  balanceText.textContent = balanceInEth;
  console.log(balanceInEth);
};

connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBal;
// balanceButton.onclick = getBalance;

//provider (connection to the blockchain)
//signer (wallet with some gas)
//contract we are interacting with
//ABI & ADDRESS
