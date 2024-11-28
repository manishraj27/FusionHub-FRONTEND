import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, ExternalLink, ChevronRight } from 'lucide-react';

const PortfolioPreview = ({ portfolio }) => {
  const [activeProject, setActiveProject] = useState(null);

  const themes = {
    minimalist: {
      container: "bg-gradient-to-br from-white to-gray-50",
      heading: "bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent text-4xl",
      section: "backdrop-blur-sm bg-white/50 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl"
    },
    modern: {
      container: "bg-gradient-to-br from-blue-50 to-indigo-50",
      heading: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-4xl",
      section: "backdrop-blur-sm bg-white/60 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl"
    },
    classic: {
      container: "bg-gradient-to-br from-amber-50 to-yellow-50",
      heading: "bg-gradient-to-r from-amber-700 to-yellow-700 bg-clip-text text-transparent text-4xl",
      section: "backdrop-blur-sm bg-white/60 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl"
    }
  };

  const currentTheme = themes[portfolio.theme] || themes.modern;

  return (
    <Card className={`min-h-screen ${currentTheme.container}`}>
      <CardContent className="p-8 max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className={`${currentTheme.heading} font-bold mb-4`}>
            {portfolio.name || 'Your Name'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {portfolio.about || 'About Me'}
          </p>
          
          {/* Contact Icons */}
          <div className="flex justify-center gap-6 mt-8">
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

        {/* Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <div className={`${currentTheme.section}`}>
            <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {portfolio.experiences && portfolio.experiences.length > 0 && (
          <div className={`${currentTheme.section}`}>
            <h2 className="text-2xl font-bold mb-6">Professional Journey</h2>
            <div className="space-y-6">
              {portfolio.experiences.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-blue-500">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2"></div>
                  <p className="text-gray-700">{exp}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {portfolio.projectDTOs && portfolio.projectDTOs.length > 0 && (
          <div className={`${currentTheme.section}`}>
            <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projectDTOs.map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 cursor-pointer"
                  onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </h3>
                    <ChevronRight className={`w-5 h-5 transition-transform ${activeProject === project.id ? 'rotate-90' : ''}`} />
                  </div>
                  
                  <div className={`mt-4 transition-all ${activeProject === project.id ? 'block' : 'hidden'}`}>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {portfolio.education && portfolio.education.length > 0 && (
          <div className={`${currentTheme.section}`}>
            <h2 className="text-2xl font-bold mb-6">Education</h2>
            <div className="space-y-4">
              {portfolio.education.map((edu, index) => (
                <div key={index} className="bg-white/50 rounded-lg p-4 hover:bg-white/80 transition-colors">
                  <p className="text-gray-700">{edu}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioPreview;