// client/src/utils/dao.ts
import { ethers } from "ethers";

// ✅ Adresse du contrat FanDAO déployé localement
export const fanDAOAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// ✅ ABI du contrat FanDAO
export const fanDAOAbi = [
  {
    inputs: [{ internalType: "string", name: "description", type: "string" }],
    name: "createProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getProposals",
    outputs: [
      {
        internalType: "tuple[]",
        name: "",
        type: "tuple[]",
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "description", type: "string" },
          { internalType: "uint256", name: "votes", type: "uint256" }
        ]
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "proposalId", type: "uint256" }],
    name: "voteOnProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// ✅ Initialisation du contrat
const getDAOContract = async (): Promise<ethers.Contract> => {
  if (!window.ethereum) throw new Error("🦊 MetaMask est requis");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(fanDAOAddress, fanDAOAbi, signer);
};

// ✅ Créer une proposition DAO
export const createProposal = async (description: string): Promise<ethers.Transaction> => {
  const dao = await getDAOContract();
  const tx = await dao.createProposal(description);
  await tx.wait();
  return tx;
};

// ✅ Obtenir la liste des propositions
export const getProposals = async (): Promise<{ id: bigint; description: string; votes: bigint }[]> => {
  const dao = await getDAOContract();
  return await dao.getProposals();
};

// ✅ Voter pour une proposition
export const voteOnProposal = async (proposalId: number): Promise<ethers.Transaction> => {
  const dao = await getDAOContract();
  const tx = await dao.voteOnProposal(proposalId);
  await tx.wait();
  return tx;
};
