
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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Link from 'next/link';

const registerFormSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })

export default function RegisterPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const router = useRouter();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
          name: "",
          email: "",
          password: ""
        },
      })

    async function onSubmit(values: z.infer<typeof registerFormSchema>) {
        setIsRegistering(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            await updateProfile(userCredential.user, {
                displayName: values.name
            });
            toast({
                title: "Registration successful!",
              })
            router.push('/');
        } catch (error:any) {
            toast({
                variant: "destructive",
                title: "Failed to register.",
                description: error.message
              })
        } finally {
            setIsRegistering(false);
        }
    }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Register</h1>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
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
        <Button type="submit" disabled={isRegistering}>
          {isRegistering ? "Registering..." : "Register"}
        </Button>
        <p className="text-sm text-muted-foreground">
            Already have an account? <Link href="/auth/login" className="text-primary">Login</Link>
        </p>
      </form>
    </Form>
    </div>
  );
}
