import Web3 from "web3";
import { abi } from "../api/contracts/config.js"

let web3;

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
        window.ethereum.enable();
    } catch (error) {
        console.error('User denied account access');
    }
} else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
} else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}
const contractAddress = '0xcF66169a3DEDddF9642D86fBd2dE12f358eB7BCE'; // Use the deployed contract address

const contract = new web3.eth.Contract(abi, contractAddress);

export { contract };