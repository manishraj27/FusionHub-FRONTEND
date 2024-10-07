import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import PortfolioPage from "./pages/Portfolio/PortfolioPage";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project-mangement" element={<Home />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
    </Routes>
    </>
  );
}

export default App;
