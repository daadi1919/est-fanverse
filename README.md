# EST FanVerse – MVP Technique

Projet open-source pour le club Espérance Sportive de Tunis (EST).

## 🎯 Objectif

Ce dépôt contient une première version fonctionnelle du projet **EST FanVerse**, permettant :
- la gestion de Fan Tokens ($TARAJI)
- la consultation et l'achat de NFTs liés au club
- la participation aux votes communautaires (DAO simplifiée)
- l'accumulation de points de fidélité

## 📁 Structure du projet

```
est-fanverse/
├── client/                 # Frontend React + Tailwind
│   └── src/
│       ├── pages/          # Pages publiques : Accueil, Boutique, Compte, DAO
│       ├── components/     # UI : Header, NFTCard, LoginForm...
│       └── App.tsx         # Navigation principale
├── server/                 # Backend Node.js/Express
│   └── src/
│       ├── routes/         # Routes API : /auth, /tokens, /nfts, /votes
│       └── index.ts        # Point d'entrée Express
├── contracts/              # Smart Contracts Solidity
│   ├── FanToken.sol        # ERC20 $TARAJI
│   └── FanNFT.sol          # ERC721 NFT collector
├── .env.example            # Variables d'environnement (à copier en .env)
├── docker-compose.yml      # Conteneurisation pour développement local
└── README.md
```

---

## ⚙️ Installation rapide

### 1. Cloner le dépôt
```bash
git clone https://github.com/[TON-UTILISATEUR]/est-fanverse.git
cd est-fanverse
```

### 2. Configuration
Copier le fichier `.env.example` en `.env` dans le dossier `server` et remplir :
- `MONGODB_URI`
- `JWT_SECRET`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` (facultatif)

### 3. Lancer en développement
```bash
# Lancer backend
cd server
npm install
npm run dev

# Lancer frontend
cd ../client
npm install
npm run dev
```

### 4. Déployer les smart contracts (Hardhat)
```bash
cd contracts
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

---

## ✅ Fonctionnalités incluses
- Connexion par email / Google (NextAuth ou JWT API selon config)
- Visualisation de NFTs du club
- Achat et vente de NFTs (mock)
- Simulation de vote DAO simple
- Gestion de points de fidélité par action
- Interface React responsive avec Tailwind

---

## 🛠️ À venir
- Intégration réelle Web3 (MetaMask / WalletConnect complet)
- Paiement réel via USDT / BNB / MATIC
- Notifications live (socket.io)
- Mobile App (Flutter ou React Native)

---

## 📄 Licence
Code open-source pour usage communautaire. Toute exploitation commerciale requiert accord du club.

**Vive l’Espérance !**
# EST FanVerse
Voir README complet dans le projet.
# est-fanverse
