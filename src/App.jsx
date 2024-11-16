import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import PortfolioPage from "./pages/Portfolio/PortfolioPage";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
// import { ThemeProvider } from "./components/ThemeProvider";
import Profile from "./pages/Profile/Profile";
import Auth from "./pages/Auth/Auth";

function App() {
  const isAuthenticated = false; // Replace with your actual authentication logic

  return (
    <>
   {/* <ThemeProvider > */}
    {/* defaultTheme="light" storageKey="vite-ui-theme" */}
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
          <Auth />
          {/* for all hoemee  */}
      </div>
      )}
    {/* </ThemeProvider> */}
    </>
  );
}

export default App;
