import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import navbarlogo from "/src/assets/navbarlogo.svg";
import { ModeToggle } from "@/components/ui/ModeToggle";

const MainNavbar = () => {
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
        <a href="/" aria-label="Logo" className="z-50">
          <img src={navbarlogo} alt="Logo" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 justify-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
          >
            Home
          </Button>


          <Button variant="ghost" onClick={() => navigate("student-auth")}>
           Student Signup/Login
          </Button>

          <Button variant="ghost" onClick={() => navigate("admin-login")}>
            Admin Login
          </Button>

          
        </div>

        {/* Desktop User Menu */}
        <div className="hidden md:flex gap-3 items-center">
          {/* mode toggle */}
          <ModeToggle />
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
                  navigate("/student-auth");
                  toggleMenu();
                }}
                className="w-full text-lg font-medium tracking-wide"
              >
                Student Signup/Login
              </Button>

  
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("admin-login");
                  toggleMenu();
                }}
                className="w-full text-lg font-medium tracking-wide"
              >
                Admin Login
              </Button>

              {/* <Button
                variant="ghost"
                onClick={() => navigate("/contact")}
                className="w-full text-lg font-medium tracking-wide"
              >
                Contact
              </Button> */}

              
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default MainNavbar;
