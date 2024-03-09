// Methods that interacts with all the contracts
import Web3 from "web3";
import { getAccount } from "../../utils/utils.js";
// contracts' abis and addresses
import ContractAddress from "../contracts/address.js";
import IdentityJson from "../../../../truffle/build/contracts/Identity.json";

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

// Get account
const account = await getAccount();

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
  return returnObj;
}
