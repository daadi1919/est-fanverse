const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("\u{1F4E6} Deploiement avec le compte:", deployer.address);

  const FanDAO = await hre.ethers.getContractFactory("FanDAO");
  const fanDAO = await FanDAO.deploy();
  await fanDAO.waitForDeployment();

  console.log("\u{2705} FanDAO deploye a:", await fanDAO.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
