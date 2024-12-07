import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import IssueCard from "./IssueCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import CreateIssueForm from "./CreateIssueForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiconfig from './../../../configurations/APIConfig';

const IssueList = ({ title, status }) => {
  const { id: projectId } = useParams();
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiconfig.fusionhub_api}/api/issues/project/${projectId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch issues");
        }

        const data = await response.json();
        
        // Filter issues by status
        const filteredIssues = data.filter(issue => issue.status === status);
        
        setIssues(filteredIssues);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching issues:", error);
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, [projectId, status]);

  const handleIssueCreated = (newIssue) => {
    if (newIssue.status === status) {
      setIssues(prevIssues => [...prevIssues, newIssue]);
    }
  };

   const handleIssueStatusUpdate = (updatedIssue) => {
     setIssues(prevIssues =>
       prevIssues.filter(issue => issue.id !== updatedIssue.id) 
     );
  window.location.reload();
   };
  

   const handleAssigneeUpdate = (updatedIssue) => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === updatedIssue.id ? updatedIssue : issue
      )
    );
  };
   
  const handleIssueDelete = (deletedIssueId) => {
    setIssues((prevIssues) =>
      prevIssues.filter((issue) => issue.id !== deletedIssueId)
    );
  };


  return (
    <div>
      <Dialog>
        <Card className="w-full md:w-[300px] lg:w-[310px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : issues.length === 0 ? (
              <p className="text-center text-muted-foreground">No issues</p>
            ) : (
              <div className="space-y-2">
                {issues.map((issue) => (
                  <IssueCard 
                  key={issue.id} 
                  issue={issue} 
                  onStatusUpdate={handleIssueStatusUpdate}
                  onAssigneeUpdate={handleAssigneeUpdate} 
                  onDelete={handleIssueDelete}
                />
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <DialogTrigger className="w-full">
              <Button
                variant="outline"
                className="w-full border items-center gap-2"
              >
                <PlusIcon />
                Create Issue
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Issue</DialogTitle>
          </DialogHeader>
          <CreateIssueForm onIssueCreated={handleIssueCreated} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssueList;