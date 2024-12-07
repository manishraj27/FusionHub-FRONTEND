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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";
import apiconfig from './../../../configurations/APIConfig';

const IssueCard = ({ issue, onStatusUpdate, onAssigneeUpdate, onDelete }) => {
  const navigate = useNavigate();
  const [assignedUser, setAssignedUser] = useState(null);

  useEffect(() => {
    setAssignedUser(issue.assignee);
  }, [issue.assignee]);

  const handleStatusChange = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiconfig.fusionhub_api}/api/issues/${issue.id}/status/${newStatus}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to update status to ${newStatus}`);
      }

      const updatedIssue = await response.json();
      onStatusUpdate(updatedIssue);
    } catch (error) {
      console.error("Error updating issue status:", error);
    }
  };

  const handleAssigneeUpdate = (updatedIssue) => {
    setAssignedUser(updatedIssue.assignee);
    onAssigneeUpdate?.(updatedIssue);
  };

  const handleDeleteIssue = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${apiconfig.fusionhub_api}/api/issues/${issue.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onDelete(issue.id); // Notify parent component to remove the issue
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  };

  return (
    <Card className="rounded-md py-1 pb-2">
      <CardHeader className="py-0 pb-1">
        <div className="flex justify-between items-center">
          <CardTitle
            className="cursor-pointer"
            onClick={() => navigate(`/project/${issue.projectID}/issue/${issue.id}`)}
          >
            {issue.title}
          </CardTitle>

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
              <DropdownMenuItem onClick={handleDeleteIssue}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <div className="flex items-center justify-between">
          <p>{issue.description}</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                size="icon"
                className="bg-gray-900 hover:text-black text-white rounded-full"
              >
                <Avatar>
                  <AvatarFallback>
                    {assignedUser ? assignedUser.fullName?.charAt(0) : <PersonIcon />}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <UserList
                projectId={issue.projectID}
                issueId={issue.id}
                currentAssignee={issue.assignee}
                onAssigneeUpdate={handleAssigneeUpdate}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
