"use client"


import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Skeleton } from '@/components/ui/skeleton';
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserData {
    userStats: any;
    user: any;
}

const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email format.",
    }),
    hobbies: z.string(),
    bio: z.string(),
    gender: z.string().optional(),
    avatar: z.any().optional()
});



export default function ProfileUser() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData>({ userStats: [], user: [] });
    const [loading, setLoading] = useState(true);

    // file
    // State to store the file
    const [file, setFile] = useState<File | null>(null);
    // State to store the base64
    const [base64, setBase64] = useState<string | null>(null);

    const APP_URL = "https://memeingle-backend.onrender.com/api/";

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    useEffect(() => {
        const fetchUserData = async (token: string) => {
            try {
                const response = await axios.get(APP_URL + 'user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data;
                console.log(data);
                setUserData(data);

                // set form data
                form.setValue('email', data.user.email);
                form.setValue('hobbies', data.user.hobbies);
                form.setValue('bio', data.user.bio);
                form.setValue('gender', data.user.gender);
                setBase64(data.user.avatar as string);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchUserData(token);
        }
    }, [form, router]);

    // When the file is selected, set the file state
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return null;
        }

        setFile(e.target.files[0]);
        setBase64(base64 as string);
    };

    const toBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const token = localStorage.getItem('token');
            let base64 = null;
            let data = null;

            if (file) {
                base64 = await toBase64(file);
                setBase64(base64 as string);
                data = {
                    ...values,
                    avatar: base64
                }
            } else {
                data = {
                    ...values,
                }
            }

            const response = await axios.post(
                APP_URL + 'user',
                {
                    "data": data
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log(response)
        } catch (error: any) {
            console.error('Login failed:', error);
            // Set error message here and display it to the user
        }
    }

    if (loading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        );
    }


    return (
        <div className="flex min-h-screen flex-col items-center p-6">
            <div className="p-3">
                {/* Display the error message if login fails */}
            </div>
            <div className="w-full lg:w-1/2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5 w-full" encType="multipart/form-data">
                        <div className="flex flex-col items-center">
                            <Avatar className="w-3/6 h-3/6">
                                <AvatarImage src={base64 ? base64 : ""} className="object-cover" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <FormField
                            name="avatar"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profile Photo</FormLabel>
                                    <FormControl>
                                        <Input type="file" accept="image/*" {...field} onChange={(e) => onFileChange(e)} />
                                    </FormControl>
                                    <FormDescription>
                                        Upload your profile photo/avatar
                                    </FormDescription>
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
                            name="hobbies"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hobbies</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Hobbies" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your Hobbies
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Bio" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your Bio
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <Select onValueChange={field.onChange} {...field}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Your Gender
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Login</Button>
                    </form>
                </Form>

            </div>
        </div >
    );
}
