import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PortfolioPreviewDialog from "./PortfolioPreviewDialog";
import PortfolioThemeShowcase from "./PortfolioThemeShowcase";

function CreatePortfolioForm({ initialPortfolio, isUpdate = false }) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [projects, setProjects] = useState([]);
  const [portfolio, setPortfolio] = useState({
    uniqueUsername: '',
    name: '',
    about: '',
    theme: 'minimalist',
    skills: [''],
    experiences: [''],
    education: [''],
    githubLink: '',
    linkedinLink: '',
    projectIds: [],
    email: '',
  });

  // Fetch projects from API
  useEffect(() => {
    fetchProjects();
  }, []);

  // Pre-fill form with existing portfolio data
  useEffect(() => {
    if (initialPortfolio) {
      setPortfolio({
        uniqueUsername: initialPortfolio.uniqueUsername || '',
        name: initialPortfolio.name || '',
        about: initialPortfolio.about || '',
        theme: initialPortfolio.theme || 'minimalist',
        skills: initialPortfolio.skills && initialPortfolio.skills.length > 0 ? initialPortfolio.skills : [''],
        experiences: initialPortfolio.experiences && initialPortfolio.experiences.length > 0 ? initialPortfolio.experiences : [''],
        education: initialPortfolio.education && initialPortfolio.education.length > 0 ? initialPortfolio.education : [''],
        githubLink: initialPortfolio.githubLink || '',
        linkedinLink: initialPortfolio.linkedinLink || '',
        projectIds: initialPortfolio.projectIds || [],
        email: initialPortfolio.email || '',
      });
    }
  }, [initialPortfolio]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:2000/api/projects', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPortfolio(prev => ({ ...prev, [name]: value }));
  };

  const updateArrayField = (field, index, value) => {
    const newArray = [...portfolio[field]];
    newArray[index] = value;
    setPortfolio(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayField = (field) => {
    setPortfolio(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayField = (field, index) => {
    const newArray = portfolio[field].filter((_, i) => i !== index);
    setPortfolio(prev => ({ ...prev, [field]: newArray }));
  };

  const toggleProject = (projectId) => {
    setPortfolio(prev => ({
      ...prev,
      projectIds: prev.projectIds.includes(projectId)
        ? prev.projectIds.filter(id => id !== projectId)
        : [...prev.projectIds, projectId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found. Please login again.');

      const response = await fetch('http://localhost:2000/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(portfolio)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create/update portfolio');
      }

      setAlert({
        type: 'success',
        message: isUpdate
          ? 'Portfolio updated successfully!'
          : 'Portfolio created successfully!'
      });
    } catch (error) {
      setAlert({ type: 'error', message: error.message || 'Failed to create/update portfolio' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Form Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {isUpdate ? 'Update Your Portfolio' : 'Create Your Portfolio'}
              </CardTitle>
              <PortfolioPreviewDialog portfolio={portfolio} />
            </CardHeader>
            <CardContent>
              {alert.message && (
                <Alert className={`mb-4 ${alert.type === 'success' ? 'bg-green-50 text-green-700 border-green-200 mb-4 fixed top-4 right-4 w-96 z-50 shadow-lg' : 'bg-red-50 text-red-700 border-red-200 mb-4 fixed top-4 right-4 w-96 z-50 shadow-lg'}`}>
                  <AlertDescription>{alert.message}</AlertDescription>
                </Alert>
              )}

              {alert.message && setTimeout(() => {
                setAlert({ ...alert, message: '' });
              }, 2000)}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Basic Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Unique Username</Label>
                    <Input
                      name="uniqueUsername"
                      value={portfolio.uniqueUsername}
                      onChange={handleInputChange}
                      placeholder="Enter your unique username"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Your portfolio will be visible at: http://localhost:5173/share/{portfolio.uniqueUsername || '{username}'}
                    </p>
                  </div>

                  <div>
                    <Label>Name</Label>
                    <Input
                      name="name"
                      value={portfolio.name}
                      onChange={handleInputChange}
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      name="email"
                      value={portfolio.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                    />
                  </div>
                </div>

                <div>
                  <Label>About</Label>
                  <Textarea
                    name="about"
                    value={portfolio.about}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                  />
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>GitHub Link</Label>
                    <Input
                      name="githubLink"
                      value={portfolio.githubLink}
                      onChange={handleInputChange}
                      placeholder="GitHub Profile URL"
                    />
                  </div>
                  <div>
                    <Label>LinkedIn Link</Label>
                    <Input
                      name="linkedinLink"
                      value={portfolio.linkedinLink}
                      onChange={handleInputChange}
                      placeholder="LinkedIn Profile URL"
                    />
                  </div>
                </div>

                {/* Theme Selection */}
                <div>
                  <Label>Portfolio Theme</Label>
                  <Select
                    value={portfolio.theme}
                    onValueChange={(value) => setPortfolio(prev => ({ ...prev, theme: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                      <SelectItem value="pastel">Pastel</SelectItem>

                    </SelectContent>
                  </Select>
                </div>

                {/* Project Selection */}
                <div>
                  <Label>Select Projects</Label>
                  <div className="space-y-4 mt-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between border p-4 rounded-lg"
                      >
                        <div className="flex items-start space-x-4">

                          <div>
                            <h4 className="text-lg font-medium">{project.name}</h4>
                            <p className="text-sm text-gray-400">{project.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={portfolio.projectIds.includes(project.id)}
                          onCheckedChange={() => toggleProject(project.id)}
                          className="transition-transform transform hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>

                </div>

                {/* Dynamic Sections */}
                {['skills', 'experiences', 'education'].map((field) => (
                  <div key={field}>
                    <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                    {portfolio[field].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <Input
                          value={item}
                          onChange={(e) => updateArrayField(field, index, e.target.value)}
                          placeholder={`Enter ${field.slice(0, -1)}`}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeArrayField(field, index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() => addArrayField(field)}
                      variant="outline"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add {field.charAt(0).toUpperCase() + field.slice(1)}
                    </Button>
                  </div>
                ))}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading
                    ? (isUpdate ? "Updating..." : "Creating...")
                    : (isUpdate ? "Update Portfolio" : "Create Portfolio")
                  }
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>

        <div className="hidden lg:block">
          <PortfolioThemeShowcase currentTheme={portfolio.theme} />
        </div>
      </div>
    </div>
  );
}

export default CreatePortfolioForm;