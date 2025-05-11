import express from "express";
import { ethers } from "ethers";

const router = express.Router();

// Adresse de ton contrat NFT déployé
const fanNFTAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// ABI minimale pour accéder à tokenURI
const fanNFTAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Endpoint : /api/nfts/:address
router.get("/:address", async (req, res) => {
  const { address } = req.params;

  try {
    const provider = new ethers.JsonRpcProvider("http://localhost:8545");
    const contract = new ethers.Contract(fanNFTAddress, fanNFTAbi, provider);

    const uris: string[] = [];
    // Lecture naïve jusqu'à 10 NFTs max (à adapter)
    for (let i = 0; i < 10; i++) {
      try {
        const tokenId = await contract.tokenOfOwnerByIndex(address, i);
        const uri = await contract.tokenURI(tokenId);
        uris.push(uri);
      } catch (err) {
        break; // Stopper si pas d'autres NFTs
      }
    }

    res.json({ nfts: uris });
  } catch (error) {
    console.error("❌ Erreur récupération NFTs :", error);
    res.status(500).json({ error: "Erreur récupération NFTs" });
  }
});

export default router;
