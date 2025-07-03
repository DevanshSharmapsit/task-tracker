import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import TaskDashboard from "./components/TaskList";

// function App() {
//   const [username, setUsername] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("username");
//     setUsername(storedUser);
//     console.log("Username from localStorage:", storedUser);
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             !username ? (
//               <Login onLogin={setUsername} />
//             ) : (
//               <Navigate to="/dashboard" />
//             )
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={username ? <TaskDashboard /> : <Navigate to="/" />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    setUsername(storedUser);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !username ? (
              <Login onLogin={setUsername} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            username ? (
              <TaskDashboard onLogout={() => setUsername(null)} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
