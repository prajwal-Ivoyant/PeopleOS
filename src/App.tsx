import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Dashboard"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;