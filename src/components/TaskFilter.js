import React from "react";

const TaskFilter = ({ currentFilter, setFilter, tasks }) => {
  const getCount = (filterType) => {
    if (filterType === "all") return tasks.length;
    if (filterType === "completed")
      return tasks.filter((task) => task.completed).length;
    if (filterType === "pending")
      return tasks.filter((task) => !task.completed).length;
  };

  return (
    <div className="task-filter">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        All ({getCount("all")})
      </button>
      <button
        className={currentFilter === "completed" ? "active" : ""}
        onClick={() => setFilter("completed")}
      >
        Completed ({getCount("completed")})
      </button>
      <button
        className={currentFilter === "pending" ? "active" : ""}
        onClick={() => setFilter("pending")}
      >
        Pending ({getCount("pending")})
      </button>
    </div>
  );
};

export default TaskFilter;
