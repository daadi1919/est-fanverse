const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("📦 Déploiement avec le compte :", deployer.address);

  const FanToken = await ethers.getContractFactory("FanToken");
  const fanToken = await FanToken.deploy();
  await fanToken.waitForDeployment();
  const fanTokenAddress = await fanToken.getAddress();
  console.log("✅ FanToken déployé à :", fanTokenAddress);

  const FanNFT = await ethers.getContractFactory("FanNFT");
  const fanNFT = await FanNFT.deploy();
  await fanNFT.waitForDeployment();
  const fanNFTAddress = await fanNFT.getAddress();
  console.log("✅ FanNFT déployé à :", fanNFTAddress);

  // 📝 Écriture des adresses dans le frontend
  const contractsPath = path.join(__dirname, "../../client/src/contracts.json");
  fs.writeFileSync(
    contractsPath,
    JSON.stringify(
      {
        fanTokenAddress,
        fanNFTAddress
      },
      null,
      2
    )
  );

  console.log("📁 Adresses enregistrées dans client/src/contracts.json");
}

main().catch((error) => {
  console.error("❌ Erreur de déploiement :", error);
  process.exit(1);
});
