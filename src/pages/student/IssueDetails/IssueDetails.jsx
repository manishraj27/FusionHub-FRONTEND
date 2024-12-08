import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { CreateCommentForm } from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import apiconfig from './../../../configurations/APIConfig';
import { format } from 'date-fns';

const IssueDetails = () => {
  const { projectId, issueId } = useParams();
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiconfig.fusionhub_api}/api/issues/${issueId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch issue details');
        const data = await response.json();
        setIssue(data);
      } catch (error) {
        console.error("Error fetching issue:", error);
        setError("Failed to load issue details");
      }
    };

    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiconfig.fusionhub_api}/api/comments/${issueId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssueDetails();
    fetchComments();
  }, [issueId]);

  const handleUpdateIssueStatus = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiconfig.fusionhub_api}/api/issues/${issueId}/status/${newStatus}`, 
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to update status');
      const updatedIssue = await response.json();
      setIssue(updatedIssue);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleCommentCreate = (newComment) => {
    setComments(prev => [...prev, newComment]);
  };

  const handleCommentDelete = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiconfig.fusionhub_api}/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete comment');
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  if (!issue) return null;

  return (
    <div className="px-4 md:px-20 py-8 text-gray-400">
      <div className="flex flex-col lg:flex-row justify-between border p-4 md:p-10 rounded-lg gap-8">
        <ScrollArea className="h-[80vh] w-full lg:w-[60%]">
          <div>
            <h1 className="text-lg font-semibold text-gray-400">
              {issue.title}
            </h1>

            <div className="py-5">
              <h2 className="font-semibold">Description</h2>
              <p className="text-gray-400 text-sm mt-3">
                {issue.description}
              </p>
            </div>

            <div className="mt-5">
              <h1 className="pb-3">Activity</h1>
              <Tabs defaultValue="comments" className="w-full">
                <TabsList className="mb-5">
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="comments">
                  <CreateCommentForm 
                    issueId={issueId} 
                    onCommentCreated={handleCommentCreate} 
                  />

                  <div className="mt-8 space-y-6">
                    {comments.map((comment) => (
                      <CommentCard 
                        key={comment.id} 
                        comment={comment}
                        onDelete={handleCommentDelete}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <div className="text-sm text-gray-500">
                    Issue activity history will appear here
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full lg:w-[30%] space-y-4">
          <Select 
            onValueChange={handleUpdateIssueStatus}
            defaultValue={issue.status}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>

          <div className="border rounded-lg">
            <p className="border-b py-3 px-5">Details</p>
            <div className="p-5">
              <div className="space-y-5">
                <div className="flex items-center">
                  <p className="w-32 font-medium">Assignee</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 text-xs">
                      <AvatarFallback>
                        {issue.assignee?.fullName?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <p>{issue.assignee?.fullName || 'Unassigned'}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <p className="w-32 font-medium">Priority</p>
                  <Badge variant="secondary">{issue.priority}</Badge>
                </div>

                <div className="flex items-center">
                  <p className="w-32 font-medium">Status</p>
                  <Badge>{issue.status}</Badge>
                </div>

                <div className="flex items-center">
                  <p className="w-32 font-medium">Due Date</p>
                  <p>{issue.dueDate ? format(new Date(issue.dueDate), 'MMM d, yyyy') : 'Not set'}</p>
                </div>

                {issue.tags && issue.tags.length > 0 && (
                  <div className="flex items-center">
                    <p className="w-32 font-medium">Tags</p>
                    <div className="flex gap-2">
                      {issue.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;


// more responsive design
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useParams } from "react-router-dom";
// import { CreateCommentForm } from "./CreateCommentForm";
// import CommentCard from "./CommentCard";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { useState, useEffect } from "react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight, Info } from "lucide-react";

// const IssueDetails = () => {
//   const { projectId, issueId } = useParams();
//   const [isDetailsOpen, setIsDetailsOpen] = useState(true);
//   const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobileView(window.innerWidth < 768);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleUpdateIssueStatus = (status) => {
//     console.log("status: ", status);
//   };

//   const IssueContent = () => (
//     <div className="space-y-6">
//       <div>
//         <h2 className="font-semibold mb-2">Description</h2>
//         <p className="text-sm text-muted-foreground">
//           Lorem, ipsum dolor sit amet consectetur adipisicing elit.
//         </p>
//       </div>

//       <Tabs defaultValue="comments" className="w-full">
//         <TabsList className="w-full justify-start mb-4">
//           <TabsTrigger value="all">All</TabsTrigger>
//           <TabsTrigger value="comments">Comments</TabsTrigger>
//           <TabsTrigger value="history">History</TabsTrigger>
//         </TabsList>

//         <TabsContent value="all">
//           <p>All activity will appear here</p>
//         </TabsContent>

//         <TabsContent value="comments">
//           <CreateCommentForm issueId={issueId} />
//           <div className="mt-6 space-y-4">
//             {[1, 1, 1].map((item) => (
//               <CommentCard key={item} />
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="history">
//           <p>History will appear here</p>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );

//   const DetailsPanel = () => (
//     <div className="space-y-4">
//       <Select onValueChange={handleUpdateIssueStatus}>
//         <SelectTrigger className="w-full md:w-[180px]">
//           <SelectValue placeholder="To Do" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="pending">To Do</SelectItem>
//           <SelectItem value="in_progress">In Progress</SelectItem>
//           <SelectItem value="done">Done</SelectItem>
//         </SelectContent>
//       </Select>

//       <div className="border rounded-lg bg-card">
//         <p className="border-b py-3 px-5 font-medium">Details</p>
//         <div className="p-5 space-y-4">
//           {[
//             { label: "Assignee", content: { avatar: "A", name: "Annanya" } },
//             { label: "Labels", content: "None" },
//             { label: "Status", content: <Badge variant="secondary">in_progress</Badge> },
//             { label: "Release", content: "19-12-2024" },
//             { label: "Reporter", content: { avatar: "M", name: "Manish Raj" } }
//           ].map((item, index) => (
//             <div key={index} className="flex items-center">
//               <p className="w-24 font-medium">{item.label}</p>
//               {typeof item.content === 'object' && 'avatar' in item.content ? (
//                 <div className="flex items-center gap-2">
//                   <Avatar className="h-6 w-6 text-xs">
//                     <AvatarFallback>{item.content.avatar}</AvatarFallback>
//                   </Avatar>
//                   <p className="text-sm">{item.content.name}</p>
//                 </div>
//               ) : (
//                 <div>{item.content}</div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="border rounded-lg bg-background shadow-sm min-h-[80vh]">
//         <div className="p-4 md:p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h1 className="text-lg font-semibold">Create Navbar</h1>
//             {isMobileView && (
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="outline" size="icon">
//                     <Info className="h-4 w-4" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="right">
//                   <DetailsPanel />
//                 </SheetContent>
//               </Sheet>
//             )}
//           </div>

//           <div className="flex relative">
//             <div className={`transition-all duration-300 ${isMobileView ? 'w-full' : isDetailsOpen ? 'w-[70%]' : 'w-[85%]'}`}>
//               <ScrollArea className="h-[calc(100vh-12rem)]">
//                 <div className="pr-4">
//                   <IssueContent />
//                 </div>
//               </ScrollArea>
//             </div>

//             {!isMobileView && (
//               <div className="relative">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="absolute -left-3 top-1/2 transform -translate-y-1/2 z-10"
//                   onClick={() => setIsDetailsOpen(!isDetailsOpen)}
//                 >
//                   {isDetailsOpen ? (
//                     <ChevronRight className="h-4 w-4" />
//                   ) : (
//                     <ChevronLeft className="h-4 w-4" />
//                   )}
//                 </Button>
//                 <div className={`h-full border-l transition-all duration-300 ${
//                   isDetailsOpen ? 'w-[300px] opacity-100' : 'w-0 opacity-0 overflow-hidden'
//                 }`}>
//                   <div className="p-4">
//                     <DetailsPanel />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IssueDetails;