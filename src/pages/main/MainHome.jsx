import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, GitPullRequest, Users,  MessageCircle, Calendar, FileImage, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainHome = () => {
  const navigate = useNavigate();
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // const stats = [
  //   { label: "Active Projects", value: "1000+" },
  //   { label: "Team Members", value: "5000+" },
  //   { label: "Universities", value: "50+" },
  //   { label: "Success Rate", value: "95%" },
  // ];

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-background to-background/50 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* Top Badge */}
        <motion.div 
          className="flex justify-center mb-8"
          {...fadeIn}
        >
          <Badge variant="outline" className="py-2 px-4 gap-2 text-base bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all cursor-pointer">
            <Sparkles className="h-4 w-4" />
            Spring Boot Powered Platform
            <ArrowRight className="h-4 w-4" />
          </Badge>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
            FusionHub
          </h1>
          <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-3xl mx-auto">
            Project & Portfolio Management System
          </p>
          <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Empower your educational journey with our comprehensive project management solution
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button size="lg" className="gap-2" onClick={() => navigate("/student-auth")}>
            Start Your Project
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2" onClick={() => navigate("/about")}>
            Explore Features
            <Sparkles className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Stats Section */}
        {/* <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-background/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div> */}

        {/* Feature Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="bg-background/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all">
            <CardContent className="pt-6 text-center">
              <GitPullRequest className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-lg font-semibold mb-2">Project Management</h3>
              <p className="text-muted-foreground">Create, track, and manage projects with intuitive tools</p>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all">
            <CardContent className="pt-6 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-lg font-semibold mb-2">Real-time Chat</h3>
              <p className="text-muted-foreground">Stay connected with your team through built-in messaging</p>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all">
            <CardContent className="pt-6 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-semibold mb-2">Milestone Tracking</h3>
              <p className="text-muted-foreground">Set and monitor project milestones effortlessly</p>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all">
            <CardContent className="pt-6 text-center">
              <FileImage className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-lg font-semibold mb-2">Media Sharing</h3>
              <p className="text-muted-foreground">Share and manage project files seamlessly</p>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all">
            <CardContent className="pt-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
              <p className="text-muted-foreground">Invite peers and assign tasks efficiently</p>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all">
            <CardContent className="pt-6 text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-orange-500" />
              <h3 className="text-lg font-semibold mb-2">Portfolio Showcase</h3>
              <p className="text-muted-foreground">Build and share your professional portfolio</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default MainHome;