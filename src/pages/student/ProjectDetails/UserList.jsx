import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

const UserList = ({ projectId }) => {
  const [team, setTeam] = useState([]);

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

  return (
    <div className="space-y-2">
      {team.length === 0 ? (
        <p className="text-muted-foreground">No team members</p>
      ) : (
        team.map((member) => (
          <div
            key={member.id}
            className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4"
          >
            <Avatar>
              <AvatarFallback>
                {member.fullName.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm leading-none">{member.fullName}</p>
              <p className="text-sm text-muted-foreground">{member.email}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;
