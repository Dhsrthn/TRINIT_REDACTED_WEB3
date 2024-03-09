// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Collab {
    struct ProposedAgreement {
        address creator;
        uint256 deadline;
        string terms;
        string skillsRequired;
        address potentialCollaborator;
        string potentialCollabSkills;
    }

    struct Collaboration {
        address party1;
        address party2;
        string terms;
        string skillsRequired;
    }

    ProposedAgreement[] public proposedAgreements;
    Collaboration[] public collaborations;

    event AgreementProposed(uint256 indexed agreementId, address indexed creator, string terms, string skillsRequired);
    event CollabRequestSent(uint256 indexed agreementId, address indexed potentialPartner);
    event AgreementApproved(uint256 indexed agreementId, address indexed party2);

    function proposeAgreement(string memory _terms, string memory _skillsRequired) public {
        proposedAgreements.push(ProposedAgreement(msg.sender, block.timestamp + 30 days, _terms, _skillsRequired, address(0),""));
    }

    function requestCollaboration(uint256 _agreementId, address user, string memory _skills) public {
        ProposedAgreement storage proposedAgreement = proposedAgreements[_agreementId];
        require(proposedAgreement.creator != user, "Cannot collaborate on your own agreement");
        require(proposedAgreement.potentialCollaborator == address(0), "Collaboration request already pending");
        proposedAgreement.potentialCollaborator = user;
        proposedAgreement.potentialCollabSkills = _skills;
    }


    function approveCollaborator(uint256 _agreementId) public {
        ProposedAgreement storage proposedAgreement = proposedAgreements[_agreementId];
        require(proposedAgreement.creator == msg.sender, "Only the agreement creator can approve collaborators");
        require(proposedAgreement.potentialCollaborator != address(0), "No pending collaboration request");

        Collaboration memory newCollaboration = Collaboration(proposedAgreement.creator, proposedAgreement.potentialCollaborator, proposedAgreement.terms, proposedAgreement.skillsRequired);
        collaborations.push(newCollaboration);
        delete proposedAgreements[_agreementId];
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
            if (collaborations[i].party1 == msg.sender || collaborations[i].party2 == msg.sender) {
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


