"use client";

import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Skeleton } from '@/components/ui/skeleton';
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
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchUserProfileData, submitForm } from '@/app/authStore/userActions';

// Define the form schema using Zod
const formSchema = z.object({
    email: z.string().email({ message: "Invalid email format." }),
    hobbies: z.string(),
    bio: z.string(),
    gender: z.string().optional(),
    avatar: z.any().optional()
});

// ProfileUser component definition
export default function ProfileUser() {
    const router = useRouter();
    const [userData, setUserData] = useState({ userStats: [], user: [] });
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [base64, setBase64] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility
    const form = useForm({
        resolver: zodResolver(formSchema)
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login'); // Redirect to login if token is not available
        } else {
            fetchUserProfileData(token, setUserData, form, setBase64, setLoading); // Fetch user data
        }
    }, [form, router]);

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64(reader.result as string); // Convert the file to base64
        };
        reader.readAsDataURL(selectedFile);
    };

    const onSubmit = async (values: any) => {
        await submitForm(values, file); // Handle form submission
        setShowPopup(true); // Show the popup on successful submission
        setTimeout(() => setShowPopup(false), 3000); // Auto-hide the popup after 3 seconds
    };

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center flex-col space-y-4 gap-4">
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center p-2">
            {showPopup && (
                <div>
                    <code className='m-3'>
                        Profile updated ! 😭✨🎀
                    </code>
                </div>
            )}
            <div className="w-full p-2">
                {/* Popup Notification */}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 w-full" encType="multipart/form-data">
                        <div>
                            <label className="flex flex-col items-center w-auto" htmlFor="avatar-upload">
                                <Avatar className="w-[12rem] h-[12rem] cursor-pointer">
                                    <AvatarImage src={base64 ? base64 : ""} className="object-cover" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </label>
                            <FormField
                                name="avatar"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                id="avatar-upload"
                                                type="file"
                                                accept="image/*"
                                                {...field}
                                                onChange={(e) => onFileChange(e)}
                                                style={{ display: 'none' }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
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
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>

        </div>
    );
}
