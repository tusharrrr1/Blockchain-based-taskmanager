# Blockchain Task Manager

A decentralized task manager built with **Solidity, Hardhat, React, and Ethers.js** that allows users to create, edit, complete, and delete tasks stored on the Ethereum blockchain.

---
## 🚀 Features
- Add tasks with a title and description
- Edit existing tasks
- Mark tasks as completed
- Delete tasks
- Fetch tasks using smart contract calls
- Frontend built with React & Ethers.js

---
## 🔹 Smart Contract Deployment (Hardhat)

### **1️⃣ Clone Repository & Install Dependencies**
```sh
git clone https://github.com/your-repo/blockchain-task-manager.git
cd blockchain-task-manager
npm install
```

### **2️⃣ Compile & Deploy Contract**
```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

### **3️⃣ Sample Deployed Contract Address (Testnet)**
```
0x9543Ac03e580B22Fc8cE044EF3792F1e96AB6083
```

---
## 📡 Interacting with Smart Contract using Postman

You can interact with the deployed contract using **Postman** (or any JSON-RPC client). Use **Infura** or **Alchemy** as an Ethereum RPC provider.

### **1️⃣ Get Task Count**
#### **Request:**
```json
{
  "jsonrpc": "2.0",
  "method": "eth_call",
  "params": [{
    "to": "0xYourDeployedContractAddress",
    "data": "0x18160ddd"
  }, "latest"],
  "id": 1
}
```
#### **Response:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x03"
}
```

### **2️⃣ Add a Task**
#### **Request:**
```json
{
  "jsonrpc": "2.0",
  "method": "eth_sendTransaction",
  "params": [{
    "from": "0xYourWalletAddress",
    "to": "0xYourDeployedContractAddress",
    "data": "0xa9059cbb..."  
  }],
  "id": 1
}
```

_(Use the encoded function data for `addTask`)_

### **3️⃣ Fetch a Task by ID**
#### **Request:**
```json
{
  "jsonrpc": "2.0",
  "method": "eth_call",
  "params": [{
    "to": "0xYourDeployedContractAddress",
    "data": "0xabcdef12..."
  }, "latest"],
  "id": 1
}
```

---
## 🎨 Frontend Setup & Run
```sh
cd frontend
npm install
npm start
```

---
## ✅ To-Do
- [ ] Add WalletConnect integration
- [ ] Improve UI design with TailwindCSS
- [ ] Enable real-time updates using event listeners

---
## 📜 License
This project is licensed under **MIT License**.

