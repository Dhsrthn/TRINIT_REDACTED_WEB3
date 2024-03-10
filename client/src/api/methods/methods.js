// Methods that interacts with all the contracts go here
import Web3 from "web3";
import { getAccount } from "../../utils/utils.js";
// contracts' addresses and abis
import ContractAddress from "../contracts/address.js";
import IdentityJson from "../../../../truffle/build/contracts/Identity.json";
import TokenJson from "../../../../truffle/build/contracts/Token.json";
import CollabJson from "../../../../truffle/build/contracts/Collab.json";
//initialise the provider
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

// Initialise contracts here
const IdentityContract = new web3.eth.Contract(
  IdentityJson.abi,
  ContractAddress.IdentityAddress
);

const TokenContract = new web3.eth.Contract(
  TokenJson.abi,
  ContractAddress.TokenAddress
);

// Get account
const account = await getAccount();
console.log(account);

// Identity contract methods
export async function signUp(name, email) {
  try {
    await IdentityContract.methods.setUser(name, email).send({ from: account });
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

const CollabContract = new web3.eth.Contract(
  CollabJson.abi,
  ContractAddress.CollabAddress
);


// Propose an agreement
export async function proposeAgreement(terms, skillsRequired, deadline) {
  try {
    await CollabContract.methods.proposeAgreement(terms, skillsRequired, deadline).send({ from: account });
    return [null, true];
  } catch (error) {
    return [error, false];
  }
}

// Request collaboration
export async function requestCollaboration(agreementId, user, skills) {
  try {
    await CollabContract.methods.requestCollaboration(agreementId, user, skills).send({ from: account });
    return [null, true];
  } catch (error) {
    return [error, false];
  }
}

// Approve collaborator
export async function approveCollaborator(agreementId) {
  try {
    await CollabContract.methods.approveCollaborator(agreementId).send({ from: account });
    return [null, true];
  } catch (error) {
    return [error, false];
  }
}

// Get all proposed agreements
export async function getAllProposedAgreements() {
  const result = await CollabContract.methods.getAllProposedAgreements().call();
  return result;
}

// Get user's collaborations
export async function getMyCollaborations() {
  const result = await CollabContract.methods.getMyCollaborations().call({ from: account });
  return result;
}

// Get user's pending agreements
export async function getPendingAgreements() {
  const result = await CollabContract.methods.getPendingAgreements().call({ from: account });
  return result;
}


// Token contract methods
export async function getTokens() {
  return await TokenContract.methods.balanceOf(account).call();
}

export async function getStake() {
  return await TokenContract.methods.getStakePercentage(account).call();
}
