import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { PersonIcon } from "@radix-ui/react-icons";

const UserList = ({ projectId, issueId, onAssigneeUpdate, currentAssignee }) => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:2000/api/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch project team");
        }

        const project = await response.json();
        setTeam(project.team);
      } catch (error) {
        console.error("Error fetching project team:", error);
      }
    };

    fetchTeam();
  }, [projectId]);

  const handleAssignUser = async (userId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:2000/api/issues/${issueId}/assignee/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to assign user");
      }

      const updatedIssue = await response.json();
      onAssigneeUpdate(updatedIssue);
    } catch (error) {
      console.error("Error assigning user:", error);
      alert("Failed to assign user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatUsername = (email) => {
    if (!email) return "";
    const username = email.split("@")[0];
    return `@${username}`;
  };

  return (
    <div className="space-y-2 p-2 min-w-64">
      <div className="border rounded-md">
        <p className="py-2 px-3 text-sm text-muted-foreground">
          Click on a user to assign them to this issue
        </p>
      </div>

      <Alert variant={currentAssignee ? "default" : "secondary"} className="mb-4">
        <AlertDescription className="flex items-center space-x-2">
          {currentAssignee ? (
            <>
               <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {currentAssignee.fullName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">
                Assigned to 
                <span className="text-muted-foreground ml-1">
                  {formatUsername(currentAssignee.email)}
                </span>
              </span>
            </>
          ) : (
            <>
              <PersonIcon className="h-4 w-4" />
              <span className="text-sm">Currently unassigned</span>
            </>
          )}
        </AlertDescription>
      </Alert>
      
      {team.map((user) => (
        <div
          key={user.id}
          onClick={() => !loading && handleAssignUser(user.id)}
          className="py-2 group hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4"
        >
          <Avatar>
            <AvatarFallback>
              {user.fullName?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm leading-none">{user.fullName}</p>
            <p className="text-sm text-muted-foreground">{formatUsername(user.email)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;