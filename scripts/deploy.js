// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const brightIdRegister = "0x7714Eb44754cB9db6D65b61f3352df12600dC593"; // 1hive registry

async function main() {
  const BrightIdGatekeeper = await hre.ethers.getContractFactory("BrightIdGatekeeper");
  const brightIdGatekeeper = await BrightIdGatekeeper.deploy(brightIdRegister);

  await brightIdGatekeeper.deployed();

  console.log("BrightIdGatekeeper deployed to:", brightIdGatekeeper.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
