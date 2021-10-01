// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { EVMcrispr } = require("@commonsswarm/evmcrispr");

const dao = '0xa5396c929d792A31b8F4324b69ed1EC5bC7d13B4';
const brightIdGatekeeper = '0x7714Eb44754cB9db6D65b61f3352df12600dC593';

async function main() {
  const signer = (await hre.ethers.getSigners())[0];
  const evmcrispr = await EVMcrispr.create(signer, dao);
  const tx = await evmcrispr.forward([
    evmcrispr.addPermission([
      evmcrispr.ANY_ENTITY,
      'voting',
      'CREATE_VOTES_ROLE',
      evmcrispr.setOracle(brightIdGatekeeper)
    ], 'voting')
  ], ['voting']);
  console.log(`Vote created: ${tx.transactionHash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
