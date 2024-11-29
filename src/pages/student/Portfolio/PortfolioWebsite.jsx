import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PortfolioWebsite = ({ portfolio }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  console.log(portfolio);
  // Default to modern theme if not specified
  const theme = portfolio.theme || 'modern';

  // Theme-specific color and style configurations
  const themeStyles = {
    minimalist: {
      bgGradient: 'from-gray-50 to-gray-100',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-700',
      accentColor: 'text-gray-800',
      navBg: 'bg-white/90',
      sectionBg: 'bg-gray-50',
      buttonHover: 'hover:text-gray-900',
      shadowStyle: 'shadow-sm hover:shadow-md',
      palette: {
        background: ['bg-gray-50', 'bg-white', 'bg-gray-100'],
        text: {
          primary: 'text-gray-900',
          secondary: 'text-gray-600',
          muted: 'text-gray-500'
        },
        accent: {
          base: 'bg-gray-800',
          hover: 'hover:bg-gray-700',
          text: 'text-gray-800'
        }
      }
    },
    modern: {
      bgGradient: 'from-sky-50 to-blue-100',
      textPrimary: 'text-blue-900',
      textSecondary: 'text-blue-700',
      accentColor: 'text-blue-600',
      navBg: 'bg-white/80 backdrop-blur-md',
      sectionBg: 'bg-white/50',
      buttonHover: 'hover:text-blue-600',
      shadowStyle: 'shadow-md hover:shadow-xl',
      palette: {
        background: ['bg-sky-50', 'bg-blue-50', 'bg-indigo-50'],
        text: {
          primary: 'text-blue-900',
          secondary: 'text-blue-700',
          muted: 'text-blue-600'
        },
        accent: {
          base: 'bg-blue-500',
          hover: 'hover:bg-blue-600',
          text: 'text-blue-600'
        },
        gradient: {
          from: 'from-cyan-400',
          to: 'to-blue-500'
        }
      }
    },
    classic: {
      bgGradient: 'from-stone-100 to-neutral-200',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-700',
      accentColor: 'text-indigo-700',
      navBg: 'bg-white/95',
      sectionBg: 'bg-neutral-50',
      buttonHover: 'hover:text-indigo-600',
      shadowStyle: 'shadow-lg hover:shadow-2xl',
      palette: {
        background: ['bg-stone-50', 'bg-neutral-100', 'bg-amber-50'],
        text: {
          primary: 'text-gray-900',
          secondary: 'text-gray-700',
          muted: 'text-gray-600'
        },
        accent: {
          base: 'bg-indigo-600',
          hover: 'hover:bg-indigo-700',
          text: 'text-indigo-700'
        },
        gradient: {
          from: 'from-amber-500',
          to: 'to-orange-600'
        }
      }
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
      palette: {
        background: ['bg-gray-900', 'bg-purple-900', 'bg-black'],
        text: {
          primary: 'text-green-400',
          secondary: 'text-cyan-300',
          muted: 'text-purple-300'
        },
        accent: {
          base: 'bg-pink-600',
          hover: 'hover:bg-pink-500',
          text: 'text-pink-500'
        },
        gradient: {
          from: 'from-green-400',
          to: 'to-pink-500'
        }
      }
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
      palette: {
        background: ['bg-pink-50', 'bg-lavender-100', 'bg-mint-50'],
        text: {
          primary: 'text-purple-800',
          secondary: 'text-pink-700',
          muted: 'text-teal-600'
        },
        accent: {
          base: 'bg-teal-500',
          hover: 'hover:bg-teal-600',
          text: 'text-teal-600'
        },
        gradient: {
          from: 'from-pink-300',
          to: 'to-purple-400'
        }
      }
    }
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