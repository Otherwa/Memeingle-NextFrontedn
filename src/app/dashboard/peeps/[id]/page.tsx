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
import { Button } from '@/components/ui/button';

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
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const { id } = params;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await FetchMessagingUserData(id, setLoading);
                setUserData(data.user);
                setClusterDistribution(data.user.data);
                setPersonality(data.user.data.predicted_personality);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

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

            {/* Main Content Area */}
            <div className='lg:w-1/2 '>
                <Card className="lg:p-12 m-4 border-2 rounded-lg lg:rounded-full lg:h-[24rem] border-l-3 border-r-3 border-dashed border-black cursor-pointer">
                    <CardContent>
                        <CardHeader>
                            <CardTitle className="flex flex-col md:flex-row items-center justify-center md:space-x-6">
                                <Avatar>
                                    <AvatarImage
                                        width={200} // Updated size for larger view
                                        height={200}
                                        src={userData ? `data:image/png;base64,${userData.avatarBase64}` : ''}
                                        alt={userData ? userData.email : 'User Avatar'}
                                        className="object-cover rounded-full h-44 w-44"
                                    />
                                    <AvatarFallback className="text-xl ">
                                        <div className='h-44 w-44 flex flex-col md:flex-row items-center justify-center'>

                                            {userData ? getAvatarInitials(userData.email) : ''}
                                        </div>
                                    </AvatarFallback>
                                </Avatar>
                                {userData && (
                                    <p className="text-center md:text-left text-red-600 text-lg md:text-xl font-bold mt-4 md:mt-0">
                                        {userData.email}
                                    </p>
                                )}
                            </CardTitle>
                        </CardHeader>
                    </CardContent>

                </Card>
                <div className="lg:p-16 p-4 m-4 border-2 rounded-lg lg:rounded-full border-l-3 border-r-3 border-solid border-black cursor-pointer">
                    {userData && (
                        <>
                            <h1 className="mb-4">Predicted Personality: <b>{personality}</b></h1>
                            <p onClick={() => setIsModalOpen(true)}><b><u>Click here to know more...</u></b></p>
                            <br />
                            <p className='text-sm'><strong className="text-black">Bio:</strong>  {userData.details.bio}</p>
                            <p className='text-sm'><strong className="text-black">Gender:</strong>  {userData.details.gender}</p>
                            <p className='text-sm'><strong className="text-black">Hobbies:</strong>  {userData.details.hobbies}</p>
                            <p className='text-sm'><strong className="text-black">Memes Liked:</strong> {userData.likedmemes}</p>
                            <p className='text-sm'><strong className="text-black">Humor Quotient:</strong>  {userData.details.hobbies}</p>
                        </>
                    )}
                </div>
            </div>

            {/* Chat Component */}
            <div className='lg:w-1/2 m-4'>
                <Chat userId={id} />
            </div>

            {/* Modal Overlay */}
            {
                isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 relative w-[20rem] lg:w-[45rem]">
                            <h2 className="text-lg font-bold mb-2">Personality Distribution</h2>
                            <h1 className="mb-4">Predicted Personality: <b>{personality}</b></h1>
                            {clusterDistribution && (
                                <div className="h-[20rem]">
                                    <Doughnut data={doughnutData} options={chartOptions} />
                                </div>
                            )}
                            <Button onClick={() => setIsModalOpen(false)} className="mt-4">Close</Button>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
