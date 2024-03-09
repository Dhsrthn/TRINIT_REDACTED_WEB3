// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identity {
    struct UserInfo {
        string name;
        string email;
    }

    mapping(address => UserInfo) public users;

    function setUser(string memory _name, string memory _email) public {
        UserInfo storage user = users[msg.sender];
        user.name = _name;
        user.email = _email;
    }

    function getUser(address _user) public view returns (string memory, string memory) {
        UserInfo storage user = users[_user];
        return (user.name, user.email);
    }
}