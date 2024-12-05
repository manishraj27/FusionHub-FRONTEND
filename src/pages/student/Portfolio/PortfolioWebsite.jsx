import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PortfolioWebsite = ({ portfolio }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  //console.log(portfolio);
  // Default to modern theme if not specified
  const theme = portfolio.theme || 'modern';

  // Theme-specific color and style configurations
  const themeStyles = {
    minimalist: {
      bgGradient: 'from-white to-gray-50',
      textPrimary: 'text-black',
      textSecondary: 'text-gray-600',
      accentColor: 'text-gray-500',
      navBg: 'bg-white/80 shadow-sm',
      sectionBg: 'bg-gray-50',
      buttonHover: 'hover:text-black hover:bg-gray-100',
      shadowStyle: 'shadow hover:shadow-md',
      title: 'text-black font-thin uppercase',
      //border: isActive ? 'border-2 border-gray-300' : 'border border-transparent',
      palette: {
        background: ['bg-white', 'bg-gray-50', 'bg-gray-100'],
        text: {
          primary: 'text-black',
          secondary: 'text-gray-600',
          muted: 'text-gray-400',
        },
        accent: {
          base: 'bg-gray-200',
          hover: 'hover:bg-gray-300',
          text: 'text-gray-500',
        },
      },
    },
    modern: {
      bgGradient: 'from-gray-50 via-blue-50 to-purple-50',
      textPrimary: 'text-blue-800',
      textSecondary: 'text-gray-600',
      accentColor: 'text-purple-600',
      navBg: 'bg-blue-50/80 backdrop-blur',
      sectionBg: 'bg-white',
      buttonHover: 'hover:text-purple-600 hover:bg-blue-100',
      shadowStyle: 'shadow-lg hover:shadow-xl',
      title: 'text-blue-800 font-bold',
      //border: isActive ? 'border-4 border-purple-500' : 'border border-transparent',
      palette: {
        background: ['bg-blue-50', 'bg-white', 'bg-purple-50'],
        text: {
          primary: 'text-blue-800',
          secondary: 'text-gray-600',
          muted: 'text-blue-500',
        },
        accent: {
          base: 'bg-purple-400',
          hover: 'hover:bg-purple-500',
          text: 'text-purple-600',
        },
        gradient: {
          from: 'from-blue-400',
          to: 'to-purple-600',
        },
      },
    },
    classic: {
      bgGradient: 'from-beige-100 to-white',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-brown-600',
      accentColor: 'text-brown-700',
      navBg: 'bg-white shadow-md',
      sectionBg: 'bg-beige-50',
      buttonHover: 'hover:text-brown-700 hover:bg-brown-100',
      shadowStyle: 'shadow-md hover:shadow-lg',
      title: 'text-brown-700 font-serif italic',
      //border: isActive ? 'border-4 border-brown-500' : 'border border-transparent',
      palette: {
        background: ['bg-beige-50', 'bg-white', 'bg-brown-50'],
        text: {
          primary: 'text-gray-900',
          secondary: 'text-brown-600',
          muted: 'text-brown-400',
        },
        accent: {
          base: 'bg-brown-600',
          hover: 'hover:bg-brown-700',
          text: 'text-brown-700',
        },
        gradient: {
          from: 'from-brown-400',
          to: 'to-beige-600',
        },
      },
    },
    cyberpunk: {
      bgGradient: 'from-gray-900 to-purple-900',
      textPrimary: 'text-green-400',
      textSecondary: 'text-cyan-300',
      accentColor: 'text-pink-500',
      navBg: 'bg-black/80 backdrop-blur-md',
      sectionBg: 'bg-gray-800/50',
      buttonHover: 'hover:text-pink-500',
      shadowStyle: 'shadow-2xl hover:shadow-neon',
      title: 'text-cyan-300 font-mono',
      //border: isActive ? 'border-4 border-green-500' : 'border border-transparent',
      palette: {
        background: ['bg-gray-900', 'bg-purple-900', 'bg-black'],
        text: {
          primary: 'text-green-400',
          secondary: 'text-cyan-300',
          muted: 'text-purple-300',
        },
        accent: {
          base: 'bg-pink-600',
          hover: 'hover:bg-pink-500',
          text: 'text-pink-500',
        },
      },
    },
    pastel: {
      bgGradient: 'from-pink-50 to-lavender-100',
      textPrimary: 'text-purple-800',
      textSecondary: 'text-pink-700',
      accentColor: 'text-teal-600',
      navBg: 'bg-white/90',
      sectionBg: 'bg-pink-50/50',
      buttonHover: 'hover:text-teal-700',
      shadowStyle: 'shadow-md hover:shadow-lg',
      title: 'text-pink-900 font-rounded',
      //border: isActive ? 'border-4 border-pink-500' : 'border border-transparent',
      palette: {
        background: ['bg-pink-50', 'bg-lavender-100', 'bg-mint-50'],
        text: {
          primary: 'text-purple-800',
          secondary: 'text-pink-700',
          muted: 'text-teal-600',
        },
        accent: {
          base: 'bg-teal-500',
          hover: 'hover:bg-teal-600',
          text: 'text-teal-600',
        },
      },
    },
    futuristic: {
      bgGradient: 'from-black to-gray-700',
      textPrimary: 'text-teal-400',
      textSecondary: 'text-gray-300',
      accentColor: 'text-teal-300',
      navBg: 'bg-gray-900/90',
      sectionBg: 'bg-gray-800',
      buttonHover: 'hover:text-teal-500',
      shadowStyle: 'shadow-lg hover:shadow-teal',
      title: 'text-teal-300 font-extrabold',
      //border: isActive ? 'border-4 border-teal-500' : 'border border-transparent',
      palette: {
        background: ['bg-black', 'bg-gray-800', 'bg-gray-700'],
        text: {
          primary: 'text-teal-400',
          secondary: 'text-gray-300',
          muted: 'text-gray-500',
        },
        accent: {
          base: 'bg-teal-600',
          hover: 'hover:bg-teal-500',
          text: 'text-teal-300',
        },
        gradient: {
          from: 'from-teal-400',
          to: 'to-gray-700',
        },
      },
    },
    vintage: {
      bgGradient: 'from-yellow-50 to-orange-50',
      textPrimary: 'text-gray-800',
      textSecondary: 'text-gray-600',
      accentColor: 'text-yellow-600',
      navBg: 'bg-yellow-100/90',
      sectionBg: 'bg-yellow-50',
      buttonHover: 'hover:text-yellow-700',
      shadowStyle: 'shadow-sm hover:shadow-lg',
      title: 'text-gray-800 font-serif italic',
      //border: isActive ? 'border-4 border-yellow-600' : 'border border-transparent',
      palette: {
        background: ['bg-yellow-50', 'bg-orange-100', 'bg-yellow-200'],
        text: {
          primary: 'text-gray-800',
          secondary: 'text-gray-600',
          muted: 'text-yellow-500',
        },
        accent: {
          base: 'bg-yellow-300',
          hover: 'hover:bg-yellow-400',
          text: 'text-yellow-600',
        },
        gradient: {
          from: 'from-yellow-300',
          to: 'to-orange-400',
        },
      },
    },
    darkElegance: {
      bgGradient: 'from-gray-800 to-black',
      textPrimary: 'text-white',
      textSecondary: 'text-gray-400',
      accentColor: 'text-indigo-400',
      navBg: 'bg-black/80',
      sectionBg: 'bg-gray-900',
      buttonHover: 'hover:text-indigo-500',
      shadowStyle: 'shadow-md hover:shadow-xl',
      title: 'text-indigo-400 font-light',
      //border: isActive ? 'border-4 border-indigo-600' : 'border border-transparent',
      palette: {
        background: ['bg-gray-800', 'bg-black', 'bg-gray-900'],
        text: {
          primary: 'text-white',
          secondary: 'text-gray-400',
          muted: 'text-gray-600',
        },
        accent: {
          base: 'bg-indigo-900',
          hover: 'hover:bg-indigo-800',
          text: 'text-indigo-400',
        },
        gradient: {
          from: 'from-indigo-600',
          to: 'to-gray-900',
        },
      },
    },
    neon: {
      bgGradient: 'from-black to-purple-700',
      textPrimary: 'text-pink-400',
      textSecondary: 'text-yellow-300',
      accentColor: 'text-lime-400',
      navBg: 'bg-black/90',
      sectionBg: 'bg-purple-800',
      buttonHover: 'hover:text-lime-500',
      shadowStyle: 'shadow-neon hover:shadow-xl',
      title: 'text-lime-400 font-mono',
      //border: isActive ? 'border-4 border-pink-600' : 'border border-transparent',
      palette: {
        background: ['bg-black', 'bg-purple-700', 'bg-pink-800'],
        text: {
          primary: 'text-pink-400',
          secondary: 'text-yellow-300',
          muted: 'text-lime-300',
        },
        accent: {
          base: 'bg-yellow-500',
          hover: 'hover:bg-pink-500',
          text: 'text-lime-400',
        },
        gradient: {
          from: 'from-pink-500',
          to: 'to-purple-700',
        },
      },
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.modern;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bgGradient}`}>
      {/* Navigation */}
      <nav className={`w-full z-50 transition-all duration-300 ${isScrolled ? `${currentTheme.navBg} shadow-md` : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>
                {portfolio.name}
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${currentTheme.buttonHover} ${
                    activeSection === item.id ? currentTheme.accentColor : currentTheme.textSecondary
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full px-3 py-2 text-base font-medium ${currentTheme.textSecondary} ${currentTheme.buttonHover} hover:bg-blue-50 rounded-md`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-6">
            <h1 className={`text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>
              {portfolio.name}
            </h1>
            <p className={`text-xl ${currentTheme.textSecondary} max-w-2xl mx-auto leading-relaxed`}>
              {portfolio.about}
            </p>
            <div className="flex justify-center gap-6">
              {portfolio.githubLink && (
                <a href={portfolio.githubLink} 
                  className="transform hover:scale-110 transition-transform"
                  target="_blank" rel="noopener noreferrer">
                  <Github className={`h-6 w-6 ${currentTheme.textSecondary} ${currentTheme.buttonHover}`} />
                </a>
              )}
              {portfolio.linkedinLink && (
                <a href={portfolio.linkedinLink}
                  className="transform hover:scale-110 transition-transform"
                  target="_blank" rel="noopener noreferrer">
                  <Linkedin className={`h-6 w-6 ${currentTheme.textSecondary} ${currentTheme.buttonHover}`} />
                </a>
              )}
              {portfolio.email && (
                <a href={`mailto:${portfolio.email}`}
                  className="transform hover:scale-110 transition-transform">
                  <Mail className={`h-6 w-6 ${currentTheme.textSecondary} ${currentTheme.buttonHover}`} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 ${currentTheme.sectionBg}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-3xl font-bold ${currentTheme.textPrimary} mb-12 text-center`}>Skills & Expertise</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {portfolio.skills?.map((skill, index) => (
              <div
                key={index}
                className={`group relative px-6 py-3 bg-white rounded-xl ${currentTheme.shadowStyle} transition-all`}
              >
                <span className={`${currentTheme.textSecondary} font-medium group-hover:text-blue-600 transition-colors`}>
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-3xl font-bold ${currentTheme.textPrimary} mb-12 text-center`}>Professional Experience</h2>
          <div className="space-y-8">
            {portfolio.experiences?.map((exp, index) => (
              <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-500">
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[8px] top-2 ring-4 ring-blue-50"></div>
                <div className={`bg-white rounded-lg p-6 ${currentTheme.shadowStyle} transition-all`}>
                  <p className={`${currentTheme.textSecondary} leading-relaxed`}>{exp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${currentTheme.sectionBg}`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-3xl font-bold ${currentTheme.textPrimary} mb-12 text-center`}>Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.projectDTOs?.map((project) => (
              <div
                key={project.id}
                className={`group bg-white rounded-xl ${currentTheme.shadowStyle} transition-all p-6 transform hover:-translate-y-1`}
              >
                <h3 className={`text-xl font-semibold ${currentTheme.textPrimary} group-hover:text-blue-600 transition-colors mb-4`}>
                  {project.name}
                </h3>
                <p className={`${currentTheme.textSecondary} mb-6`}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-3xl font-bold ${currentTheme.textPrimary} mb-12 text-center`}>Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.education?.map((edu, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 ${currentTheme.shadowStyle} transition-all transform hover:-translate-y-1`}
              >
                <p className={`${currentTheme.textSecondary}`}>{edu}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
              <div className="flex space-x-4">
                {portfolio.githubLink && (
                  <a href={portfolio.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="h-6 w-6 hover:text-blue-400 transition-colors" />
                  </a>
                )}
                {portfolio.linkedinLink && (
                  <a href={portfolio.linkedinLink} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-6 w-6 hover:text-blue-400 transition-colors" />
                  </a>
                )}
                {portfolio.email && (
                  <a href={`mailto:${portfolio.email}`}>
                    <Mail className="h-6 w-6 hover:text-blue-400 transition-colors" />
                  </a>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{portfolio.name}</h3>
              <p className="text-gray-400">
                Thank you for visiting my portfolio. Feel free to reach out for collaborations or opportunities.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioWebsite;