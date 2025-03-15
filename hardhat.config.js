require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: ["9598f1a1ac52c5ddded69bc0a3e27bf700ee4800576a06f27c7913b6f6854850"],
    },
    mumbai: {
      url: "https://polygon-mumbai-pokt.nodies.app",
      accounts: ["9598f1a1ac52c5ddded69bc0a3e27bf700ee4800576a06f27c7913b6f6854850"],
    },
    fuji: {
      url: "https://avalanche-fuji.drpc.org",
      accounts: ["9598f1a1ac52c5ddded69bc0a3e27bf700ee4800576a06f27c7913b6f6854850"],
    },
  },
};
