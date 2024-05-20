"use client"

import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios';
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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from 'next/navigation'

const APP_URL = process.env.NEXT_PUBLIC_API_URL

const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email format.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

export default function LoginForm() {
    const [errorMessage, setMessage] = useState(null);

    const router = useRouter();

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        const { email, password } = values;
        try {

            const response = await axios.post(APP_URL + '/login', { email, password });
            const { token } = response.data;
            // Save token to local storage
            localStorage.setItem('token', token);
            // Redirect to dashboard page
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Registration failed:', error.response.data.message);
            setMessage(error.response.data.message);
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center p-6">
            <div className="p-3">
                {/* Display the error message if registration fails */}
                {errorMessage && (
                    <Alert className="m-4">
                        <AlertTitle>Info</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
            </div>
            <div className="w-3/6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5 w-full">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="abc@gmail.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your Email
                                    </FormDescription>
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
                                        <Input type="password" placeholder="password" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your Password
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Login</Button>
                    </form>
                </Form>
            </div>

        </div>
    )
}
