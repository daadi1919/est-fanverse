import React, { useEffect, useState } from "react";
import {
  createProposal,
  getProposals,
  voteOnProposal
} from "../utils/dao";

function DaoPage() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [newProposal, setNewProposal] = useState<string>("");
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    connectWallet();
    fetchProposals();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Installez MetaMask");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
  };

  const fetchProposals = async () => {
    try {
      const proposalsData = await getProposals();
      setProposals(proposalsData);
    } catch (err) {
      console.error("Erreur de récupération des propositions", err);
    }
  };

  const handleSubmit = async () => {
    if (!newProposal || !account) return;
    try {
      await createProposal(newProposal, account);
      setNewProposal("");
      await fetchProposals();
    } catch (err) {
      alert("Erreur lors de la création de la proposition DAO");
      console.error(err);
    }
  };

  const handleVote = async (id: string) => {
    try {
      await voteOnProposal(id);
      await fetchProposals();
    } catch (err) {
      alert("Erreur lors du vote");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🗳️ DAO - Gouvernance Taraji</h1>

      <div style={{ marginBottom: "2rem" }}>
        <h2>📣 Nouvelle proposition</h2>
        <textarea
          value={newProposal}
          onChange={(e) => setNewProposal(e.target.value)}
          placeholder="Décris ta proposition..."
          rows={4}
          style={{ width: "100%", padding: "1rem" }}
        ></textarea>
        <button
          onClick={handleSubmit}
          style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#e60000", color: "white", border: "none", borderRadius: "5px" }}
        >
          ➕ Soumettre à la DAO
        </button>
      </div>

      <h2>📋 Propositions en cours</h2>
      {proposals.length === 0 && <p>Aucune proposition pour le moment.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {proposals.map((p, index) => (
          <li key={index} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
            <p><strong>{p.description}</strong></p>
            <p>🗳️ {p.votes} vote(s)</p>
            <button
              onClick={() => handleVote(p._id)}
              style={{ padding: "0.5rem 1rem", backgroundColor: "#ffc107", border: "none", borderRadius: "5px" }}
            >
              ✅ Voter
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DaoPage;
