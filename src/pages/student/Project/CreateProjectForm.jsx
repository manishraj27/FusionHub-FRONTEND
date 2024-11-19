import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { tags } from "../ProjectList/ProjectList";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

const CreateProjectForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:2000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create project');
      }

      // Reset form and close dialog
      form.reset();
      // You might want to refresh the projects list or navigate somewhere
      window.location.reload();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagsChange = (newValue) => {
    const currentTags = form.getValues("tags");

    const updatedTags = currentTags.includes(newValue)
      ? currentTags.filter((tag) => tag !== newValue)
      : [...currentTags, newValue];
    form.setValue("tags", updatedTags);
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Project Name..."
                    disabled={isSubmitting}
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
                    placeholder="Project Description..."
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    disabled={isSubmitting}
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullstack">Full Stack</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={(value) => {
                      handleTagsChange(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="flex gap-1 flex-wrap">
                  {field.value.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleTagsChange(item)}
                      className="cursor-pointer flex rounded-full items-center border gap-2 py-1 px-4"
                    >
                      <span className="text-sm ">{item}</span>
                      <Cross1Icon className="w-3 h-3" />
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <DialogClose>
            <Button 
              type="submit" 
              className="w-full mt-5"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;