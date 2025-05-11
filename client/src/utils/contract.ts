import { ethers } from "ethers";

// ✅ Adresses des contrats déployés localement
export const fanTokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const fanNFTAddress = "0x9A676e781A523b5d0C0e43731313A708CB607508";

// ✅ ABI ERC20 simplifiée
export const fanTokenAbi = [
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  }
];

// ✅ ABI ERC721 + ERC721Enumerable (FanNFT)
export const fanNFTAbi = [
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "string", name: "tokenURI", type: "string" }
    ],
    name: "mintNFT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" }
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
];

// ✅ Lire le solde de $TARAJI
export const getTokenBalance = async (account: string) => {
  if (!window.ethereum) return null;
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(fanTokenAddress, fanTokenAbi, signer);
  const balance = await contract.balanceOf(account);
  const symbol = await contract.symbol();
  return { balance: ethers.formatUnits(balance, 18), symbol };
};

// ✅ Minter un NFT
export const mintNFT = async (account: string, tokenURI: string) => {
  if (!window.ethereum) return null;
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(fanNFTAddress, fanNFTAbi, signer);
  const tx = await contract.mintNFT(account, tokenURI);
  await tx.wait();
  return tx;
};

// ✅ Obtenir les NFTs d'un utilisateur avec sécurité
export const getMintedNFTs = async (account: string): Promise<string[]> => {
  if (!window.ethereum) return [];
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(fanNFTAddress, fanNFTAbi, signer);

  const balance = await contract.balanceOf(account);
  const uris: string[] = [];

  for (let i = 0; i < balance; i++) {
    try {
      const tokenId = await contract.tokenOfOwnerByIndex(account, i);
      const uri = await contract.tokenURI(tokenId);
      uris.push(uri);
    } catch (err) {
      console.warn(`❌ Impossible de récupérer le NFT à l'index ${i} :`, err);
    }
  }

  return uris;
};
