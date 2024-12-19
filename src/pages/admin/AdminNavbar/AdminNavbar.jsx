import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Sparkles } from "lucide-react";

const AdminNavbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    if (hamburgerRef.current) {
      gsap.to(hamburgerRef.current.children[0], {
        duration: 0,
        rotation: isMenuOpen ? 45 : 0,
        y: isMenuOpen ? 11 : 0,
      });
      gsap.to(hamburgerRef.current.children[1], {
        duration: 0,
        opacity: isMenuOpen ? 0 : 1,
      });
      gsap.to(hamburgerRef.current.children[2], {
        duration: 0,
        rotation: isMenuOpen ? -45 : 0,
        y: isMenuOpen ? -11 : 0,
      });
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


  return (
    <div className="sticky top-0 z-50 bg-background">
      <div className="border-b py-4 px-5 flex items-center justify-between">
        {/* <a href="/admin-dashboard" aria-label="Logo" className="z-50">
          <img src={navbarlogo} alt="Logo" />
        </a> */}

        <a href="/admin-dashboard" aria-label="logo" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
            FusionHub
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 justify-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin-dashboard")}
          >
            Dashboard
          </Button>


          <Button variant="ghost" onClick={() => navigate("viewall-students")}>
            View All Students
          </Button>

          <Button variant="ghost" onClick={() => navigate("/viewall-portfolios")}>
            View All Portfolios
          </Button>
          {/* <Button variant="ghost" onClick={() => navigate("delete-students")}>
            Delete Student
          </Button> */}

          <Button variant="ghost" onClick={() => navigate("update-students-status")}>
            Update Status
          </Button>
        </div>

        {/* Desktop User Menu */}
        <div className="hidden md:flex gap-3 items-center">
          {/* mode toggle */}
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                className="rounded-full border-2 border-gray-500"
                size="icon"
                variant="outline"
              >
                <PersonIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuItem
                onClick={() => {
                  navigate("profile");
                  toggleMenu();
                }}
              >
                Profile
              </DropdownMenuItem> */}
              <DropdownMenuItem
                onClick={() => {
                  onLogout();
                  navigate("/admin-login");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p>Admin</p>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden z-50 flex items-center space-x-4">
          <ModeToggle />

          <Button variant="ghost" onClick={toggleMenu} className="p-2">
            <div
              ref={hamburgerRef}
              className="w-6 h-6 flex flex-col justify-between"
            >
              <span className="w-full h-0.5 bg-foreground block transition-all"></span>
              <span className="w-full h-0.5 bg-foreground block transition-all"></span>
              <span className="w-full h-0.5 bg-foreground block transition-all"></span>
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-40 flex flex-col pt-4">
          <div className="flex-grow overflow-y-auto pt-16 px-6">
            <div className="flex flex-col gap-10">
              {/* Greeting Section */}
              <div className="text-left">
                <p className="text-3xl italic font-light">Hello!</p>
                <p className="text-4xl font-semibold italic">Admin</p>
              </div>

              {/* Navigation Links */}
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/admin-dashboard");
                  toggleMenu();
                }}
                className="w-full text-lg font-medium tracking-wide"
              >
                Dashboard
              </Button>


              <Button
                variant="ghost"
                onClick={() => {
                  navigate("viewall-students");
                  toggleMenu();
                }}
                className="w-full text-lg font-medium tracking-wide"
              >
                View All Students
              </Button>


              <Button
                variant="ghost"
                onClick={() => {
                  navigate("viewall-portfolios");
                  toggleMenu();
                }}
                className="w-full text-lg font-medium tracking-wide"
              >
                View All Portfolio
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  navigate("update-students-status");
                  toggleMenu();
                }}
                className="w-full text-lg font-medium tracking-wide"
              >
               Update Student Status
              </Button>


              
              {/* <Button
                variant="ghost"
                onClick={() => {
                  navigate("delete-students");
                  toggleMenu();
                }}
                className="w-full text-lg font-medium tracking-wide"
              >
                Delete Student
              </Button> */}
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-6 border-t border-gray-200">
            <Button
              variant="ghost"
              onClick={() => {
                onLogout(); // Calling the passed onLogout function here
                navigate("/admin-login"); // Redirect to login after logout
              }}
              className="w-full text-lg font-medium tracking-wide hover:bg-red-100 hover:text-red-600 rounded-lg transition-all duration-300"
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
