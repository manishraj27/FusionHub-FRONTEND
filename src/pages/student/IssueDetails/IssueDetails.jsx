import { useParams } from "react-router-dom"


const IssueDetails = () => {
    const  {projectId, issueId} = useParams()

  return (
    <div>
        projectId: {projectId},
        issueId: {issueId}
    </div>
  )
}

export default IssueDetails