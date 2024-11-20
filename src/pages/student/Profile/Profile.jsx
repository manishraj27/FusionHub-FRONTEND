import { useState, useEffect } from "react";
import {
  Linkedin,
  Mail,
  MapPin,
  Briefcase,

  
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    university: "",
    company: "",
    aboutMe: "",
    githubLink: "",
    linkedinLink: "",
    twitterLink: "",
    skills: []
  });

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : '';
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (profileData && !profileData.university) {
      setIsEditing(true);
    }
  }, [profileData]);

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:2000/api/self/profile', {
        method: 'GET',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProfileData(data);
      setFormData({
        university: data.university || "",
        company: data.company || "",
        aboutMe: data.aboutMe || "",
        githubLink: data.githubLink || "",
        linkedinLink: data.linkedinLink || "",
        twitterLink: data.twitterLink || "",
        skills: data.skills || []
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to fetch profile data. Please try again later.'
      });
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({
      ...prev,
      skills
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2000/api/self/profile', {
        method: 'PUT',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedProfile = await response.json();
      setProfileData(updatedProfile);
      setIsEditing(false);

      setNotification({
        type: 'success',
        title: 'Success',
        message: 'Your profile has been successfully updated.'
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      setNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'There was a problem updating your profile. Please try again.'
      });
    }
  };

  if (!profileData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      {/* Notification Alert */}
      {notification && (
        <Alert
          variant={notification.type === 'error' ? "destructive" : "default"}
          className="mb-4 fixed top-4 right-4 w-96 z-50 shadow-lg"
        >
          <AlertTitle>{notification.title}</AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
        </Alert>
      )}

      {/* Banner */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {/* Rest of the component remains the same... */}
      {/* Avatar and Name */}
      <div className="relative -mt-32 ml-8 flex items-end mb-8">
        <Avatar className="h-40 w-40 border-4 border-white shadow-lg">
          <AvatarImage src="/api/placeholder/160/160" alt="Profile" />
          <AvatarFallback>{profileData.fullName?.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="ml-6 mb-4">
          <h1 className="text-4xl font-bold">{profileData.fullName}</h1>
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
                  <Label htmlFor="edit-mode" className="text-sm">Edit</Label>
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
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{profileData.university || "Not specified"}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="h-5 w-5 text-gray-500" />
                <span>{profileData.company || "Not specified"}</span>
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-between pt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(profileData.githubLink, '_blank')}
                disabled={!profileData.githubLink}
              >
                <GitHubLogoIcon className="mr-2 h-4 w-4" /> GitHub
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(profileData.linkedinLink, '_blank')}
                disabled={!profileData.linkedinLink}
              >
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(profileData.twitterLink, '_blank')}
                disabled={!profileData.twitterLink}
              >
                <TwitterLogoIcon className="mr-2 h-4 w-4" /> Twitter
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
                {profileData.skills?.map((skill) => (
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
                {profileData.aboutMe || "No information provided yet."}
              </p>
            </CardContent>
          </Card>

          {/* Edit Profile Form */}
          {isEditing && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="university">University</Label>
                      <Input
                        id="university"
                        value={formData.university}
                        onChange={handleInputChange}
                        placeholder="University of Technology"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Tech Co."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="githubLink">GitHub Profile</Label>
                      <Input
                        id="githubLink"
                        value={formData.githubLink}
                        onChange={handleInputChange}
                        placeholder="https://github.com/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedinLink">LinkedIn Profile</Label>
                      <Input
                        id="linkedinLink"
                        value={formData.linkedinLink}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitterLink">Twitter Profile</Label>
                      <Input
                        id="twitterLink"
                        value={formData.twitterLink}
                        onChange={handleInputChange}
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills (comma-separated)</Label>
                      <Input
                        id="skills"
                        value={formData.skills.join(', ')}
                        onChange={handleSkillsChange}
                        placeholder="React, Node.js, Python"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aboutMe">About Me</Label>
                    <textarea
                      id="aboutMe"
                      className="flex w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      value={formData.aboutMe}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;