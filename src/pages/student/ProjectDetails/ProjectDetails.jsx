import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Users,
  UserPlus,
  Crown,
  FileText,
  LayoutGrid,
  Layers,
  CheckCircle,
  Mail,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import apiconfig from "./../../../configurations/APIConfig";
import LoadingScreen from "@/components/LoadingScreen";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import InviteUserForm from "./InviteUserForm";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${apiconfig.fusionhub_api}/api/projects/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }

        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);


const [issues, setIssues] = useState([]);
const [setIsLoading] = useState(true);

useEffect(() => {
  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiconfig.fusionhub_api}/api/issues/project/${id}`, 
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch issues");
      }

      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchIssues();
}, [id]);



  const calculateProjectProgress = () => {
    if (!issues || issues.length === 0) return 0;
  
    const totalIssues = issues.length;
    const completedIssues = issues.filter(issue => issue.status === "done").length;
  
    return Math.round((completedIssues / totalIssues) * 100);
  };
  

  if (loading) {
    return <LoadingScreen />;
  }

  if (!project) {
    return <div className="text-center text-red-500">Project not found</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Overview Card */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
            <Badge
              variant="outline"
              className="text-xs uppercase tracking-wider"
            >
              {project.category}
            </Badge>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="members">Team</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-6">
                  {/* Project Description */}
                  <div className="bg-background p-4 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                      Project Description
                    </h3>
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  {/* Project Details Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Project Metadata */}
                    <div className="bg-background p-4 rounded-lg border space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <LayoutGrid className="mr-2 h-5 w-5 text-muted-foreground" />
                        Project Details
                      </h3>
                      <div className="space-y-2">
                        {/* Category */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Layers className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">Category</span>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="secondary">
                                  {project.category}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                Project Classification
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        {/* Project Status */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">Status</span>
                          </div>
                          <Badge variant="outline">
                            {project.status || "Active"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Project Progress */}
                    <div className="bg-background p-4 rounded-lg border space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                        Progress Tracking
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Project Progress</span>
                          <span>{calculateProjectProgress()}%</span>
                        </div>
                        <Progress value={calculateProjectProgress()} />
                      </div>
                    </div>
                  </div>

                  {/* Team Section */}
                  <div className="bg-background p-4 rounded-lg border space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                      Team Members
                    </h3>

                    {/* Project Lead */}
                    <div className="flex items-center space-x-2 pb-4 border-b">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      <span className="font-semibold">Project Lead:</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {project.owner.fullName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">
                                  {project.owner.fullName}
                                </p>
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div>
                              <p className="font-bold">
                                {project.owner.fullName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {project.owner.email}
                              </p>
                              <p className="text-xs">Project Lead</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    {/* Team Members */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span>Team ({project.team.length})</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.team.map((member) => (
                          <TooltipProvider key={member.id}>
                            <Tooltip>
                              <TooltipTrigger>
                                <Avatar>
                                  <AvatarFallback>
                                    {member.fullName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div>
                                  <p className="font-bold">{member.fullName}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {member.email}
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tasks">
                <ScrollArea className="w-full" type="scroll">
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    <div className="flex gap-4 py-6 min-w-max">
                      <div className="w-80">
                        <IssueList status="pending" title="Todo List" />
                      </div>
                      <div className="w-80">
                        <IssueList status="in_progress" title="In Progress" />
                      </div>
                      <div className="w-80">
                        <IssueList status="done" title="Done" />
                      </div>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </div>
                </ScrollArea>
              </TabsContent>

              

              <TabsContent value="members">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="font-semibold">
                        Team Members ({project.team.length})
                      </span>
                    </div>
                    <AlertDialog
                      open={isInviteDialogOpen}
                      onOpenChange={setIsInviteDialogOpen}
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <UserPlus className="mr-2 h-4 w-4" /> Invite Member
                            <PlusIcon className="ml-2 w-3 h-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Invite Team Member</DialogTitle>
                            <DialogDescription>
                              Add a new member to the project team
                            </DialogDescription>
                          </DialogHeader>
                          <InviteUserForm projectId={project.id} />
                        </DialogContent>
                      </Dialog>
                    </AlertDialog>
                  </div>

                  {/* Team Members Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Project Owner (Team Lead) Card */}
                    <Card className="border-primary/20 shadow-sm">
                      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {project.owner.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {project.owner.fullName}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground">
                            Project Lead
                          </p>
                        </div>
                        <Crown className="ml-auto h-5 w-5 text-yellow-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{project.owner.email}</span>
                          </div>
                          {/* <Badge variant="secondary">Administrator</Badge> */}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Other Team Members */}
                    {project.team.slice(1).map((member) => (
                      <Card
                        key={member.id}
                        className="hover:border-primary/30 transition-all"
                      >
                        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>
                              {member.fullName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">
                              {member.fullName}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{member.email}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Project Chat Section */}
        <Card className="hidden lg:block shadow-lg">
          <CardHeader>
            <CardTitle>Project Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <ChatBox projectId={id} />
          </CardContent>
        </Card>
      </div>


      <Sheet>
          <SheetTrigger asChild className="lg:hidden fixed bottom-4 right-4 z-50">
            <Button size="icon" variant="outline">
              <MoreHorizontal />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Project Chat</SheetTitle>
            </SheetHeader>
            <ChatBox projectId={id} />
          </SheetContent>
        </Sheet>
    </div>
  );
};

export default ProjectDetails;
