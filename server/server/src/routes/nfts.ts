import express from "express";
import { ethers } from "ethers";
import { fanNFTAddress, fanNFTAbi } from "../contracts/fanNFT";

const router = express.Router();
const provider = new ethers.JsonRpcProvider("http://localhost:8545");

router.get("/:address", async (req, res) => {
  try {
    const userAddress = req.params.address.toLowerCase();
    const nftContract = new ethers.Contract(fanNFTAddress, fanNFTAbi, provider);

    const balance = await nftContract.balanceOf(userAddress);
    const uris: string[] = [];

    for (let i = 0; i < balance; i++) {
      const tokenId = await nftContract.tokenOfOwnerByIndex(userAddress, i);
      const uri = await nftContract.tokenURI(tokenId);
      uris.push(uri);
    }

    res.json({ address: userAddress, nfts: uris });
  } catch (error) {
    console.error("❌ Erreur récupération NFTs :", error);
    res.status(500).json({ error: "Erreur récupération NFTs" });
  }
});

export default router;
