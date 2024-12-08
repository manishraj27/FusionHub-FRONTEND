import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import apiconfig from './../../../configurations/APIConfig';

export const CreateCommentForm = ({ issueId, onCommentCreated, currentUser }) => {
  const form = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiconfig.fusionhub_api}/api/comments`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: data.content,
          issueId: issueId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }

      const newComment = await response.json();
      onCommentCreated(newComment);
      form.reset();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <div className="flex gap-2">
                  <div>
                    <Avatar>
                      <AvatarFallback>
                        {currentUser?.fullName?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="flex-1"
                      placeholder="Add a comment..."
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};