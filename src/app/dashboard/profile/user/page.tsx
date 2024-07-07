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
import { fetchUserProfileData, toBase64, submitForm } from '@/app/authStore/userActions';

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
    const [userData, setUserData] = useState({ userStats: [], user: [] });
    const [loading, setLoading] = useState(true);

    // file
    const [file, setFile] = useState(null);
    const [base64, setBase64] = useState(null);

    const form = useForm({
        resolver: zodResolver(formSchema)
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchUserProfileData(token, setUserData, form, setBase64, setLoading);
        }
    }, [form, router]);

    const onFileChange = (e: any) => {
        if (!e.target.files) {
            return null;
        }

        setFile(e.target.files[0]);
        setBase64(base64);
    };

    const onSubmit = async (values: any) => {
        const token = localStorage.getItem('token');
        await submitForm(values, token, file, setBase64);
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
        <div className="flex min-h-screen flex-col items-center p-6">
            <div className="w-full lg:w-1/2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5 w-full" encType="multipart/form-data">
                        <div>
                            <label className="flex flex-col items-center w-auto" htmlFor="avatar-upload">
                                <Avatar className="w-3/6 h-3/6 cursor-pointer">
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

                        <Button type="submit">Make It 🤩</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
