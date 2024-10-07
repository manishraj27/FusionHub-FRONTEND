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
          <svg
            width="135"
            height="32"
            viewBox="0 0 135 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M126 2H123V8.00001H126C124.343 8.00001 123 9.34317 123 11V14H129V11C129 12.6568 130.343 14 132 14H135V8.00001H132C133.657 8.00001 135 6.65686 135 5V2H129V5C129 3.34315 127.657 2 126 2ZM129 8.00001H126C127.657 8.00001 129 9.34317 129 11V8.00001ZM129 8.00001V5C129 6.65686 130.343 8.00001 132 8.00001H129Z"
              fill="#DCFF50"
            />
            <path
              d="M12.01 18.49C12.01 19.17 11.86 19.71 11.56 20.11C11.28 20.49 10.9 20.68 10.42 20.68C10.26 20.68 10.09 20.65 9.91 20.59C9.73 20.53 9.55 20.44 9.37 20.32C9.49 20 9.58 19.69 9.64 19.39C9.7 19.09 9.73 18.81 9.73 18.55C9.73 18.15 9.66 17.85 9.52 17.65C9.38 17.43 9.17 17.32 8.89 17.32C8.01 17.32 7.15 18.34 6.31 20.38C5.47 22.4 5.05 24.32 5.05 26.14C5.05 27.06 5.2 27.71 5.5 28.09C5.82 28.47 6.39 28.66 7.21 28.66C8.15 28.66 9.01 28.45 9.79 28.03C10.59 27.59 11.5 26.79 12.52 25.63H13.54C12.38 27.51 11.12 28.91 9.76 29.83C8.4 30.73 6.91 31.18 5.29 31.18C3.75 31.18 2.58 30.78 1.78 29.98C1 29.18 0.61 27.99 0.61 26.41C0.61 25.27 0.78 24.06 1.12 22.78C1.48 21.5 1.97 20.36 2.59 19.36C3.33 18.16 4.21 17.26 5.23 16.66C6.27 16.04 7.42 15.73 8.68 15.73C9.78 15.73 10.61 15.97 11.17 16.45C11.73 16.91 12.01 17.59 12.01 18.49ZM12.0937 26.38C12.0937 25.24 12.2737 24.03 12.6337 22.75C13.0137 21.47 13.5237 20.33 14.1637 19.33C14.9037 18.15 15.7937 17.26 16.8337 16.66C17.8737 16.04 19.0337 15.73 20.3137 15.73C21.5937 15.73 22.5537 16.13 23.1937 16.93C23.8337 17.73 24.1537 18.93 24.1537 20.53C24.1937 20.55 24.2337 20.57 24.2737 20.59C24.3337 20.59 24.4037 20.59 24.4837 20.59C25.1037 20.59 25.8437 20.42 26.7037 20.08C27.5637 19.74 28.3637 19.31 29.1037 18.79L29.3737 19.6C28.8137 20.2 28.0637 20.72 27.1237 21.16C26.2037 21.6 25.1837 21.91 24.0637 22.09C23.8237 24.79 23.0437 26.97 21.7237 28.63C20.4037 30.29 18.7937 31.12 16.8937 31.12C15.3337 31.12 14.1437 30.72 13.3237 29.92C12.5037 29.12 12.0937 27.94 12.0937 26.38ZM20.5537 17.56C19.5937 17.56 18.6837 18.53 17.8237 20.47C16.9837 22.41 16.5637 24.25 16.5637 25.99C16.5637 26.93 16.6637 27.57 16.8637 27.91C17.0837 28.25 17.4937 28.42 18.0937 28.42C18.8337 28.42 19.5337 27.82 20.1937 26.62C20.8737 25.42 21.3337 23.94 21.5737 22.18C21.2937 22.12 21.0837 21.99 20.9437 21.79C20.8237 21.57 20.7637 21.28 20.7637 20.92C20.7637 20.54 20.8437 20.21 21.0037 19.93C21.1637 19.65 21.3937 19.44 21.6937 19.3C21.6537 18.66 21.5437 18.21 21.3637 17.95C21.2037 17.69 20.9337 17.56 20.5537 17.56ZM25.633 27.58C25.633 27.32 25.653 27.03 25.693 26.71C25.733 26.37 25.793 26.01 25.873 25.63L29.083 10.6L33.523 10L30.073 26.2C30.033 26.38 30.003 26.55 29.983 26.71C29.963 26.85 29.953 27 29.953 27.16C29.953 27.56 30.043 27.85 30.223 28.03C30.423 28.19 30.743 28.27 31.183 28.27C31.743 28.27 32.273 28.03 32.773 27.55C33.273 27.05 33.643 26.41 33.883 25.63H35.143C34.503 27.45 33.643 28.83 32.563 29.77C31.483 30.71 30.243 31.18 28.843 31.18C27.843 31.18 27.053 30.87 26.473 30.25C25.913 29.61 25.633 28.72 25.633 27.58ZM33.6311 27.58C33.6311 27.32 33.6511 27.03 33.6911 26.71C33.7311 26.37 33.7911 26.01 33.8711 25.63L37.0811 10.6L41.5211 10L38.0711 26.2C38.0311 26.38 38.0011 26.55 37.9811 26.71C37.9611 26.85 37.9511 27 37.9511 27.16C37.9511 27.56 38.0411 27.85 38.2211 28.03C38.4211 28.19 38.7411 28.27 39.1811 28.27C39.7411 28.27 40.2711 28.03 40.7711 27.55C41.2711 27.05 41.6411 26.41 41.8811 25.63H43.1411C42.5011 27.45 41.6411 28.83 40.5611 29.77C39.4811 30.71 38.2411 31.18 36.8411 31.18C35.8411 31.18 35.0511 30.87 34.4711 30.25C33.9111 29.61 33.6311 28.72 33.6311 27.58ZM50.8574 17.38V17.59L51.1874 16H55.5074L53.3474 26.2C53.3074 26.38 53.2774 26.55 53.2574 26.71C53.2374 26.85 53.2274 27 53.2274 27.16C53.2274 27.6 53.3274 27.93 53.5274 28.15C53.7274 28.35 54.0374 28.45 54.4574 28.45C54.9774 28.45 55.4474 28.21 55.8674 27.73C56.2874 27.23 56.6274 26.53 56.8874 25.63H58.1474C57.5074 27.47 56.6774 28.86 55.6574 29.8C54.6374 30.72 53.4574 31.18 52.1174 31.18C51.2574 31.18 50.5674 30.94 50.0474 30.46C49.5474 29.98 49.2574 29.3 49.1774 28.42C48.5574 29.34 47.8674 30.03 47.1074 30.49C46.3674 30.95 45.5674 31.18 44.7074 31.18C43.4674 31.18 42.4874 30.76 41.7674 29.92C41.0674 29.08 40.7174 27.89 40.7174 26.35C40.7174 25.23 40.8874 24.06 41.2274 22.84C41.5674 21.62 42.0374 20.51 42.6374 19.51C43.3774 18.33 44.2374 17.43 45.2174 16.81C46.1974 16.17 47.2674 15.85 48.4274 15.85C49.2074 15.85 49.8074 15.99 50.2274 16.27C50.6474 16.53 50.8574 16.9 50.8574 17.38ZM50.5874 18.85C50.5874 18.55 50.4774 18.29 50.2574 18.07C50.0374 17.83 49.7374 17.71 49.3574 17.71C48.2574 17.71 47.2774 18.63 46.4174 20.47C45.5774 22.31 45.1574 24.13 45.1574 25.93C45.1574 26.71 45.2674 27.3 45.4874 27.7C45.7074 28.08 46.0974 28.27 46.6574 28.27C47.1774 28.27 47.6774 28.02 48.1574 27.52C48.6574 27.02 48.9874 26.39 49.1474 25.63L50.5874 18.85ZM60.7127 31.18C59.3727 31.18 58.3327 30.85 57.5927 30.19C56.8727 29.51 56.5127 28.56 56.5127 27.34C56.5127 27.06 56.5327 26.78 56.5727 26.5C56.6127 26.22 56.6627 25.93 56.7227 25.63L59.9327 10.6L64.3727 10L62.9327 16.75C63.4127 16.45 63.8327 16.24 64.1927 16.12C64.5727 15.98 64.9727 15.91 65.3927 15.91C66.5727 15.91 67.4527 16.34 68.0327 17.2C68.6327 18.04 68.9327 19.32 68.9327 21.04C68.9327 22.22 68.7527 23.43 68.3927 24.67C68.0327 25.91 67.5327 26.99 66.8927 27.91C66.1527 28.99 65.2627 29.81 64.2227 30.37C63.1827 30.91 62.0127 31.18 60.7127 31.18ZM60.8027 26.89C60.8027 27.35 60.9327 27.7 61.1927 27.94C61.4727 28.16 61.8727 28.27 62.3927 28.27C63.2927 28.27 64.1027 27.48 64.8227 25.9C65.5427 24.32 65.9027 22.66 65.9027 20.92C65.9027 20.08 65.7527 19.39 65.4527 18.85C65.1727 18.31 64.7927 18.04 64.3127 18.04C63.9927 18.04 63.6527 18.09 63.2927 18.19C62.9327 18.29 62.6827 18.42 62.5427 18.58L60.8927 26.2C60.8727 26.32 60.8527 26.44 60.8327 26.56C60.8127 26.68 60.8027 26.79 60.8027 26.89ZM83.8466 27.79C83.8466 27.43 83.8866 26.98 83.9666 26.44C84.0666 25.9 84.2566 25.04 84.5366 23.86C84.8166 22.72 84.9966 21.9 85.0766 21.4C85.1566 20.9 85.1966 20.48 85.1966 20.14C85.1966 19.64 85.0966 19.26 84.8966 19C84.7166 18.74 84.4466 18.61 84.0866 18.61C83.6066 18.61 83.1366 18.9 82.6766 19.48C82.2366 20.04 81.9466 20.63 81.8066 21.25L79.7366 31H75.4166L79.7666 10.6L84.2066 10L82.5866 17.56C83.0866 17 83.6266 16.58 84.2066 16.3C84.7866 16.02 85.4166 15.88 86.0966 15.88C87.1566 15.88 87.9766 16.17 88.5566 16.75C89.1366 17.33 89.4266 18.17 89.4266 19.27C89.4266 19.73 89.3666 20.28 89.2466 20.92C89.1466 21.54 88.9366 22.5 88.6166 23.8C88.3566 24.82 88.1866 25.54 88.1066 25.96C88.0266 26.38 87.9866 26.73 87.9866 27.01C87.9866 27.43 88.0866 27.75 88.2866 27.97C88.4866 28.17 88.7866 28.27 89.1866 28.27C89.6866 28.27 90.1166 28.1 90.4766 27.76C90.8366 27.42 91.2466 26.71 91.7066 25.63H92.9666C92.3266 27.49 91.5466 28.88 90.6266 29.8C89.7266 30.72 88.6466 31.18 87.3866 31.18C86.2666 31.18 85.3966 30.88 84.7766 30.28C84.1566 29.66 83.8466 28.83 83.8466 27.79ZM96.7131 28.27C97.2331 28.27 97.6931 28.05 98.0931 27.61C98.5131 27.15 98.8531 26.49 99.1131 25.63L101.153 16H105.473L103.313 26.2C103.273 26.38 103.243 26.55 103.223 26.71C103.203 26.85 103.193 27 103.193 27.16C103.193 27.56 103.283 27.85 103.463 28.03C103.663 28.19 103.983 28.27 104.423 28.27C104.943 28.27 105.413 28.04 105.833 27.58C106.253 27.12 106.593 26.47 106.853 25.63H108.113C107.473 27.47 106.643 28.86 105.623 29.8C104.603 30.72 103.423 31.18 102.083 31.18C101.223 31.18 100.533 30.94 100.013 30.46C99.4931 29.96 99.1931 29.25 99.1131 28.33C98.5331 29.29 97.8731 30.01 97.1331 30.49C96.4131 30.95 95.5931 31.18 94.6731 31.18C93.6731 31.18 92.8831 30.87 92.3031 30.25C91.7431 29.61 91.4631 28.72 91.4631 27.58C91.4631 27.32 91.4831 27.03 91.5231 26.71C91.5631 26.37 91.6231 26.01 91.7031 25.63L93.7431 16H98.0631L95.9031 26.2C95.8631 26.36 95.8331 26.51 95.8131 26.65C95.8131 26.77 95.8131 26.9 95.8131 27.04C95.8131 27.44 95.8831 27.75 96.0231 27.97C96.1831 28.17 96.4131 28.27 96.7131 28.27ZM110.84 31.18C109.5 31.18 108.46 30.85 107.72 30.19C107 29.51 106.64 28.56 106.64 27.34C106.64 27.06 106.66 26.78 106.7 26.5C106.74 26.22 106.79 25.93 106.85 25.63L110.06 10.6L114.5 10L113.06 16.75C113.54 16.45 113.96 16.24 114.32 16.12C114.7 15.98 115.1 15.91 115.52 15.91C116.7 15.91 117.58 16.34 118.16 17.2C118.76 18.04 119.06 19.32 119.06 21.04C119.06 22.22 118.88 23.43 118.52 24.67C118.16 25.91 117.66 26.99 117.02 27.91C116.28 28.99 115.39 29.81 114.35 30.37C113.31 30.91 112.14 31.18 110.84 31.18ZM110.93 26.89C110.93 27.35 111.06 27.7 111.32 27.94C111.6 28.16 112 28.27 112.52 28.27C113.42 28.27 114.23 27.48 114.95 25.9C115.67 24.32 116.03 22.66 116.03 20.92C116.03 20.08 115.88 19.39 115.58 18.85C115.3 18.31 114.92 18.04 114.44 18.04C114.12 18.04 113.78 18.09 113.42 18.19C113.06 18.29 112.81 18.42 112.67 18.58L111.02 26.2C111 26.32 110.98 26.44 110.96 26.56C110.94 26.68 110.93 26.79 110.93 26.89Z"
              fill="#DCFF50"
            />
          </svg>
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

          <Button variant="ghost" onClick={() => navigate("about")}>
            About
          </Button>
        </div>

        {/* Desktop User Menu */}
        <div className="hidden md:flex gap-3 items-center">
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
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p>Manish Raj</p>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden z-50">
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
        <div className="md:hidden fixed inset-0 bg-background z-40 flex flex-col">
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
                className="w-full text-lg font-medium tracking-wide hover:bg-gray-100 rounded-lg transition-all duration-300"
              >
                Project Management
              </Button>

              <Dialog>
                <DialogTrigger>
                  <Button
                    variant="ghost"
                    className="w-full text-lg font-medium tracking-wide hover:bg-gray-100 rounded-lg transition-all duration-300"
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
                className="w-full text-lg font-medium tracking-wide hover:bg-gray-100 rounded-lg transition-all duration-300"
              >
                Portfolio
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  navigate("about");
                  toggleMenu();
                }}
                className="w-full text-lg font-medium tracking-wide hover:bg-gray-100 rounded-lg transition-all duration-300"
              >
                About
              </Button>

              <Button
                variant="ghost"
                onClick={() => {
                  /* Handle profile click */ toggleMenu();
                }}
                className="w-full text-lg font-medium tracking-wide hover:bg-gray-100 rounded-lg transition-all duration-300"
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
