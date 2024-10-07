import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"


const InviteUserForm = () => {
    const form = useForm({
        defaultValues: {
           email: "",
        }
    })

    const onSubmit = (data) => {
        console.log("invite user: ", data)
    }

  return (
    <div>
          <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Enter Email to Invite Your Friend..."
                  />
                </FormControl>
              </FormItem>
            )}
          />

    
          <DialogClose>
              <Button type="submit" className="w-full mt-5">
                Invite User
                </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default InviteUserForm