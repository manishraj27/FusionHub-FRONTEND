import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Code, BookOpen, Users2 } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Spring Boot Backend",
      description: "Built on robust Spring Boot architecture ensuring scalability and performance"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Educational Focus",
      description: "Designed specifically for academic project management and collaboration"
    },
    {
      icon: <Users2 className="h-6 w-6" />,
      title: "Student-Centric",
      description: "Empowering students to manage projects and build portfolios effectively"
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">About FusionHub</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Project Showcase & Collaboration Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive Spring Boot project designed to revolutionize project management 
            in educational institutions, serving both students and administrators.
          </p>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Capabilities List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div>
            <h3 className="text-2xl font-semibold mb-6">Key Capabilities</h3>
            <ul className="space-y-4">
              {[
                "Create and manage personal projects",
                "Invite peers for collaboration",
                "Assign and track tasks",
                "Set project milestones",
                "Share media files securely",
                "Real-time team chat system"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6">Benefits</h3>
            <ul className="space-y-4">
              {[
                "Enhanced project organization",
                "Improved team collaboration",
                "Streamlined communication",
                "Professional portfolio building",
                "Progress tracking and reporting",
                "Skill development opportunities"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
};

export default About;