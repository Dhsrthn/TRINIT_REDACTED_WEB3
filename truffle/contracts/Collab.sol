// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Identity.sol";


contract Collab {
    struct ProposedAgreement {
        address creator;
        string creatorName;
        string deadline;
        string terms;
        string skillsRequired;
        address potentialCollaborator;
        string collaboratorName;
        string potentialCollabSkills;
    }

    struct Collaboration {
        address p1;
        address p2;
        string party1;
        string party2;
        string terms;
        string skillsRequired;
    }

    address public IdentityContract;
    Identity public Identities;

    constructor(address _IdentityContract) {
        IdentityContract = _IdentityContract;
        Identities = Identity(IdentityContract);
    }
    
    ProposedAgreement[] public proposedAgreements;
    Collaboration[] public collaborations;

    event AgreementProposed(uint256 indexed agreementId, address indexed creator, string terms, string skillsRequired);
    event CollabRequestSent(uint256 indexed agreementId, address indexed potentialPartner);
    event AgreementApproved(uint256 indexed agreementId, address indexed party2);

    function proposeAgreement(string memory _terms, string memory _skillsRequired, string memory _deadline) public {
        (string memory name,,) = Identities.getUser(msg.sender);
        proposedAgreements.push(ProposedAgreement(msg.sender,name,_deadline, _terms, _skillsRequired, address(0), "",""));
    }

    function requestCollaboration(uint256 _agreementId, address user, string memory _skills) public {
        (string memory collabName,,) = Identities.getUser(msg.sender);
        ProposedAgreement storage proposedAgreement = proposedAgreements[_agreementId];
        require(proposedAgreement.creator != user, "Cannot collaborate on your own agreement");
        require(proposedAgreement.potentialCollaborator == address(0), "Collaboration request already pending");
        proposedAgreement.potentialCollaborator = user;
        proposedAgreement.collaboratorName = collabName;
        proposedAgreement.potentialCollabSkills = _skills;
    }


    function approveCollaborator(uint256 _agreementId) public {
        ProposedAgreement storage proposedAgreement = proposedAgreements[_agreementId];
        require(proposedAgreement.creator == msg.sender, "Only the agreement creator can approve collaborators");
        require(proposedAgreement.potentialCollaborator != address(0), "No pending collaboration request");

        Collaboration memory newCollaboration = Collaboration(proposedAgreement.creator, proposedAgreement.potentialCollaborator,proposedAgreement.creatorName, proposedAgreement.collaboratorName, proposedAgreement.terms, proposedAgreement.skillsRequired);
        collaborations.push(newCollaboration);
        
        uint256 lastIndex = proposedAgreements.length - 1;
        proposedAgreements[_agreementId] = proposedAgreements[lastIndex];
        proposedAgreements.pop();
    }

    function getAllProposedAgreements() public view returns (ProposedAgreement[] memory) {
        return proposedAgreements;
    }

    function getAllCollaborations() public view returns (Collaboration[] memory) {
        return collaborations;
    }
    function getMyProposedAgreements() public view returns (ProposedAgreement[] memory) {
        ProposedAgreement[] memory creatorAgreements = new ProposedAgreement[](proposedAgreements.length);
        uint256 count = 0;
        for (uint256 i = 0; i < proposedAgreements.length; i++) {
            if (proposedAgreements[i].creator == msg.sender) {
                creatorAgreements[count] = proposedAgreements[i];
                count++;
            }
        }
        ProposedAgreement[] memory filteredAgreements = new ProposedAgreement[](count);
        for (uint256 i = 0; i < count; i++) {
            filteredAgreements[i] = creatorAgreements[i];
        }

        return filteredAgreements;
    }
    function getMyCollaborations() public view returns (Collaboration[] memory) {
        Collaboration[] memory userCollaborations = new Collaboration[](collaborations.length);
        uint256 count = 0;
        for (uint256 i = 0; i < collaborations.length; i++) {
            if (collaborations[i].p1 == msg.sender || collaborations[i].p2 == msg.sender) {
                userCollaborations[count] = collaborations[i];
                count++;
            }
        }
        Collaboration[] memory filteredCollaborations = new Collaboration[](count);
        for (uint256 i = 0; i < count; i++) {
            filteredCollaborations[i] = userCollaborations[i];
        }

        return filteredCollaborations;
    }
    function getPendingAgreements() public view returns (ProposedAgreement[] memory) {
        ProposedAgreement[] memory pendingAgreements = new ProposedAgreement[](proposedAgreements.length);
        uint256 count = 0;
        for (uint256 i = 0; i < proposedAgreements.length; i++) {
            if (proposedAgreements[i].creator == msg.sender && proposedAgreements[i].potentialCollaborator != address(0)) {
                pendingAgreements[count] = proposedAgreements[i];
                count++;
            }
        }
        ProposedAgreement[] memory filteredAgreements2 = new ProposedAgreement[](count);
        for (uint256 i = 0; i < count; i++) {
            filteredAgreements2[i] = pendingAgreements[i];
        }
        return filteredAgreements2;
    }
}


