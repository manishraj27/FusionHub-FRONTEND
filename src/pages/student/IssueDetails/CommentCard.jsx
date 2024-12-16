import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { format } from 'date-fns'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"

const CommentCard = ({ comment, onDelete }) => {
  const [showError, setShowError] = useState(false);

  const handleDelete = async () => {
    const result = await onDelete(comment.id);
    if (result?.error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <>
      {showError && (
        <div className="fixed top-4 right-4 z-50 w-80 animate-in fade-in slide-in-from-top-2 duration-300">
          <Alert 
            variant="destructive" 
            className="border-red-500 bg-red-500 text-white shadow-lg"
          >
            <AlertDescription className="text-sm font-medium">
              You dont have permission to delete this comment
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>{comment.user.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-medium">{comment.user.fullName}</p>
              <span className="text-sm text-gray-500">
                {format(new Date(comment.createdDateTime), 'MMM d, yyyy HH:mm')}
              </span>
            </div>
            <p className="text-gray-600">{comment.content}</p>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              className="rounded-full" 
              variant="ghost"
            >
              <TrashIcon className="h-4 w-4"/>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Comment</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this comment? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}

export default CommentCard;