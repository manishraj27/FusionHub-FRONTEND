import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateProjectForm from "../Project/CreateProjectForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import navbarlogo from "/src/assets/navbarlogo.svg";
import { ModeToggle } from "@/components/ui/ModeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
        <a href="/" aria-label="Logo" className="z-50">
          <img src={navbarlogo} alt="Logo" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 justify-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/project-mangement")}
          >
            Project Management
          </Button>

          {location.pathname === "/project-mangement" && (
            <Dialog>
              <DialogTrigger>
                <Button variant="ghost">New Project</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>New Project</DialogHeader>
                <CreateProjectForm />
              </DialogContent>
            </Dialog>
          )}

          <Button variant="ghost" onClick={() => navigate("portfolio")}>
            Portfolio
          </Button>

          <Button variant="ghost" onClick={() => navigate("contact")}>
            Contact
          </Button>
        </div>

        {/* Desktop User Menu */}
        <div className="hidden md:flex gap-3 items-center">
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
              <DropdownMenuItem  
                onClick={() => {navigate("profile"); toggleMenu()}}
              >Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                /* Handle logout */ toggleMenu();
              }}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p>Manish Raj</p>
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
                <p className="text-4xl font-semibold italic">Manish</p>
              </div>

              {/* Navigation Links */}
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/project-mangement");
                  toggleMenu();
                }}
                className="w-full text-lg font-medium tracking-wide"
              >
                Project Management
              </Button>

              <Dialog>
                <DialogTrigger>
                  <Button
                    variant="ghost"
                    className="w-full text-lg font-medium tracking-wide"
                  >
                    New Project
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>New Project</DialogHeader>
                  <CreateProjectForm />
                </DialogContent>
              </Dialog>

              <Button
                variant="ghost"
                onClick={() => {
                  navigate("portfolio");
                  toggleMenu();
                }}
                className="w-full text-lg font-medium tracking-wide"
              >
                Portfolio
              </Button>

              <Button
                variant="ghost"
                onClick={() => navigate("/contact")}
                className="w-full text-lg font-medium tracking-wide"
              >
                Contact
              </Button>

              <Button
                variant="ghost"
                onClick={() => {navigate("profile"); toggleMenu()}}
                className="w-full text-lg font-medium tracking-wide"
              >
                Profile
              </Button>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-6 border-t border-gray-200">
            <Button
              variant="ghost"
              onClick={() => {
                /* Handle logout */ toggleMenu();
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

export default Navbar;
