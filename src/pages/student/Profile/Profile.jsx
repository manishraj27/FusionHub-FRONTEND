import { useState } from "react";
import {
  Camera,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  Briefcase,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      {/* Banner */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {/* Avatar and Name */}
      <div className="relative -mt-32 ml-8 flex items-end mb-8">
        <Avatar className="h-40 w-40 border-4 border-white shadow-lg">
          <AvatarImage src="/api/placeholder/160/160" alt="Profile" />
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        <div className="ml-6 mb-4">
          <h1 className="text-4xl font-bold ">Manish Raj</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:w-1/3 space-y-6">
          {/* Profile Information */}
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold">Profile</CardTitle>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="edit-mode" className="text-sm">
                    Edit
                  </Label>
                  <Switch
                    id="edit-mode"
                    checked={isEditing}
                    onCheckedChange={setIsEditing}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>University of Technology</span>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="h-5 w-5 text-gray-500" />
                <span>Software Engineer at Tech Co.</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span>Joined January 2022</span>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between pt-6">
              <Button variant="outline" size="sm">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
              <Button variant="outline" size="sm">
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="mr-2 h-4 w-4" /> Twitter
              </Button>
            </CardFooter>
          </Card>

          {/* Skills */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Node.js",
                  "TypeScript",
                  "Python",
                  "GraphQL",
                  "Docker",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:w-2/3 space-y-6">
          {/* About Me */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Passionate full-stack developer with 5+ years of experience
                building scalable web applications. Committed to writing clean,
                maintainable code and constantly learning new technologies.
                Enjoy collaborating with cross-functional teams to deliver
                high-quality software solutions.
              </p>
            </CardContent>
          </Card>

              {/* for clause.ai leave this  */}
          {/* Projects */}
          {/* <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  {
                    name: "E-commerce Platform",
                    desc: "Built a full-stack e-commerce solution using MERN stack",
                  },
                  {
                    name: "Task Management App",
                    desc: "Developed a React Native mobile app for task management",
                  },
                  {
                    name: "Data Visualization Dashboard",
                    desc: "Created an interactive dashboard using D3.js and React",
                  },
                ].map((project, index) => (
                  <li
                    key={index}
                    className="border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <p className="text-gray-600">{project.desc}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card> */}

          {/* Edit Profile Form */}
          {isEditing && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Edit Profile
                </CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="university">University</Label>
                      <Input
                        id="university"
                        placeholder="University of Technology"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Tech Co." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="about">About Me</Label>
                    <textarea
                      id="about"
                      className="w-full min-h-[100px] p-2 border rounded-md"
                      placeholder="Tell us about yourself"
                    ></textarea>
                  </div>
                  {/*take input for  ...skil and profiles... also */}



                  {/* for clause.ai leave this  */}
                  {/* <div className="space-y-2">
                    <Label htmlFor="photo">Profile Photo</Label>
                    <div className="flex items-center space-x-2">
                      <Button type="button" variant="outline">
                        <Camera className="mr-2 h-4 w-4" /> Upload Photo
                      </Button>
                      <span className="text-sm text-gray-500">
                        No file chosen
                      </span>
                    </div>
                  </div> */}
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Changes</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
