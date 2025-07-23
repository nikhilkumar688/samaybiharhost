import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import GoogleAuth from "@/components/shared/GoogleAuth";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" }),
  email: z
    .string()
    .min(5, { message: "Email must be at least 5 characters" }) // or use email() for proper validation
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const SignUpForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  //Define a Submit handler
  async function onSubmit(values) {
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/Signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        toast({ title: "Sign up failed! Please try again." });
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        toast({ title: "Sign up Successfull!" });
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);

      setLoading(false);
      toast({ title: "Something went wrong!" });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-6">
      <div className="w-full max-w-5xl flex flex-col md:flex-row md:items-center gap-6">
        {/* Left */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center">
          <Link to={"/"}>
            <img
              src="/logo.svg"
              alt="समय Bihar Logo"
              className="h-12 sm:h-14 w-auto object-contain mb-4"
            />
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold">
            Create a new Account
          </h2>
          <p className="text-[#000a4d] text-sm md:text-base font-medium mt-4 underline">
            Welcome to समय Bihar, Please provide your details
          </p>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Username" {...field} />
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
                      <Input
                        type="text"
                        placeholder="xyz@gmail.com"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-rose-500 w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  <span>Sign Up</span>
                )}
              </Button>
              <GoogleAuth />
            </form>
          </Form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign in
            </Link>
          </div>
          {errorMessage && <p className="mt-5 text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
