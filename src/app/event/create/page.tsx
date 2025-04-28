
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
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { auth, db, storage } from '@/lib/firebase';
import { Timestamp, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EventCreateFormSchema = z.object({
    name: z.string().min(2, {
      message: "Event name must be at least 2 characters.",
    }),
    location: z.string().min(2, {
      message: "Location must be at least 2 characters.",
    }),
    dateTime: z.date({
      required_error: "A date of event is required.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    image: z.any()
  })

export default function EventCreatePage() {
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();
    const { toast } = useToast()

    const form = useForm<z.infer<typeof EventCreateFormSchema>>({
        resolver: zodResolver(EventCreateFormSchema),
        defaultValues: {
          name: "",
          location: "",
          dateTime: new Date(),
          description: "",
          image: null
        },
      })

    async function onSubmit(values: z.infer<typeof EventCreateFormSchema>) {
        setIsUploading(true);
        try {
            const user = auth.currentUser;
            if (!user) {
                toast({
                    variant: "destructive",
                    title: "You must be logged in to create an event.",
                  })
                return;
            }

            if (!values.image) {
                toast({
                    variant: "destructive",
                    title: "You must select an image.",
                  })
                return;
            }

            const imageRef = ref(storage, `events/${user.uid}/${values.image.name}`);
            const snapshot = await uploadBytes(imageRef, values.image);
            const imageUrl = await getDownloadURL(snapshot.ref);

            const eventsCollection = collection(db, 'events');
            await addDoc(eventsCollection, {
                name: values.name,
                location: values.location,
                dateTime: Timestamp.fromDate(values.dateTime),
                description: values.description,
                imageUrl: imageUrl,
                createdBy: user.uid,
                createdAt: serverTimestamp()
            });

            toast({
                title: "Event created successfully!",
              })
            router.push('/');
        } catch (error:any) {
            toast({
                variant: "destructive",
                title: "Failed to create event.",
                description: error.message
              })
        } finally {
            setIsUploading(false);
        }
    }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Create Event</h1>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Event Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date and Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP p")
                      ) : (
                        <span>Pick a date and time</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select date and time for event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write description here."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe your event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files) {
                            field.onChange(e.target.files[0]);
                        }
                    }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isUploading}>
          {isUploading ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </Form>
    </div>
  );
}
