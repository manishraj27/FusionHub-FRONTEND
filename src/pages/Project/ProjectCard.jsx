import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"


const ProjectCard = () => {
    const navigate = useNavigate()

  return <Card className="p-5 w-full lg:max-w-3xl">
    <div className="space-y-5">
        <div className="space-y-2">
            <div className="flex justify-between">
                <div className="flex items-center gap-5">
                    <h1 onClick={()=>navigate("/project/3")} className="cursor-pointer font-bold text-lg">
                        Create Music Streaming App
                    </h1>
                    <DotFilledIcon/>
                    <p className="text-sm text-gray-400">fullstack</p>
                </div>

                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button className="rounded-full" variant="ghost" size="icon">
                                <DotsVerticalIcon/>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                Update
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>                 
                    </DropdownMenu>
                </div>
            </div>

            <p className="text-gray-500 text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </p>

        </div>


        <div className="flex flex-wrap gap-2 items-center">
            {
                [1,1,1].map((item)=><Badge key={item} variant="outline" >{"frontend"}</Badge>)
            }
        </div>
    </div>
   </Card>
}

export default ProjectCard