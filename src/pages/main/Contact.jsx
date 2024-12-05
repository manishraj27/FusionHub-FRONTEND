import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  // Initialize form using react-hook-form
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Submit handler
  const onSubmit = (data) => {
    console.log("Form Data:", data); // Replace with actual API call
    alert("Message sent successfully!");
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-background to-background/50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Contact Form */}
        <div>
          <h2 className="text-4xl font-bold mb-6">Contact</h2>
          <Card className="bg-background/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Field */}
                <FormField
                  name="name"
                  control={form.control}
                  rules={{ required: "Name is required" }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your name" />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  name="email"
                  control={form.control}
                  type="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your email" />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                {/* Message Field */}
                <FormField
                  name="message"
                  control={form.control}
                  rules={{ required: "Message cannot be empty" }}
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Write your message here" rows={6} />
                      </FormControl>
                      <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </Form>
          </Card>
        </div>

        {/* Right Side: Contact Details */}
        {/* <div className="space-y-6">
          <Card className="bg-background/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 p-6">
            <CardContent className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-purple-500" />
              <div>
                <h4 className="font-semibold">Email Us</h4>
                <p className="text-muted-foreground">support@fusionhub.com</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 p-6">
            <CardContent className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-blue-500" />
              <div>
                <h4 className="font-semibold">Call Us</h4>
                <p className="text-muted-foreground">+1 (123) 456-7890</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 p-6">
            <CardContent className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-green-500" />
              <div>
                <h4 className="font-semibold">Visit Us</h4>
                <p className="text-muted-foreground">123 FusionHub Street, Tech City</p>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </section>
  );
};

export default Contact;
