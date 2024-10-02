import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import CreateProjectForm from "../Project/CreateProjectForm"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PersonIcon } from "@radix-ui/react-icons"


const Navbar = () => {
  return (
    <div className="border-b py-4 px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <p className="cursor-pointer">
                Portfolio & Project Management System
            </p>

            <Dialog>
                <DialogTrigger>
                    <Button variant="ghost">New Project</Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>New Project</DialogHeader>
                    <CreateProjectForm />
                </DialogContent>
            </Dialog>

            <Button variant="ghost">
                Portfolio
            </Button>
        </div>

        <div className="flex gap-3 items-center">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button className="rounded-full border-2 border-gray-500" size="icon" variant="outrline">
                        <PersonIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <p>Manish Raj</p>

        </div>
    </div>
  )
}

export default Navbar