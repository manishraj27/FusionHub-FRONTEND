import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Sparkles, Code2, Layout, Database } from 'lucide-react';
import ProjectCard from "../Project/ProjectCard";
import apiconfig from './../../../configurations/APIConfig';
import LoadingScreen from "@/components/LoadingScreen";

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
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiconfig.fusionhub_api}/api/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : [data]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'frontend':
        return <Layout className="h-5 w-5" />;
      case 'backend':
        return <Database className="h-5 w-5" />;
      case 'fullstack':
        return <Code2 className="h-5 w-5" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  const filterProjects = () => {
    return projects.filter(project => {
      const matchesKeyword = keyword === "" || 
        project.name.toLowerCase().includes(keyword.toLowerCase()) ||
        project.description.toLowerCase().includes(keyword.toLowerCase());
        
      const matchesCategory = filters.category === "all" || 
        project.category.toLowerCase() === filters.category.toLowerCase();
        
      const matchesTag = filters.tag === "all" || 
        project.tags.some(tag => tag.toLowerCase() === filters.tag.toLowerCase());

      return matchesKeyword && matchesCategory && matchesTag;
    });
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  const filteredProjects = filterProjects();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Discover Projects</h1>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Layout className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <Database className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search projects..."
                  className="pl-10 pr-4"
                />
              </div>
              
              <div className="flex gap-4">
                <Select
                  value={filters.category}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {["all", "fullstack", "frontend", "backend"].map((category) => (
                      <SelectItem key={category} value={category}>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(category)}
                          <span className="capitalize">{category}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.tag}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, tag: value }))}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Technology" />
                  </SelectTrigger>
                  <SelectContent>
                    {tags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Active Filters */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters.category !== 'all' && (
              <Badge variant="secondary" className="capitalize">
                {filters.category}
              </Badge>
            )}
            {filters.tag !== 'all' && (
              <Badge variant="secondary">
                {filters.tag}
              </Badge>
            )}
          </div>

          {/* Projects Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Total Projects</span>
                <span className="text-2xl font-bold">{projects.length}</span>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Filtered</span>
                <span className="text-2xl font-bold">{filteredProjects.length}</span>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Categories</span>
                <span className="text-2xl font-bold">
                  {new Set(projects.map(p => p.category)).size}
                </span>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Technologies</span>
                <span className="text-2xl font-bold">
                  {new Set(projects.flatMap(p => p.tags)).size}
                </span>
              </div>
            </Card>
          </div>

          {/* Projects Grid/List */}
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project}
                  viewMode={viewMode}
                />
              ))
            ) : (
              <Card className="col-span-full p-12">
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <Sparkles className="h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No projects found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filters to find what you're looking for
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { MagnifyingGlassIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
// import { useState, useEffect } from "react";
// import ProjectCard from "../Project/ProjectCard";
// import apiconfig from './../../../configurations/APIConfig';
// import LoadingScreen from "@/components/LoadingScreen";

// export const tags = [
//   "all",
//   "react",
//   "nextjs",
//   "springboot",
//   "nodejs",
//   "expressjs",
//   "mongodb",
//   "Tailwind"
// ];

// const ProjectList = () => {
//   const [keyword, setKeyword] = useState("");
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     category: "all",
//     tag: "all"
//   });

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${apiconfig.fusionhub_api}/api/projects`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch projects');
//       }
      
//       const data = await response.json();
//       console.log(data);
//       setProjects(Array.isArray(data) ? data : [data]);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (section, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [section]: value
//     }));
//   };

//   const handleSearchChange = (e) => {
//     setKeyword(e.target.value.toLowerCase());
//   };

//   const filterProjects = () => {
//     return projects.filter(project => {
//       const matchesKeyword = keyword === "" || 
//         project.name.toLowerCase().includes(keyword) ||
//         project.description.toLowerCase().includes(keyword);
        
//       const matchesCategory = filters.category === "all" || 
//         project.category.toLowerCase() === filters.category.toLowerCase();
        
//       const matchesTag = filters.tag === "all" || 
//         project.tags.some(tag => tag.toLowerCase() === filters.tag.toLowerCase());

//       return matchesKeyword && matchesCategory && matchesTag;
//     });
//   };

//   if (loading) {
//     return <LoadingScreen />;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
//   }

//   const filteredProjects = filterProjects();

//   return (
//     <>
//       <div className="isolate relative px-5 lg:flex gap-5 justify-center py-5">
//         <section className="filter section">
//           <Card className="p-5 sticky top-20">
//             <div className="flex justify-between lg:w-[20rem]">
//               <p className="text-xl -tracking-wider">filters</p>
//               <Button variant="ghost" size="icon">
//                 <MixerHorizontalIcon />
//               </Button>
//             </div>
//             <CardContent className="mt-5">
//               <ScrollArea className="space-y-7 h-[70vh]">
//                 <div>
//                   <h1 className="pb-3 text-gray-400 border-b">Category</h1>
//                   <div className="pt-5">
//                     <RadioGroup
//                       className="space-y-3 pt-5"
//                       defaultValue="all"
//                       onValueChange={(value) => handleFilterChange("category", value)}
//                     >
//                       {["all", "fullstack", "frontend", "backend"].map((category) => (
//                         <div key={category} className="flex items-center gap-2">
//                           <RadioGroupItem value={category} id={`category-${category}`} />
//                           <Label htmlFor={`category-${category}`}>
//                             {category.charAt(0).toUpperCase() + category.slice(1)}
//                           </Label>
//                         </div>
//                       ))}
//                     </RadioGroup>
//                   </div>
//                 </div>

//                 <div className="pt-9">
//                   <h1 className="pb-3 text-gray-400 border-b">Tags</h1>
//                   <div className="pt-5">
//                     <RadioGroup
//                       className="space-y-3 pt-5"
//                       defaultValue="all"
//                       onValueChange={(value) => handleFilterChange("tag", value)}
//                     >
//                       {tags.map((item) => (
//                         <div key={item} className="flex items-center gap-2">
//                           <RadioGroupItem value={item} id={`tag-${item}`} />
//                           <Label htmlFor={`tag-${item}`}>{item}</Label>
//                         </div>
//                       ))}
//                     </RadioGroup>
//                   </div>
//                 </div>
//               </ScrollArea>
//             </CardContent>
//           </Card>
//         </section>

//         <section className="projectListSection w-full lg:w-[48rem]">
//           <div className="sticky top-20 z-50 bg-background flex gap-2 items-center justify-between">
//             <div className="relative p-0 w-full">
//               <Input
//                 onChange={handleSearchChange}
//                 placeholder="Search for projects"
//                 className="40% px-9"
//               />
//               <MagnifyingGlassIcon className="absolute top-3 left-4" />
//             </div>
//           </div>

//           <div className="pt-4 overflow-y-auto">
//             <div className="space-y-5 min-h-[74vh]">
//               {filteredProjects.length > 0 ? (
//                 filteredProjects.map((project) => (
//                   <ProjectCard key={project.id} project={project} />
//                 ))
//               ) : (
//                 <div className="text-center text-gray-500">No projects found</div>
//               )}
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default ProjectList;