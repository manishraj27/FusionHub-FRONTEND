import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const CreatePortfolioForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      role: "",
      about: "",
      theme: "light",
      projects: {},
    },
  });

  const onSubmit = (data) => {
    console.log("create portfolio: ", data);
  };

  // Mock projects data (replace with your actual projects)
  const projects = [
    { id: "1", name: "Project 1" },
    { id: "2", name: "Project 2" },
    { id: "3", name: "Project 3" },
    { id: "4", name: "Project 4" },
    { id: "5", name: "Project 5" },
  ];

  return (
    <div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-300 py-2 px-3"
                    placeholder="Your Name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-300 py-2 px-3"
                    placeholder="Your Role..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    className="border w-full border-gray-300 py-2 px-3"
                    placeholder="About you..."
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="light">Classic</SelectItem>
                    <SelectItem value="dark">Modern</SelectItem>
                    <SelectItem value="system">Dark</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Projects to Display</h3>
            {projects.map((project) => (
              <FormField
                key={project.id}
                control={form.control}
                name={`projects.${project.id}`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <Label htmlFor={project.id}>{project.name}</Label>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id={project.id}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>

        <Button type="submit">Create Portfolio</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePortfolioForm;