import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import PortfolioPage from "./pages/Portfolio/PortfolioPage";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import { ThemeProvider } from "./components/ThemeProvider";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project-mangement" element={<Home />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
