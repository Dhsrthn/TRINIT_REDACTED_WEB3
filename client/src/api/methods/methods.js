// Methods that interact with all the contracts go here
import Web3 from "web3";
import { getAccount } from "../../utils/utils.js";
// contracts' addresses and abis
import ContractAddress from "../contracts/address.js";
import IdentityJson from "../../../../truffle/build/contracts/Identity.json";
import TokenJson from "../../../../truffle/build/contracts/Token.json";
import CollabJson from "../../../../truffle/build/contracts/Collab.json";
import FeedJson from "../../../../truffle/build/contracts/Feed.json";

// Initialize the provider
let web3;
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  try {
    window.ethereum.enable();
  } catch (error) {
    console.error("User denied account access");
  }
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  console.log(
    "Non-Ethereum browser detected. You should consider trying MetaMask!"
  );
}

// Initialize contracts here
const IdentityContract = new web3.eth.Contract(
  IdentityJson.abi,
  ContractAddress.IdentityAddress
);

const TokenContract = new web3.eth.Contract(
  TokenJson.abi,
  ContractAddress.TokenAddress
);

const CollabContract = new web3.eth.Contract(
  CollabJson.abi,
  ContractAddress.CollabAddress
);

const FeedContract = new web3.eth.Contract(
  FeedJson.abi,
  ContractAddress.FeedAddress
);

// Get account
const account = await getAccount();
console.log(account);

// Identity contract methods
export async function signUp(name, email, bio, talents) {
  try {
    await IdentityContract.methods
      .setUser(name, email, bio, talents)
      .send({ from: account });
    return [null, true];
  } catch (error) {
    return [error, false];
  }
}

export async function Login() {
  const returnObj = await IdentityContract.methods.getUser(account).call();
  console.log(returnObj);
  return returnObj;
}

export async function Show(address) {
  const returnObj = await IdentityContract.methods.getUser(address).call();
  console.log(returnObj);
  return returnObj;
}

export async function getAllowedTalents() {
  const returnObj = await IdentityContract.methods.getAllowedTalents().call();
  return returnObj;
}

// Collab Functions
export async function proposeAgreement(terms, skillsRequired, deadline) {
  try {
    await CollabContract.methods
      .proposeAgreement(terms, skillsRequired, deadline)
      .send({ from: account });
    return [null, true];
  } catch (error) {
    return [error, false];
  }
}

export async function requestCollaboration(agreementId, user, skills) {
  try {
    await CollabContract.methods
      .requestCollaboration(agreementId, user, skills)
      .send({ from: account });
    return [null, true];
  } catch (error) {
    return [error, false];
  }
}

export async function approveCollaborator(agreementId) {
  try {
    await CollabContract.methods
      .approveCollaborator(agreementId)
      .send({ from: account });
    return [null, true];
  } catch (error) {
    return [error, false];
  }
}

export async function getAllProposedAgreements() {
  const result = await CollabContract.methods.getAllProposedAgreements().call();
  return result;
}

export async function getMyCollaborations() {
  const result = await CollabContract.methods
    .getMyCollaborations()
    .call({ from: account });
  return result;
}

export async function getPendingAgreements() {
  const result = await CollabContract.methods
    .getPendingAgreements()
    .call({ from: account });
  return result;
}

// Token contract methods
export async function getTokens() {
  return await TokenContract.methods.balanceOf(account).call();
}

export async function getStake() {
  return await TokenContract.methods.getStakePercentage(account).call();
}

// Feed functions
export async function getMyFeed() {
  const toReturn = await FeedContract.methods.getUserCIDs(account).call();
  return toReturn;
}

export async function getOtherFeed(toGet) {
  const toReturn = await FeedContract.methods.getUserCIDs(toGet).call();
  return toReturn;
}

export async function getTotalFeed() {
  const toReturn = await FeedContract.methods.getAllCIDS().call();
  console.log(toReturn)
  return toReturn;
}

export async function uploadToFeed(cid, name, desc) {
  try {
    await FeedContract.methods.uploadCID(cid, name, desc).send({ from: account });
  } catch (err) {
    console.log(err);
  }
}
