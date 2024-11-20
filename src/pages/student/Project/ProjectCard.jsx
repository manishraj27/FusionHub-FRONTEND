import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/project/edit/${project.id}`);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:2000/api/projects/${project.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      // Refresh the page or update the project list
      window.location.reload();
    } catch (error) {
      console.error('Error deleting project:', error);
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

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="rounded-full" variant="ghost" size="icon">
                    <DotsVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleUpdate}>Update</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <p className="text-gray-500 text-sm">{project.description}</p>
          {/* <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Team Size: {project.team.length}</span>
          </div> */}
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