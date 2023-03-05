// import { HardhatRuntimeEnvironment } from "hardhat/types";
// import { DeployFunction } from "hardhat-deploy/types";
const { ethers } = require( "ethers");
const compilerOutput = require("../artifacts/contracts/YourContract.sol/YourContract.json");

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */

/*
use https://docs.ethers.org/v5/api/contract/contract-factory/
to deploy an instance of the contract 

*/

async function deployYourContract(authorAddress, authorName, subscriptionPrice, publicationName) {
  console.log("authorAddress", authorAddress);
  console.log("authorName", authorName);
  console.log("subscriptionPrice", subscriptionPrice);
  console.log("publicationName", publicationName);
  console.log("compilerOutput", compilerOutput);

  // authorName: string, subscriptionPrice: number, publicationName: string,
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */

  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const accounts = await provider.listAccounts();
  // console.log('accounts', accounts)
  // console.log('ethers', ethers)

  // const { deployments, getNamedAccounts } = ethers;
  // const { deployer } = await getNamedAccounts();
  // const { deploy } = deployments;

  let factory = new ethers.ContractFactory(compilerOutput.abi, compilerOutput.bytecode);
  console.log('factory', factory)

  // Deploy an instance of the contract
  // contract = await factory.deploy("ricmoo.eth", 42);

  console.log('authorAddress', authorAddress)

  const contract = await factory.deploy(
    authorAddress,
    authorName,
    publicationName,
    subscriptionPrice,
    // log: true,
    // // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // // automatically mining the contract deployment transaction. There is no effect on live networks.
    // autoMine: true,
  );
  console.log('deployed contract')
  await contract.deployTransaction.wait()
  // console.log('contract.address', contract.address)
  // console.log('contract.deployTransaction', contract.deployTransaction)

  // Get the deployed contract
  // const yourContract = await ethers.getContract("YourContract", authorAddress);
  // console.log("yourContract", yourContract);
};

module.exports = deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["YourContract"];
