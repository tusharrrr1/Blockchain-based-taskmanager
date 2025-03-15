const hre = require("hardhat");

async function main() {
  const TaskManager = await hre.ethers.getContractFactory("TaskManager");
  const taskManager = await TaskManager.deploy();

  await taskManager.waitForDeployment();

  console.log(`TaskManager deployed to: ${taskManager.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
