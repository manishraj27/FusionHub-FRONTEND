import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import PortfolioPage from "./pages/Portfolio/PortfolioPage";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import Profile from "./pages/Profile/Profile";
import Auth from "./pages/Auth/Auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  return (
    <>
      {isAuthenticated ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project-mangement" element={<Home />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      ) : (
        <div>
          <Auth onLogin={handleLogin} />
        </div>
      )}
    </>
  );
}

export default App;
