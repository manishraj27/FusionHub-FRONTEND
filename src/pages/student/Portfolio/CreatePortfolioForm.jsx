
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from 'lucide-react';

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import PortfolioPreview from "./PortfolioPreview";
import { Alert, AlertDescription } from "@/components/ui/alert";



// Main Portfolio Creation Form
function CreatePortfolioForm() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
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
    projects: [
      { id: 1, name: 'Project 1', selected: false },
      { id: 2, name: 'Project 2', selected: false },
      { id: 3, name: 'Project 3', selected: false }
    ],
    email: '',
  });

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setPortfolio(prev => ({ ...prev, uniqueUsername: username }));
  };

  const toggleProject = (projectId) => {
    setPortfolio(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId
          ? { ...project, selected: !project.selected }
          : project
      )
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }

      const portfolioData = {
        ...portfolio,
        projects: portfolio.projects
          .filter(project => project.selected)
          .map(({ id, name }) => ({ id, name }))
      };

      const response = await fetch('http://localhost:2000/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(portfolioData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create portfolio');
      }

      await response.json();
      setAlert({
        type: 'success',
        message: 'Portfolio created successfully!'
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.message || 'Failed to create portfolio'
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {/* Form Column */}
      <Card>
        <CardHeader>
          <CardTitle>Create Your Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          {alert.message && (
            <Alert className={`mb-4 ${alert.type === 'success' ? 'bg-green-50 text-green-700 border-green-200 mb-4 fixed top-4 right-4 w-96 z-50 shadow-lg' : 'bg-red-50 text-red-700 border-red-200 mb-4 fixed top-4 right-4 w-96 z-50 shadow-lg'}`}>
              <AlertDescription>
                {alert.message}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <Label>Unique Username</Label>
                <Input
                  value={portfolio.uniqueUsername}
                  onChange={handleUsernameChange}
                  placeholder="Enter your unique username"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Your portfolio will be visible at: http://localhost:5173/{portfolio.uniqueUsername || '{username}'}
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
                onValueChange={(value) =>
                  setPortfolio(prev => ({ ...prev, theme: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <Label>Select Projects</Label>
              <div className="space-y-2 mt-2">
                {portfolio.projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between border p-2 rounded"
                  >
                    <span>{project.name}</span>
                    <Switch
                      checked={project.selected}
                      onCheckedChange={() => toggleProject(project.id)}
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

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Portfolio"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Preview Column */}
      <PortfolioPreview portfolio={portfolio} />
    </div>
  );
}

export default CreatePortfolioForm;