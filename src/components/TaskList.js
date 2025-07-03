import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";
import { getStoredTasks, saveTasks } from "../utils/localStorage";



const TaskList = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  // const navigate = useNavigate();

  useEffect(() => {
    setTasks(getStoredTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEdit = (id, newTitle, newDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, title: newTitle, description: newDescription }
        : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // all
  });

  const handleLogout = () => {
    localStorage.removeItem("username"); // Clear localStorage
    onLogout(); // Tell App.js to reset state
  };


  return (
    <div className="task-dashboard">
      <button
        onClick={handleLogout}
        style={{ float: "right", marginBottom: "1rem" }}
      >
        🔒 Logout
      </button>
      <h2>Task Dashboard</h2>
      <TaskForm onAddTask={handleAddTask} />
      <TaskFilter currentFilter={filter} setFilter={setFilter} tasks={tasks} />

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks to show for "{filter}"</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleComplete}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
