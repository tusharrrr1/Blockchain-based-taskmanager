// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TaskManager is Ownable {
    struct Task {
        uint256 id;
        string title;
        string description;
        bool completed;
        address owner;
    }

    uint256 public taskIdCounter;
    mapping(uint256 => Task) public tasks;

    event TaskAdded(uint256 id, string title, string description, address owner);
    event TaskCompleted(uint256 id);
    event TaskEdited(uint256 id, string title, string description);
    event TaskDeleted(uint256 id);

    // Pass the deployer's address as the initialOwner to Ownable
    constructor() Ownable(msg.sender) {}

    function addTask(string memory _title, string memory _description) public {
        taskIdCounter++;
        tasks[taskIdCounter] = Task(taskIdCounter, _title, _description, false, msg.sender);
        emit TaskAdded(taskIdCounter, _title, _description, msg.sender);
    }

    function markTaskCompleted(uint256 _taskId) public {
        require(tasks[_taskId].owner == msg.sender, "Not the task owner");
        tasks[_taskId].completed = true;
        emit TaskCompleted(_taskId);
    }

    function editTask(uint256 _taskId, string memory _title, string memory _description) public {
        require(tasks[_taskId].owner == msg.sender, "Not the task owner");
        tasks[_taskId].title = _title;
        tasks[_taskId].description = _description;
        emit TaskEdited(_taskId, _title, _description);
    }

    function deleteTask(uint256 _taskId) public {
        require(tasks[_taskId].owner == msg.sender, "Not the task owner");
        delete tasks[_taskId];
        emit TaskDeleted(_taskId);
    }

    function getAllTasks() public view returns (Task[] memory) {
        Task[] memory taskList = new Task[](taskIdCounter);
        for (uint256 i = 1; i <= taskIdCounter; i++) {
            taskList[i - 1] = tasks[i];
        }
        return taskList;
    }
}
