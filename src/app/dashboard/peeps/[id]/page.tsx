'use client';

import { FetchMessagingUserData, getAvatarInitials, useCheckAuth } from '@/app/authStore/userActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { useState, useEffect } from 'react';
import Chat from '../component/Chat';
import { Badge } from '@/components/ui/badge';
import { Doughnut } from 'react-chartjs-2';
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
    const [error, setError] = useState<string | null>(null);
    const [personality, setPersonality] = useState(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [clusterDistribution, setClusterDistribution] = useState<ClusterDistribution | null>(null);
    const { id } = params;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state
            try {
                const data = await FetchMessagingUserData(id, setLoading);
                setUserData(data.user);
                setClusterDistribution(data.user.data);
                setPersonality(data.user.data.predicted_personality);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data. Please try again later.'); // Set error message
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center flex-col space-y-4 gap-4">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <p className="text-red-600">{error}</p>
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
        maintainAspectRatio: false,
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
        <div className="flex flex-col lg:flex-row justify-between m-4">
            {/* Combined Profile Card and Chart */}
            <div className='lg:w-1/2'>
                <Card className="p-4 m-4  hover:bg-gray-200 transition-colors duration-200 ease-in-out border-2 rounded-lg border-l-3 border-r-3 border-dashed border-black">
                    <CardContent>
                        <h2 className="text-lg font-bold mb-2">Distribution</h2>
                        <h1 className="mb-4">Predicted Personality: <b>{personality}</b></h1>
                        {clusterDistribution && (
                            <div className="h-[20rem]"> {/* Adjusted for responsiveness */}
                                <Doughnut data={doughnutData} options={chartOptions} />
                            </div>
                        )}
                    </CardContent>
                </Card>
                <Card className="p-4 m-4 hover:bg-gray-200 transition-colors duration-200 ease-in-out border-2 rounded-lg border-l-3 border-r-3 border-dashed border-black">
                    <CardHeader className="card-header">
                        <CardTitle className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage
                                    width={40}
                                    height={40}
                                    src={userData ? `data:image/png;base64,${userData.avatarBase64}` : ''}
                                    alt={userData ? userData.email : 'User Avatar'}
                                    className="object-cover rounded-full"
                                />
                                <AvatarFallback>{userData ? getAvatarInitials(userData.email) : ''}</AvatarFallback>
                            </Avatar>
                            {userData && <p className="text-red-600 text-lg font-bold">{userData.email}</p>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="card-body">
                        <CardDescription>
                            {userData && (
                                <>
                                    <p className='text-sm'><strong className="text-black">Bio:</strong> <Badge variant="secondary"> {userData.details.bio}</Badge></p>
                                    <p className='text-sm'><strong className="text-black">Gender:</strong> <Badge variant="secondary"> {userData.details.gender}</Badge></p>
                                    <p className='text-sm'><strong className="text-black">Hobbies:</strong> <Badge variant="secondary"> {userData.details.hobbies}</Badge></p>
                                    <p className='text-sm'><strong className="text-black">Memes Liked:</strong> <Badge variant="secondary">{userData.likedmemes}</Badge></p>
                                    <p className='text-sm'><strong className="text-black">Humor Quotient:</strong> <Badge variant="secondary"> {userData.details.hobbies}</Badge></p>
                                </>
                            )}
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
            {/* Chat Component */}
            <div className='lg:w-1/2 m-4'>
                <Chat userId={id} />
            </div>
        </div>
    );
}
