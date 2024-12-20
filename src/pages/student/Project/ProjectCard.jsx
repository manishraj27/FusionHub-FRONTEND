import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import CreateProjectForm from "./CreateProjectForm";
import apiconfig from "./../../../configurations/APIConfig";
import { MoreVertical, Pen, PenIcon } from "lucide-react";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiconfig.fusionhub_api}/api/projects/${project.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <Card className="p-5 w-full lg:max-w-3xl">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <h1
                onClick={() => navigate(`/project/${project.id}`)}
                className="cursor-pointer font-bold text-lg"
              >
                {project.name}
              </h1>
              <DotFilledIcon />
              <p className="text-sm text-gray-400">{project.category}</p>
            </div>

            <div className="flex items-center gap-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Pen className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Update Project</DialogHeader>
          <CreateProjectForm project={project} />
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            className="text-red-600 focus:text-red-600" 
            onClick={handleDelete}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

          </div>

          <p className="text-gray-500 text-sm">{project.description}</p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Team Size: {project.team.length}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag.trim()}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
