// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FanDAO {
    struct Proposal {
        string description;
        uint voteYes;
        uint voteNo;
        bool executed;
    }

    mapping(uint => Proposal) public proposals;
    uint public proposalCount;
    mapping(address => mapping(uint => bool)) public hasVoted;

    event ProposalCreated(uint indexed id, string description);
    event Voted(uint indexed id, address indexed voter, bool support);
    event Executed(uint indexed id);

    function createProposal(string memory description) public {
        proposalCount++;
        proposals[proposalCount] = Proposal(description, 0, 0, false);
        emit ProposalCreated(proposalCount, description);
    }

    function vote(uint proposalId, bool support) public {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        require(!hasVoted[msg.sender][proposalId], "Already voted");

        Proposal storage proposal = proposals[proposalId];
        if (support) {
            proposal.voteYes++;
        } else {
            proposal.voteNo++;
        }
        hasVoted[msg.sender][proposalId] = true;

        emit Voted(proposalId, msg.sender, support);
    }

    function execute(uint proposalId) public {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Already executed");

        proposal.executed = true;
        emit Executed(proposalId);
    }
}
