import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";

const IssueCard = ({ issue, onStatusUpdate }) => {
  const navigate = useNavigate();

  const handleStatusChange = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:2000/api/issues/${issue.id}/status/${newStatus}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to update status to ${newStatus}`);
      }

      const updatedIssue = await response.json();
      onStatusUpdate(updatedIssue); // Notify parent component to handle updated issue
    } catch (error) {
      console.error("Error updating issue status:", error);
      alert("Unable to update status. Please try again.");
    }
  };
  return (
    <Card className="rounded-md py-1 pb-2">
      <CardHeader className="py-0 pb-1">
        <div className="flex justify-between items-center">
          <CardTitle 
          className="cursor-pointer"
          onClick={()=>navigate(`/project/${issue.projectID}/issue/${issue.id}`)}>{issue.title}</CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="rounded-full" size="icon" variant="ghost">
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleStatusChange("pending")}>To Do</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("in_progress")}>In Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("done")}>Done</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <div className="flex items-center justify-between">
          <p>{issue.description}</p>
          <DropdownMenu className="W-[30rem] border border-red-400">
            <DropdownMenuTrigger>
              <Button
              size="icon"
              className="bg-gray-900 hover:text-black text-white rounded-full">
                <Avatar>
                <AvatarFallback>
                  <PersonIcon />
                </AvatarFallback>

                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <UserList projectId={issue.projectID}/>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
