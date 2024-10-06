'use client';

import { FetchMessagingUserData, getAvatarInitials, useCheckAuth } from '@/app/authStore/userActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { useState, useEffect } from 'react';
import Chat from '../component/Chat';
import { Badge } from '@/components/ui/badge';
import { Doughnut } from 'react-chartjs-2'; // Import Doughnut chart from react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Params {
    id: string;
}

interface UserData {
    _id: string;
    email: string;
    avatar: string;
    avatarBase64: string;
    likedmemes: number;
    details: {
        liked: string[];
        hobbies: string;
        gender: string;
        bio: string;
    };
    similarityScore: string;
    createdAt: string;
}

interface ClusterDistribution {
    [key: string]: number;
}

export default function UserPeep({ params }: { params: Params }) {
    useCheckAuth();
    const [loading, setLoading] = useState(true);
    const [personality, setPersonality] = useState(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [clusterDistribution, setClusterDistribution] = useState<ClusterDistribution | null>(null);
    const { id } = params;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await FetchMessagingUserData(id, setLoading);
                setUserData(data.user);
                setClusterDistribution(data.user.data);
                setPersonality(data.user.data.predicted_personality);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading || !userData) {
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

    // Prepare data for the Doughnut chart
    const doughnutData: ChartData<'doughnut'> = {
        labels: clusterDistribution ? Object.keys(clusterDistribution) : [],
        datasets: [
            {
                label: 'Personality Types',
                data: clusterDistribution ? Object.values(clusterDistribution) : [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Chart options for the Doughnut chart
    const chartOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.raw !== null) {
                            label += context.raw;
                        }
                        return label;
                    },
                },
            },
        },
    };

    return (
        <div className="flex lg:flex-row flex-col justify-between">
            <div className='m-4 lg:w-1/2'>
                <Card className="p-4 hover:bg-gray-200 transition-colors duration-200 ease-in-out">
                    <CardHeader className="card-header">
                        <CardTitle>
                            <p className="text-red-600 text-xl font-bold tracking-tight space-x-4">{userData.email}</p>
                            <br />
                            <Avatar>
                                <AvatarImage
                                    width={20}
                                    src={`data:image/png;base64,${userData.avatarBase64}`}
                                    alt={userData.email}
                                    className="object-cover h-[4rem] w-[4rem] rounded-full"
                                />
                                <AvatarFallback>{getAvatarInitials(userData.email)}</AvatarFallback>
                            </Avatar>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="card-body">
                        <CardDescription>
                            <p className='text-sm' ><strong className="text-black">Bio :</strong>&nbsp;<Badge variant="secondary"> {userData.details.bio}</Badge></p>
                            <br />
                            <p className='text-sm'><strong className="text-black">Gender :</strong>&nbsp;<Badge variant="secondary"> {userData.details.gender}</Badge></p>
                            <br />
                            <p className='text-sm'><strong className="text-black">Hobbies :</strong>&nbsp;<Badge variant="secondary"> {userData.details.hobbies}</Badge></p>
                            <br />
                            <p className='text-sm'><strong className="text-black">Memes Liked :</strong>&nbsp;<Badge variant="secondary">{userData.likedmemes}</Badge></p>
                            <br />
                            <p className='text-sm'><strong className="text-black">Humor Quotient:</strong>&nbsp;<Badge variant="secondary"> {userData.details.hobbies}</Badge></p>
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>

            <div className='m-4 lg:w-1/2'>
                <Chat userId={id} />
            </div>

            <div className='m-4 lg:w-1/2'>
                {clusterDistribution && (
                    <div className="p-4">
                        <h2 className="text-lg font-bold">Distribution</h2>
                        <h1>Predicted Personality : <b>{personality}</b></h1>
                        <div>
                            <Doughnut className='h-1/2 m-2' data={doughnutData} options={chartOptions} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
