import React, { useState } from "react";

const DAOInterface = ({ account }: { account: string | null }) => {
  const [proposal, setProposal] = useState("");
  const [proposals, setProposals] = useState<string[]>([]);

  const handleSubmit = async () => {
    if (!proposal || !account) return alert("Connectez votre wallet et entrez une proposition.");

    try {
      const res = await fetch("http://ns3076776.ip-217-182-194.eu:4000/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: account,
          action: "submitted_proposal",
          metadata: { proposal }
        })
      });
      if (res.ok) {
        setProposals((prev) => [...prev, proposal]);
        setProposal("");
        alert("✅ Proposition enregistrée !");
      } else {
        alert("❌ Erreur lors de l'enregistrement.");
      }
    } catch (error) {
      console.error("Erreur DAO:", error);
      alert("Erreur DAO côté client.");
    }
  };

  return (
    <div style={{ marginTop: "3rem", borderTop: "1px solid #ccc", paddingTop: "2rem" }}>
      <h2>🏛️ Interface DAO</h2>
      <input
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
        placeholder="Nouvelle proposition..."
        style={{ padding: "0.5rem", width: "300px" }}
      />
      <button
        onClick={handleSubmit}
        style={{ marginLeft: "1rem", padding: "0.5rem 1rem", backgroundColor: "#333", color: "white" }}
      >
        Soumettre
      </button>

      <h3 style={{ marginTop: "2rem" }}>📋 Propositions soumises :</h3>
      <ul>
        {proposals.map((p, idx) => (
          <li key={idx}>➡️ {p}</li>
        ))}
        {proposals.length === 0 && <p>Aucune proposition soumise.</p>}
      </ul>
    </div>
  );
};

export default DAOInterface;
