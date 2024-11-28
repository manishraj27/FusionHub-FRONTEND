import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MagnifyingGlassIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import ProjectCard from "../Project/ProjectCard";

export const tags = [
  "all",
  "react",
  "nextjs",
  "springboot",
  "nodejs",
  "expressjs",
  "mongodb",
  "Tailwind"
];

const ProjectList = () => {
  const [keyword, setKeyword] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "all",
    tag: "all"
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:2000/api/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data = await response.json();
      console.log(data);
      setProjects(Array.isArray(data) ? data : [data]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleFilterChange = (section, value) => {
    setFilters(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value.toLowerCase());
  };

  const filterProjects = () => {
    return projects.filter(project => {
      const matchesKeyword = keyword === "" || 
        project.name.toLowerCase().includes(keyword) ||
        project.description.toLowerCase().includes(keyword);
        
      const matchesCategory = filters.category === "all" || 
        project.category.toLowerCase() === filters.category.toLowerCase();
        
      const matchesTag = filters.tag === "all" || 
        project.tags.some(tag => tag.toLowerCase() === filters.tag.toLowerCase());

      return matchesKeyword && matchesCategory && matchesTag;
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  const filteredProjects = filterProjects();

  return (
    <>
      <div className="isolate relative px-5 lg:flex gap-5 justify-center py-5">
        <section className="filter section">
          <Card className="p-5 sticky top-20">
            <div className="flex justify-between lg:w-[20rem]">
              <p className="text-xl -tracking-wider">filters</p>
              <Button variant="ghost" size="icon">
                <MixerHorizontalIcon />
              </Button>
            </div>
            <CardContent className="mt-5">
              <ScrollArea className="space-y-7 h-[70vh]">
                <div>
                  <h1 className="pb-3 text-gray-400 border-b">Category</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="space-y-3 pt-5"
                      defaultValue="all"
                      onValueChange={(value) => handleFilterChange("category", value)}
                    >
                      {["all", "fullstack", "frontend", "backend"].map((category) => (
                        <div key={category} className="flex items-center gap-2">
                          <RadioGroupItem value={category} id={`category-${category}`} />
                          <Label htmlFor={`category-${category}`}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                <div className="pt-9">
                  <h1 className="pb-3 text-gray-400 border-b">Tags</h1>
                  <div className="pt-5">
                    <RadioGroup
                      className="space-y-3 pt-5"
                      defaultValue="all"
                      onValueChange={(value) => handleFilterChange("tag", value)}
                    >
                      {tags.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <RadioGroupItem value={item} id={`tag-${item}`} />
                          <Label htmlFor={`tag-${item}`}>{item}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>

        <section className="projectListSection w-full lg:w-[48rem]">
          <div className="sticky top-20 z-50 bg-background flex gap-2 items-center justify-between">
            <div className="relative p-0 w-full">
              <Input
                onChange={handleSearchChange}
                placeholder="Search for projects"
                className="40% px-9"
              />
              <MagnifyingGlassIcon className="absolute top-3 left-4" />
            </div>
          </div>

          <div className="pt-4 overflow-y-auto">
            <div className="space-y-5 min-h-[74vh]">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <div className="text-center text-gray-500">No projects found</div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectList;