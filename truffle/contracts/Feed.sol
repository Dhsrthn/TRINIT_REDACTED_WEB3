// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Identity.sol";

contract Feed {
    struct CIDRecord {
        string cid;
        uint256 timestamp;
        string name;
        string description;
    }

    struct CIDInfo {
        address user;
        string username;
        string email;
        string[] skills;
        string cid;
        uint256 timestamp;
        string name;
        string description;
    }

    mapping(address => CIDRecord[]) private userCIDs;

    event CIDUploaded(address indexed user, string cid, uint256 timestamp);
    event CIDDeleted(address indexed user, string cid);

    address public identityContract;
    Identity public identities;

    constructor(address _identityContract) {
        identityContract = _identityContract;
        identities = Identity(identityContract);
    }

    function uploadCID(
        string memory _cid,
        string memory _name,
        string memory _description
    ) external {
        userCIDs[msg.sender].push(
            CIDRecord({
                cid: _cid,
                timestamp: block.timestamp,
                name: _name,
                description: _description
            })
        );
        emit CIDUploaded(msg.sender, _cid, block.timestamp);
    }

    function getUserCIDs(
        address _user
    ) public view returns (CIDInfo[] memory) {
        CIDRecord[] memory cidsArray = userCIDs[_user];
        CIDInfo[] memory result = new CIDInfo[](cidsArray.length);

        for (uint256 i = 0; i < cidsArray.length; i++) {
            (
                string memory name,
                string memory email,
                string memory bio,
                string[] memory skills,
                uint256 tokens
            ) = identities.getUser(_user);

            result[i] = CIDInfo({
                user: _user,
                username: name,
                email: email,
                skills: skills,
                cid: cidsArray[i].cid,
                timestamp: cidsArray[i].timestamp,
                name: cidsArray[i].name,
                description: cidsArray[i].description
            });
        }

        for (uint256 i = 0; i < result.length - 1; i++) {
            for (uint256 j = 0; j < result.length - i - 1; j++) {
                if (result[j].timestamp < result[j + 1].timestamp) {
                    CIDInfo memory temp = result[j];
                    result[j] = result[j + 1];
                    result[j + 1] = temp;
                }
            }
        }

        return result;
    }

    function getAllCIDS() public view returns (CIDInfo[] memory) {
        uint256 totalUsers = identities.totalUserCount();
        uint256 totalCIDs = 0;
        CIDInfo[] memory allCIDs;

        for (uint256 i = 0; i < totalUsers; i++) {
            totalCIDs += userCIDs[identities.userList(i)].length;
        }

        allCIDs = new CIDInfo[](totalCIDs);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalUsers; i++) {
            address currAddd = identities.userList(i);
            CIDInfo[] memory userCIDsArray = getUserCIDs(currAddd);

            for (uint256 j = 0; j < userCIDsArray.length; j++) {
                allCIDs[currentIndex] = userCIDsArray[j];
                currentIndex++;
            }
        }

        // Perform bubble sort based on timestamp in descending order
        for (uint256 i = 0; i < totalCIDs - 1; i++) {
            for (uint256 j = 0; j < totalCIDs - i - 1; j++) {
                if (allCIDs[j].timestamp < allCIDs[j + 1].timestamp) {
                    CIDInfo memory temp = allCIDs[j];
                    allCIDs[j] = allCIDs[j + 1];
                    allCIDs[j + 1] = temp;
                }
            }
        }

        return allCIDs;
    }
    function deleteCID(string memory _cid) external {
        CIDRecord[] storage cidsArray = userCIDs[msg.sender];

        for (uint256 i = 0; i < cidsArray.length; i++) {
            if (
                keccak256(abi.encodePacked(cidsArray[i].cid)) ==
                keccak256(abi.encodePacked(_cid))
            ) {
                emit CIDDeleted(msg.sender, cidsArray[i].cid);
                cidsArray[i] = cidsArray[cidsArray.length - 1];
                cidsArray.pop();
                break;
            }
        }
    }
}