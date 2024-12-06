import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

// Validation schema
const issueSchema = z.object({
  title: z.string().min(1, "Issue name is required"),
  description: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]),
  status: z.enum(["pending", "in_progress", "done"]),
  dueDate: z.string().optional()
});

const CreateIssueForm = ({ onIssueCreated }) => {
  const { id: projectId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      status: "pending",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Default to 30 days from now
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:2000/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          projectId: parseInt(projectId)
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create issue");
      }

      const newIssue = await response.json();
      
      toast.success("Issue created successfully");
      
      // Reset form
      form.reset();

      // Call parent component's callback if provided
      if (onIssueCreated) {
        onIssueCreated(newIssue);
      }
    } catch (error) {
      console.error("Error creating issue:", error);
      toast.error("Failed to create issue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Enter Issue Name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Enter Issue Description..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    className="border w-full border-gray-700 py-5 px-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            <Button 
              type="submit" 
              className="w-full mt-5" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Issue"}
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  )
};

export default CreateIssueForm;