
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';

const loginFormSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })

export default function LoginPage() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const router = useRouter();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
          email: "",
          password: ""
        },
      })

    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        setIsLoggingIn(true);
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            toast({
                title: "Login successful!",
              })
            router.push('/');
        } catch (error:any) {
            toast({
                variant: "destructive",
                title: "Failed to login.",
                description: error.message
              })
        } finally {
            setIsLoggingIn(false);
        }
    }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Login</h1>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
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
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging In..." : "Login"}
        </Button>
        <p className="text-sm text-muted-foreground">
            Don't have an account? <Link href="/auth/register" className="text-primary">Register</Link>
        </p>
      </form>
    </Form>
    </div>
  );
}
