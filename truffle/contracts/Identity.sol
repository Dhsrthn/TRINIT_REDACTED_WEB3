// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Token.sol";

contract Identity {
    struct UserInfo {
        string name;
        string email;
    }

    address public tokenContract;
    Token public tokens;

    constructor(address _tokenContract) {
        tokenContract = _tokenContract;
        tokens = Token(tokenContract);
    }

    mapping(address => UserInfo) public users;

    function setUser(string memory _name, string memory _email) public {
        UserInfo storage user = users[msg.sender];
        user.name = _name;
        user.email = _email;
        tokens.initializeUser(msg.sender);
    }

    function getUser(
        address _user
    ) public view returns (string memory, string memory, uint256) {
        UserInfo storage user = users[_user];
        uint256 userTokens = tokens.balanceOf(_user);
        return (user.name, user.email, userTokens);
    }
}
