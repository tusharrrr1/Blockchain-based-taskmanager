import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TaskManagerABI from "./TaskManager.json"; // ABI file

const contractAddress = "0x12283c1BBa71c19dfe03F372C5B47DB3A07f3fBB";
const abi = TaskManagerABI.abi; // Ensure ABI is correct

function App() {
  const [tasks, setTasks] = useState([]);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (!window.ethereum) {
        console.error("❌ MetaMask is not installed!");
        return;
      }
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);

        // Check if accounts are already connected
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          setAccount(accounts[0]); // Set account if already connected
        } else {
          const newAccounts = await provider.send("eth_requestAccounts", []);
          setAccount(newAccounts[0]);
        }

        const signer = await provider.getSigner(); // Await signer
        const taskContract = new ethers.Contract(contractAddress, abi, signer);
        setContract(taskContract);
      } catch (error) {
        console.error("❌ Error loading contract:", error);
      }
    };
    loadBlockchainData();
  }, []);

  const loadTasks = async () => {
    if (!contract) {
      console.error("Contract is not initialized.");
      return;
    }
  
    console.log("Fetching tasks...");
  
    try {
      const taskCount = await contract.getTaskCount(); // 🔥 Now this function exists
      let fetchedTasks = [];
  
      for (let i = 0; i < taskCount; i++) {
        try {
          let task = await contract.getTask(i);
          console.log(`Task ${i}:`, task);
          fetchedTasks.push(task);
        } catch (error) {
          console.error(`Error fetching task ${i}:`, error);
        }
      }
  
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
        

  const addTask = async (title, description) => {
    if (!contract) return;
    try {
      let tx = await contract.addTask(title, description);
      await tx.wait(); // Wait for transaction to be mined
      console.log("✅ Task added successfully!");
      loadTasks();
    } catch (error) {
      console.error("❌ Error adding task:", error);
    }
  };

  return (
    <div>
      <h1>Blockchain Task Manager</h1>
      <p>Connected Account: {account ? account : "Not connected"}</p>
      <button onClick={loadTasks}>Load Tasks</button>

      {tasks.length === 0 ? <p>No tasks available.</p> : null}

      {tasks.map((task, index) => (
        <div key={index}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
