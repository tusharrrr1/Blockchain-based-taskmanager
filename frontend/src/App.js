import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import TaskManagerArtifact from "./TaskManager.json"; 
import { Button, TextField, Card, CardContent, Typography, Container, List, ListItem, ListItemText } from "@mui/material";

const TaskManagerABI = TaskManagerArtifact.abi; // Extract the ABI array
const contractAddress = "0x7d274F2C30C2F4A458F15Ae8ef7a3608d140828D"; // Replace with your contract address

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  // Log the ABI to verify it's correct
  console.log("ABI:", TaskManagerABI);

  // Initialize provider, signer, and contract
  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Request account access
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, TaskManagerABI, signer); // Pass ABI as an array
      setProvider(provider);
      setSigner(signer);
      setContract(contract);
      fetchTasks(contract); // Fetch tasks after initializing
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Fetch all tasks from the smart contract
  const fetchTasks = async (contract) => {
    try {
      const tasks = await contract.getAllTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch tasks. Check the console for details.");
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!title || !description) {
      alert("Please fill in both title and description.");
      return;
    }

    try {
      const tx = await contract.addTask(title, description);
      await tx.wait(); // Wait for the transaction to be mined
      alert("Task added successfully!");
      fetchTasks(contract); // Refresh the task list
      setTitle(""); // Clear the input fields
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Check the console for details.");
    }
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Blockchain Task Manager
      </Typography>

      {/* Add Task Form */}
      <Card>
        <CardContent>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={addTask}>
            Add Task
          </Button>
        </CardContent>
      </Card>

      {/* Display Tasks */}
      <List>
        {tasks.map((task) => (
          task.id !== 0 && (
            <Card key={task.id} style={{ marginTop: "10px" }}>
              <CardContent>
                <ListItem>
                  <ListItemText
                    primary={task.title}
                    secondary={task.description}
                  />
                </ListItem>
              </CardContent>
            </Card>
          )
        ))}
      </List>
    </Container>
  );
}

export default App;
