import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import StudentNavbar from "./pages/student/Navbar/StudentNavbar";
import PortfolioPage from "./pages/student/Portfolio/PortfolioPage";
import ProjectDetails from "./pages/student/ProjectDetails/ProjectDetails";
import Profile from "./pages/student/Profile/Profile";
import Auth from "./pages/student/Auth/Auth";
import Home from "./pages/student/Home/Home";
import SharePortfolio from "./pages/student/Portfolio/SharePortfolio";
import IssueDetails from "./pages/student/IssueDetails/IssueDetails";

import AdminNavbar from "./pages/admin/AdminNavbar/AdminNavbar";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import ViewAllStudents from "./pages/admin/Dashboard/ViewAllStudents";
import DeleteStudents from "./pages/admin/Dashboard/DeleteStudents";
import UpdateStudents from "./pages/admin/Dashboard/UpdateStudents";

import MainNavbar from "./pages/main/MainNavbar";
import AdminLogin from "./pages/admin/Auth/AdminLogin";
import MainHome from "./pages/main/MainHome";
import { ThemeProvider } from "./components/ThemeProvider";
import Contact from "./pages/main/Contact";
import About from "./pages/main/About";
import NotFound from "./pages/main/NotFound";
import Footer from "./pages/main/Footer";

import ProtectedRoute from "./configurations/ProtectedRoute";
import { jwtDecode } from "jwt-decode";
import LoadingScreen from "./components/LoadingScreen";
import { ResetPassword } from "./pages/student/Auth/ResetPassword";
import ForgotPassword from "./pages/student/Auth/ForgotPassword";
import OAuth2RedirectHandler from "./pages/student/Auth/OAuth2RedirectHandler";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = unresolved
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // Global loading state

  // On App Mount: Check Token and Set Authentication State
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true); // Start loading
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === "USER" || decoded.role === "ADMIN") {
          setUserRole(decoded.role);
          setIsAuthenticated(true);
        } else {
          console.error("Invalid role in token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // End loading after checks
  }, []);

  // Handle Login
  const handleLogin = (token) => {
    try {
      const decoded = jwtDecode(token);
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

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(null);
    setIsAuthenticated(false);
  };

  // Render Loading Screen if Global Loading is Active
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* Navbar */}
        {isAuthenticated ? (
          userRole === "USER" ? (
            <StudentNavbar onLogout={handleLogout} />
          ) : userRole === "ADMIN" ? (
            <AdminNavbar onLogout={handleLogout} />
          ) : null
        ) : (
          <MainNavbar />
        )}

        {/* Routes */}
        <Routes>
          {/* Publicly Accessible Routes */}
          <Route
            path="/"
            element={
              isAuthenticated === null ? (
                <LoadingScreen />
              ) : isAuthenticated ? (
                <Navigate
                  to={userRole === "USER" ? "/portfolio" : "/admin-dashboard"}
                  replace
                />
              ) : (
                <MainHome />
              )
            }
          />

          <Route
            path="/student-auth"
            element={<Auth onLogin={handleLogin} />}
          />

          <Route
            path="/admin-login"
            element={<AdminLogin onLogin={handleLogin} />}
          />

          <Route
            path="/oauth2/callback"
            element={<OAuth2RedirectHandler onLogin={handleLogin} />}
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/share/:uniqueUsername" element={<SharePortfolio />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected Routes for Users */}
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={userRole}
                requiredRole="USER"
              >
                <PortfolioPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project-management"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={userRole}
                requiredRole="USER"
              >
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/project/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={userRole}
                requiredRole="USER"
              >
                <ProjectDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project/:projectId/issue/:issueId"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={userRole}
                requiredRole="USER"
              >
                <IssueDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={userRole}
                requiredRole="USER"
              >
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes for Admin */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={userRole}
                requiredRole="ADMIN"
              >
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewall-students"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={userRole}
                requiredRole="ADMIN"
              >
                <ViewAllStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/delete-students"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={userRole}
                requiredRole="ADMIN"
              >
                <DeleteStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-students-status"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={userRole}
                requiredRole="ADMIN"
              >
                <UpdateStudents />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Footer */}
        {!isAuthenticated && <Footer />}
      </ThemeProvider>
    </>
  );
}

export default App;
