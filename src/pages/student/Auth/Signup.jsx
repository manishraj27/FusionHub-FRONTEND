import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import apiconfig from './../../../configurations/APIConfig';


const Signup = ({ onLogin }) => {
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  // Define the Zod schema for validation
  const signupSchema = z.object({
    fullName: z.string().nonempty("Full name is required").min(3, "Full name must be at least 3 characters"),
    email: z.string().nonempty("Email is required").email("Enter a valid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
  });

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });


  const onSubmit = async (data) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      //console.log(data); // Debugging
      const response = await axios.post(
        `${apiconfig.fusionhub_api}/api/auth/signup`,
        {
          email: data.email,
          password: data.password, // Ensure this value is not empty or null
          fullName: data.fullName,
        },
        config
      );

      if (response.data && response.data.jwt) {
        localStorage.setItem("authToken", response.data.jwt);
        navigate("/student-auth");
        setAlertMessage("Account created");
        form.reset();
        setTimeout(() => {
          setAlertMessage('');
        }, 2000);

      }
    } catch (error) {
      if (error.response?.data?.message?.includes("email already exist")) {
        form.setError("email", {
          type: "manual",
          message: "This email is already registered",
        });
      } else {
        form.setError("root", {
          type: "manual",
          message:
            "Registration failed. Please try again.",
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      {form.formState.errors.root && (
        <Alert variant="destructive">
          <AlertDescription>
            {form.formState.errors.root.message}
          </AlertDescription>
        </Alert>
      )}


      <Form {...form}>
        {alertMessage && (
          <Alert className="mb-4 bg-green-50 text-green-700 border-green-200 shadow-lg">
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        )}
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      {...field}
                      type="text"
                      placeholder="Shahrukh Khan"
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      {...field}
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Creating account..."
              : "Create account"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
