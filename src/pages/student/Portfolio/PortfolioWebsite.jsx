import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';

const PortfolioWebsite = ({ portfolio }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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


    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {portfolio.name}
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    activeSection === item.id ? 'text-blue-600' : 'text-gray-600'
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
                  className="block w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
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
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {portfolio.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {portfolio.about}
            </p>
            <div className="flex justify-center gap-6">
              {portfolio.githubLink && (
                <a href={portfolio.githubLink} 
                  className="transform hover:scale-110 transition-transform"
                  target="_blank" rel="noopener noreferrer">
                  <Github className="h-6 w-6 text-gray-700 hover:text-blue-600" />
                </a>
              )}
              {portfolio.linkedinLink && (
                <a href={portfolio.linkedinLink}
                  className="transform hover:scale-110 transition-transform"
                  target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-6 w-6 text-gray-700 hover:text-blue-600" />
                </a>
              )}
              {portfolio.email && (
                <a href={`mailto:${portfolio.email}`}
                  className="transform hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6 text-gray-700 hover:text-blue-600" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Skills & Expertise</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {portfolio.skills?.map((skill, index) => (
              <div
                key={index}
                className="group relative px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-xl transition-all"
              >
                <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
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
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Professional Experience</h2>
          <div className="space-y-8">
            {portfolio.experiences?.map((exp, index) => (
              <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-500">
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[8px] top-2 ring-4 ring-blue-50"></div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all">
                  <p className="text-gray-700 leading-relaxed">{exp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.projectDTOs?.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-4">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-6">{project.description}</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolio.education?.map((edu, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <p className="text-gray-700">{edu}</p>
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