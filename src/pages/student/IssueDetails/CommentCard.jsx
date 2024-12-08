import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { format } from 'date-fns'

const CommentCard = ({ comment, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      onDelete(comment.id);
    }
  };

  return (
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

      <Button 
        className="rounded-full" 
        variant="ghost"
        onClick={handleDelete}
      >
        <TrashIcon className="h-4 w-4"/>
      </Button>
    </div>
  )
}

export default CommentCard;