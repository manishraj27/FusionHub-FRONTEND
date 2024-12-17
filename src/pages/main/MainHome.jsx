import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, GitPullRequest, Users, MessageCircle, Calendar, FileImage, Award, Info, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const MainHome = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  
  useEffect(() => {
    // Show notification after a short delay
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-background to-background/50 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse" />
      </div>

      {/* Popup Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 max-w-md"
          >
            <Alert className="bg-background/95 backdrop-blur-sm border-blue-200 dark:border-blue-800 shadow-lg">
              <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
              <AlertDescription className="text-sm text-muted-foreground flex-grow pr-8">
                This platform uses multiple microservices hosted on a free deployment platform. Initial requests may take up to 50 seconds as services wake from idle state.
                <br />
                <span className="block mt-2 text-xs text-muted-foreground/80">Please be patient and avoid refreshing the page.</span>
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 p-0 h-4 w-4 hover:bg-transparent"
                onClick={() => setShowNotification(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

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