
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail } from 'lucide-react';

const PortfolioPreview = ({ portfolio }) => {
  const themeStyles = {
    minimalist: {
      container: "bg-white text-gray-900",
      heading: "text-2xl font-bold",
      section: "border-t border-gray-200 pt-4 mt-4"
    },
    modern: {
      container: "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800",
      heading: "text-3xl font-extrabold text-blue-600",
      section: "bg-white rounded-lg p-4 shadow-md mb-4"
    },
    classic: {
      container: "bg-gray-50 text-gray-900",
      heading: "text-2xl font-semibold text-gray-700",
      section: "border-l-4 border-blue-500 pl-4 mb-4"
    }
  };

  const currentTheme = themeStyles[portfolio.theme] || themeStyles.minimalist;

  return (
    <Card className={`h-full ${currentTheme.container}`}>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h1 className={currentTheme.heading}>{portfolio.name || 'Your Name'}</h1>
          <p className="text-gray-600">{portfolio.about || 'About Me'}</p>
        </div>

        <div className={`${currentTheme.section}`}>
          <h2 className="font-bold mb-2">Contact</h2>
          <div className="flex items-center space-x-2">
            {portfolio.githubLink && (
              <a href={portfolio.githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            )}
            {portfolio.linkedinLink && (
              <a href={portfolio.linkedinLink} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {portfolio.email && (
              <a href={`mailto:${portfolio.email}`}>
                <Mail className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        {portfolio.skills.length > 0 && (
          <div className={`${currentTheme.section}`}>
            <h2 className="font-bold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {portfolio.experiences.length > 0 && (
          <div className={`${currentTheme.section}`}>
            <h2 className="font-bold mb-2">Experiences</h2>
            {portfolio.experiences.map((exp, index) => (
              <div key={index} className="mb-2">
                <p>{exp}</p>
              </div>
            ))}
          </div>
        )}

        {portfolio.education.length > 0 && (
          <div className={`${currentTheme.section}`}>
            <h2 className="font-bold mb-2">Education</h2>
            {portfolio.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <p>{edu}</p>
              </div>
            ))}
          </div>
        )}

        {portfolio.projects && portfolio.projects.filter(p => p.selected).length > 0 && (
          <div className={`${currentTheme.section}`}>
            <h2 className="font-bold mb-2">Projects</h2>
            <div className="space-y-2">
              {portfolio.projects
                .filter(project => project.selected)
                .map((project) => (
                  <div key={project.id} className="bg-gray-100 p-2 rounded">
                    {project.name}
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioPreview;