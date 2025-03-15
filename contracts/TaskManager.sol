// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TaskManager is Ownable {
    struct Task {
        uint256 id;
        string title;
        string description;
        bool isCompleted;
        address owner;
    }

    mapping(uint256 => Task) public tasks;
    uint256 private taskCounter;

    event TaskCreated(uint256 id, string title, address owner);
    event TaskCompleted(uint256 id);
    event TaskUpdated(uint256 id, string title, string description);
    event TaskDeleted(uint256 id);

    constructor() Ownable(msg.sender) {}

    function addTask(string memory _title, string memory _description) public {
        uint256 taskId = taskCounter++; // Increment taskCounter
        tasks[taskId] = Task(taskId, _title, _description, false, msg.sender);
        emit TaskCreated(taskId, _title, msg.sender);
    }

    function completeTask(uint256 _taskId) public {
        require(tasks[_taskId].owner == msg.sender, "Not task owner");
        tasks[_taskId].isCompleted = true;
        emit TaskCompleted(_taskId);
    }

    function editTask(uint256 _taskId, string memory _title, string memory _description) public {
        require(tasks[_taskId].owner == msg.sender, "Not task owner");
        tasks[_taskId].title = _title;
        tasks[_taskId].description = _description;
        emit TaskUpdated(_taskId, _title, _description);
    }

    function deleteTask(uint256 _taskId) public {
        require(tasks[_taskId].owner == msg.sender, "Not task owner");
        delete tasks[_taskId];
        emit TaskDeleted(_taskId);
    }

    function getTask(uint256 _taskId) public view returns (Task memory) {
        return tasks[_taskId];
    }

    // 🔥 New function to fetch task count
    function getTaskCount() public view returns (uint256) {
        return taskCounter;
    }
}
