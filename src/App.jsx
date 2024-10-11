import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import PortfolioPage from "./pages/Portfolio/PortfolioPage";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project-mangement" element={<Home />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
    </Routes>
    </ThemeProvider>
  );
}

export default App;
