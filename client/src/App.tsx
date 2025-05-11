import DaoPage from "./pages/DaoPage";
import React, { useState, useEffect } from "react";
import { getTokenBalance, mintNFT, getMintedNFTs } from "./utils/contract";
import DAOInterface from "./components/DAOInterface";

function App() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string>("");
  const [mintedNFTs, setMintedNFTs] = useState<string[]>([]);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Installez MetaMask !");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const selected = accounts[0];
    setAccount(selected);

    const tokenData = await getTokenBalance(selected);
    if (tokenData) {
      setBalance(tokenData.balance);
      setSymbol(tokenData.symbol);
    }

    const uris = await getMintedNFTs(selected);
    setMintedNFTs(uris);
  };

  const handleMintNFT = async () => {
    if (!account) return;
    try {
      const tokenURI = "https://example.com/nft-metadata.json";
      const tx = await mintNFT(account, tokenURI);
      alert("NFT minté avec succès ! 🚀 Tx Hash : " + tx.hash);

      await fetch("http://ns3076776.ip-217-182-194.eu:4000/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: account,
          action: "minted_nft",
          metadata: { txHash: tx.hash, tokenURI }
        })
      });

      const uris = await getMintedNFTs(account);
      setMintedNFTs(uris);
    } catch (err) {
      console.error("Erreur minting NFT :", err);
      alert("Erreur lors du mint du NFT");
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Bienvenue sur EST FanVerse 🦅</h1>
      <p>Adresse : {account}</p>
      <p>Solde : {balance} {symbol}</p>

      <button
        onClick={handleMintNFT}
        style={{ padding: "1rem", marginTop: "1rem", backgroundColor: "#e60000", color: "white", border: "none", borderRadius: "5px" }}>
        🎨 Minter un NFT
      </button>

      <h2 style={{ marginTop: "2rem" }}>🎉 Galerie de vos NFTs</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {mintedNFTs.map((uri, i) => (
          <div key={i} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "10px", width: "200px" }}>
            <img src={uri} alt={`NFT #${i + 1}`} style={{ width: "100%", borderRadius: "5px" }} />
            <p style={{ marginTop: "0.5rem" }}>#{i + 1}</p>
          </div>
        ))}
        {mintedNFTs.length === 0 && <p>Aucun NFT pour le moment.</p>}
      </div>

      {/* 🏛️ Interface DAO */}
      <DAOInterface account={account} />
    </div>
  );
}

export default App;
