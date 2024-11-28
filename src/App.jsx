import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import StudentNavbar from "./pages/student/Navbar/StudentNavbar";
import PortfolioPage from "./pages/student/Portfolio/PortfolioPage";
import ProjectDetails from "./pages/student/ProjectDetails/ProjectDetails";
import Profile from "./pages/student/Profile/Profile";
import Auth from "./pages/student/Auth/Auth";
import Home from "./pages/student/Home/Home";

import AdminNavbar from "./pages/admin/AdminNavbar/AdminNavbar";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import ViewAllStudents from "./pages/admin/Dashboard/ViewAllStudents";
import DeleteStudents from "./pages/admin/Dashboard/DeleteStudents";
import UpdateStudents from "./pages/admin/Dashboard/UpdateStudents";

import MainNavbar from "./pages/main/MainNavbar";
import AdminLogin from "./pages/admin/Auth/AdminLogin";
import { jwtDecode } from "jwt-decode";
import MainHome from "./pages/main/MainHome";
import { ThemeProvider } from "./components/ThemeProvider";
import Contact from "./pages/main/Contact";
import About from "./pages/main/About";
import NotFound from "./pages/main/NotFound";
import SharePortfolio from './pages/student/Portfolio/SharePortfolio';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); 

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === "USER" || decoded.role === "ADMIN") {
          setUserRole(decoded.role);
          setIsAuthenticated(true);
        } else {
          console.error("Invalid role in token");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const handleLogin = (token) => {
    try {
      // Decode the JWT
      const decoded = jwtDecode(token);

      // Extract role and validate token (you can add expiration checks if necessary)
      if (decoded.role === "USER" || decoded.role === "ADMIN") {
        localStorage.setItem("token", token);
        setUserRole(decoded.role);
        setIsAuthenticated(true);
      } else {
        console.error("Invalid role in token");
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(null);
    setIsAuthenticated(false);
  };


  return (
    <>
     <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {isAuthenticated ? (
        userRole === "USER" ? (
          <div>
            <StudentNavbar onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project-management" element={<Home />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/contact' element={<Contact />} /> 
              <Route path="*" element={<NotFound /> } />
            </Routes>
          </div>
        ) : userRole === "ADMIN" ? (
          <div>
            <AdminNavbar onLogout={handleLogout} />
            <Routes>
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/viewall-students" element={<ViewAllStudents />} />
              <Route path="/delete-students" element={<DeleteStudents />} />
              <Route path="/update-students-status" element={<UpdateStudents />} />
              <Route path="*" element={<NotFound /> } />
            </Routes>
          </div>
        ) : (
          <p>Invalid Role</p>
        )
      ) : (
        <div>
          <MainNavbar />
          <Routes>
            <Route path="/" element={<MainHome />} />
            <Route path="/student-auth" element={<Auth onLogin={handleLogin} />} />
            <Route path="/admin-login" element={<AdminLogin onLogin={handleLogin} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/share/:uniqueUsername" element={<SharePortfolio />} />
            <Route path="*" element={<NotFound /> } />
          </Routes>
        </div>
      )}
      </ThemeProvider>
    </>
  );
}

export default App;
