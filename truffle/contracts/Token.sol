// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public userBalance;
    mapping(address => bool) public initialized;
    uint256 public totalTokens;

    uint256 private constant INITIAL_AMOUNT = 1000;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Burn(address indexed from, uint256 value);

    mapping(address => bool) public allowed;
    modifier allowedAddresses() {
        require(allowed[msg.sender], "Not allowed to call this function");
        _;
    }

    // sets the contract deployer as a allowed address
    constructor() {
        allowed[msg.sender] = true;
    }

    // to set other contract addresses as allowed address
    function addAllowedAddress(address _newAddress) external allowedAddresses {
        allowed[_newAddress] = true;
    }

    function initializeUser(address _user) external allowedAddresses {
        require(!initialized[_user], "User already initialized");
        userBalance[_user] = INITIAL_AMOUNT;
        initialized[_user] = true;
        totalTokens += INITIAL_AMOUNT;
    }

    function transfer(
        address _recipient,
        uint256 _amount
    ) external allowedAddresses returns (bool) {
        require(userBalance[msg.sender] >= _amount, "Insufficient balance");
        userBalance[msg.sender] -= _amount;
        userBalance[_recipient] += _amount;
        emit Transfer(msg.sender, _recipient, _amount);
        return true;
    }

    function balanceOf(address _account) external view returns (uint256) {
        return userBalance[_account];
    }

    function addTokens(address _to, uint256 _amount) external allowedAddresses {
        require(initialized[_to], "User not initialized");
        userBalance[_to] += _amount;
        totalTokens += _amount;
        emit Transfer(address(0), _to, _amount);
    }

    function burnTokens(uint256 _amount) external allowedAddresses {
        require(userBalance[msg.sender] >= _amount, "Insufficient balance");
        userBalance[msg.sender] -= _amount;
        totalTokens -= _amount;
        emit Burn(msg.sender, _amount);
    }

    function getStakePercentage(address _user) external view returns (uint256) {
        require(totalTokens > 0, "Total tokens are zero");
        uint256 stakePercentage = (userBalance[_user] * 100) / totalTokens;
        return stakePercentage;
    }

    function destroyUserTokens() external allowedAddresses {
        uint256 amountToDestroy = userBalance[msg.sender];
        totalTokens -= amountToDestroy;
        userBalance[msg.sender] = 0;
        emit Burn(msg.sender, amountToDestroy);
    }
}
