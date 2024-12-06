import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IssueList from "./IssueList";
import ChatBox from "./ChatBox";
import InviteUserForm from "./InviteUserForm";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";


const ProjectDetails = () => {




  const { id } = useParams(); // Extract project ID from route
  const [project, setProject] = useState(null); // State for project data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:2000/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!project) {
    return <p>Project not found</p>;
  }

  return (
    <>
      <div className="mt-5 sm:px-8 md:px-8 lg:px-10">
        <div className="lg:flex gap-5 justify-between pb-4">
          <ScrollArea className="h-screen lg:w-[69%] pr-2">
            <div className=" pb-10 w-full">
              <h1 className="text-lg font-semibold pb-5">
                {project.name}
              </h1>

              <div className="space-y-5 pb-10 text-sm">
                <p className="w-full md:max-w-lg lg:max-w-xl ">
                  {project.description}
                </p>
                <div className="flex">
                  <p className="w-36">Project Lead :</p>
                  <p>{project.owner.fullName}</p>
                </div>

                <div className="flex">
                  <p className="w-36">Members :</p>
                  <div className="flex items-center gap-2">
                    {project.team.map((member) => (
                      <Avatar key={member.id}>
                        <AvatarFallback>
                          {member.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>

                  <Dialog>
                    <DialogTrigger>
                      <DialogClose>
                        <Button
                          size="sm"
                          variant="outline"
                          
                          className="ml-2"
                        >
                          <span>invite</span>
                          <PlusIcon className="w-3 h-3" />
                        </Button>
                      </DialogClose>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>Invite User</DialogHeader>
                      <InviteUserForm projectId={project.id} />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex">
                  <p className="w-36">Category :</p>
                  <p>{project.category}</p>
                </div>

                <div className="flex">
                  <p className="w-36">Status :</p>
                  <Badge>In Progress</Badge>
                </div>
              </div>

              <section>
                <p className="py-5 border-b text-lg -tracking-wider">Tasks</p>
                <div className="lg:flex md:flex gap-3 justify-between py-5">
                  <IssueList status="pending" title="Todo List" />
                  <IssueList status="in_progress" title="In Progress" />
                  <IssueList status="done" title="Done" />
                </div>
              </section>
            </div>
          </ScrollArea>
          <div className="lg:w-[30%] rounded-md sticky right-5 top-10">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;

// 4th version---nice
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import IssueList from "./IssueList";
// import ChatBox from "./ChatBox";
// import InviteUserForm from "./InviteUserForm";
// import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
// import { PlusIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const ProjectDetails = () => {
//   const handleProjectInvitation = () => {
//     console.log("invite user");
//   };

//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(`http://localhost:2000/api/projects/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch project details");
//         }

//         const data = await response.json();
//         setProject(data);
//       } catch (error) {
//         console.error("Error fetching project:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProject();
//   }, [id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!project) {
//     return <p>Project not found</p>;
//   }

//   return (
//     <>
//       <div className="mt-5 sm:px-8 md:px-8 lg:px-10">
//         <div className="lg:flex gap-5 justify-between pb-4">
//           <ScrollArea className="h-screen lg:w-[69%] pr-2">
//             <div className="pb-10 w-full">
//               <h1 className="text-lg font-semibold pb-5">
//                 {project.name}
//               </h1>

//               <div className="space-y-5 pb-10 text-sm">
//                 <p className="w-full md:max-w-lg lg:max-w-xl ">
//                   {project.description}
//                 </p>
//                 <div className="flex">
//                   <p className="w-36">Project Lead :</p>
//                   <p>{project.owner.fullName}</p>
//                 </div>

//                 <div className="flex">
//                   <p className="w-36">Members :</p>
//                   <div className="flex items-center gap-2">
//                     {project.team.map((member) => (
//                       <Avatar key={member.id}>
//                         <AvatarFallback>
//                           {member.fullName
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                     ))}
//                   </div>

//                   <Dialog>
//                     <DialogTrigger>
//                       <DialogClose>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={handleProjectInvitation}
//                           className="ml-2"
//                         >
//                           <span>invite</span>
//                           <PlusIcon className="w-3 h-3" />
//                         </Button>
//                       </DialogClose>
//                     </DialogTrigger>
//                     <DialogContent>
//                       <DialogHeader>Invite User</DialogHeader>
//                       <InviteUserForm />
//                     </DialogContent>
//                   </Dialog>
//                 </div>

//                 <div className="flex">
//                   <p className="w-36">Category :</p>
//                   <p>{project.category}</p>
//                 </div>

//                 <div className="flex">
//                   <p className="w-36">Status :</p>
//                   <Badge>In Progress</Badge>
//                 </div>
//               </div>

//               <section>
//                 <p className="py-5 border-b text-lg -tracking-wider">Tasks</p>
//                 <ScrollArea className="w-full" type="scroll">
//                   <div className="flex gap-4 py-5 min-w-max">
//                     <div className="w-80">
//                       <IssueList status="pending" title="Todo List" />
//                     </div>
//                     <div className="w-80">
//                       <IssueList status="in_progress" title="In Progress" />
//                     </div>
//                     <div className="w-80">
//                       <IssueList status="done" title="Done" />
//                     </div>
//                   </div>
//                   <ScrollBar orientation="horizontal" />
//                 </ScrollArea>
//               </section>
//             </div>
//           </ScrollArea>
//           <div className="lg:w-[30%] rounded-md sticky right-5 top-10">
//             <ChatBox />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProjectDetails;


//2nd version--for mobile view good
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import IssueList from "./IssueList";
// import ChatBox from "./ChatBox";
// import InviteUserForm from "./InviteUserForm";
// import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight, MessageSquare, PlusIcon, X } from "lucide-react";

// const ProjectDetails = () => {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobileView(window.innerWidth < 768);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(`http://localhost:2000/api/projects/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) throw new Error("Failed to fetch project details");
//         const data = await response.json();
//         setProject(data);
//       } catch (error) {
//         console.error("Error fetching project:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProject();
//   }, [id]);

//   const ProjectInfo = () => (
//     <div className="space-y-5 pb-6 text-sm">
//       <p className="w-full md:max-w-2xl">{project.description}</p>
      
//       {[
//         { label: "Project Lead", content: project.owner.fullName },
//         { 
//           label: "Members", 
//           content: (
//             <div className="flex items-center gap-2">
//               <div className="flex -space-x-2">
//                 {project.team.map((member) => (
//                   <Avatar key={member.id} className="border-2 border-background">
//                     <AvatarFallback>
//                       {member.fullName.split(" ").map((n) => n[0]).join("")}
//                     </AvatarFallback>
//                   </Avatar>
//                 ))}
//               </div>
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button size="sm" variant="outline" className="ml-2">
//                     <PlusIcon className="w-3 h-3 mr-1" />
//                     Invite
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>Invite User</DialogHeader>
//                   <InviteUserForm />
//                 </DialogContent>
//               </Dialog>
//             </div>
//           )
//         },
//         { label: "Category", content: project.category },
//         { label: "Status", content: <Badge>In Progress</Badge> }
//       ].map((item, index) => (
//         <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2">
//           <p className="w-36 font-medium">{item.label} :</p>
//           <div>{item.content}</div>
//         </div>
//       ))}
//     </div>
//   );

//   if (loading) return (
//     <div className="flex items-center justify-center min-h-screen">
//       <p className="text-lg">Loading...</p>
//     </div>
//   );

//   if (!project) return (
//     <div className="flex items-center justify-center min-h-screen">
//       <p className="text-lg">Project not found</p>
//     </div>
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="relative min-h-[80vh] border rounded-lg bg-background shadow-sm">
//         <div className="p-4 md:p-6 h-full">
//           <div className="flex flex-col h-full">
//             <div className="flex-grow">
//               <div className="flex items-center justify-between mb-6">
//                 <h1 className="text-xl font-semibold">{project.name}</h1>
//                 {isMobileView && (
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => setIsChatOpen(true)}
//                   >
//                     <MessageSquare className="h-4 w-4" />
//                   </Button>
//                 )}
//               </div>

//               <ProjectInfo />

//               <div className="mt-6">
//                 <h2 className="text-lg font-medium pb-4 border-b">Tasks</h2>
//                 <ScrollArea className="w-full" type="scroll">
//                   <div className="flex gap-4 py-6 min-w-max">
//                     <IssueList status="pending" title="Todo List" className="w-80" />
//                     <IssueList status="in_progress" title="In Progress" className="w-80" />
//                     <IssueList status="done" title="Done" className="w-80" />
//                   </div>
//                   <ScrollBar orientation="horizontal" />
//                 </ScrollArea>
//               </div>
//             </div>
//           </div>

//           {/* Chat Section - Desktop */}
//           {!isMobileView && (
//             <div className="hidden lg:block lg:w-[30%] absolute right-6 top-6 bottom-6">
//               <ChatBox />
//             </div>
//           )}

//           {/* Chat Section - Mobile */}
//           {isMobileView && (
//             <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
//               <SheetContent side="right" className="w-full sm:max-w-lg">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="font-semibold">Chat</h3>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setIsChatOpen(false)}
//                   >
//                     <X className="h-4 w-4" />
//                   </Button>
//                 </div>
//                 <ChatBox />
//               </SheetContent>
//             </Sheet>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetails;




//5th version-too much because chat feels like a chat bot
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import IssueList from "./IssueList";
// import ChatBox from "./ChatBox";
// import InviteUserForm from "./InviteUserForm";
// import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
// import { MessageCircle, PlusIcon, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// const ProjectDetails = () => {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   const handleProjectInvitation = () => {
//     console.log("invite user");
//   };

//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(`http://localhost:2000/api/projects/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch project details");
//         }

//         const data = await response.json();
//         setProject(data);
//       } catch (error) {
//         console.error("Error fetching project:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProject();
//   }, [id]);

//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }

//   if (!project) {
//     return <div className="flex items-center justify-center h-screen">Project not found</div>;
//   }

//   return (
//     <div className="p-6">
//       {/* Project Header */}
//       <Card className="mb-6">
//         <CardContent className="pt-6">
//           <div className="flex justify-between items-start mb-4">
//             <h1 className="text-2xl font-bold">{project.name}</h1>
//             <Badge variant="outline" className="text-sm">
//               In Progress
//             </Badge>
//           </div>
          
//           <p className="text-sm text-gray-600 mb-6">{project.description}</p>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <div className="flex items-center gap-2">
//                 <span className="font-medium">Project Lead:</span>
//                 <span>{project.owner.fullName}</span>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <span className="font-medium">Category:</span>
//                 <span>{project.category}</span>
//               </div>
//             </div>
            
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <span className="font-medium">Team:</span>
//                 <div className="flex -space-x-2">
//                   {project.team.map((member) => (
//                     <Avatar key={member.id} className="border-2 border-white">
//                       <AvatarFallback className="bg-primary/10">
//                         {member.fullName.split(" ").map((n) => n[0]).join("")}
//                       </AvatarFallback>
//                     </Avatar>
//                   ))}
//                 </div>
//               </div>
              
//               <Dialog>
//                 <DialogTrigger>
//                   <Button size="sm" variant="outline">
//                     <PlusIcon className="w-4 h-4 mr-1" />
//                     Invite
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>Invite User</DialogHeader>
//                   <InviteUserForm />
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Tasks Section */}
//       <div className="relative">
//         <ScrollArea className="w-full" type="scroll">
//           <div className="flex gap-6 py-4 min-w-max">
//             <div className="w-96">
//               <Card>
//                 <CardContent className="p-4">
//                   <IssueList status="pending" title="Todo List" />
//                 </CardContent>
//               </Card>
//             </div>
//             <div className="w-96">
//               <Card>
//                 <CardContent className="p-4">
//                   <IssueList status="in_progress" title="In Progress" />
//                 </CardContent>
//               </Card>
//             </div>
//             <div className="w-96">
//               <Card>
//                 <CardContent className="p-4">
//                   <IssueList status="done" title="Done" />
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//           <ScrollBar orientation="horizontal" />
//         </ScrollArea>

//         {/* Chat Toggle Button */}
//         <div className="fixed bottom-6 right-6 z-50">
//           <Button
//             size="icon"
//             className="rounded-full w-12 h-12 shadow-lg"
//             onClick={() => setIsChatOpen(!isChatOpen)}
//           >
//             {isChatOpen ? (
//               <X className="w-5 h-5" />
//             ) : (
//               <MessageCircle className="w-5 h-5" />
//             )}
//           </Button>
//         </div>

//         {/* Chat Panel */}
//         {isChatOpen && (
//           <div className="fixed bottom-24 right-6 w-96 h-[600px] z-40 shadow-xl rounded-lg bg-white border">
//             <ChatBox />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectDetails;