import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { fetchUserData, GetInitialMessages } from '@/app/authStore/userActions';
import { Badge } from '@/components/ui/badge';

interface ChatProps {
    userId: string;
}

interface UserData {
    user: {
        _id: string;
    } | null;
    userStats: any; // Update with appropriate type
}

interface Message {
    id: string;
    message: string;
    sender: string;
    recipient: string;
    timestamp: number; // Use number for timestamp
}

const APP_URL_SOCKET = process.env.NEXT_PUBLIC_PUBLICAPI_KEY_SOCKET ?? '';

console.log(APP_URL_SOCKET);

const socket = io(APP_URL_SOCKET, {
    transports: ['websocket'],
});

const Chat: React.FC<ChatProps> = ({ userId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [user, setUser] = useState<UserData>({ user: null, userStats: null });
    const [loading, setLoading] = useState(true);
    const [onlineStatus, setOnlineStatus] = useState<Record<string, boolean>>({});
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch user data and register user
    useEffect(() => {
        const initialize = async () => {
            await fetchUserData(setUser, setLoading);
            if (user.user?._id) {
                socket.emit('register', user.user._id);
                console.log(`Registered ${user.user._id} with socket ID ${socket.id}`);
            }

            // Fetch initial messages
            if (user.user?._id) {
                const initialMessages = await GetInitialMessages(user.user._id, userId);
                setMessages(initialMessages);
                localStorage.setItem(`messages-${userId}`, JSON.stringify(initialMessages));
            }
        };

        initialize();

        // Clean up socket on unmount
        return () => {
            if (user.user?._id) {
                socket.emit('deregister', user.user._id); // Notify server of disconnection
            }
            socket.off('register');
            socket.off('user_status');
            socket.off('new_message');
            // socket.disconnect(); // Disconnect socket when the component unmounts
        };
    }, [user.user?._id, userId]);

    // Listen for user status updates
    useEffect(() => {
        socket.on('user_status', (data) => {
            console.log(data)
            setOnlineStatus((prevStatus) => ({
                ...prevStatus,
                [data.username]: data.status === 'online'
            }));
        });


    }, [messages, onlineStatus, setOnlineStatus]);

    // Load messages from local storage
    useEffect(() => {
        const cachedMessages = localStorage.getItem(`messages-${userId}`);
        if (cachedMessages) {
            setMessages(JSON.parse(cachedMessages));
        }
    }, [userId]);

    // Fetch and scroll to bottom
    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages]);

    // Handle receiving messages via Socket.IO
    useEffect(() => {
        const handleMessage = (message: Message) => {
            console.log(message)
            console.log(`Received message: ${message.message}`);
            console.log(user.user?._id)
            console.log(message.sender)
            if (
                (message.sender === userId && message.recipient === user.user?._id) ||
                (message.sender == user.user?._id && message.recipient == userId)
            ) {

                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages, message];
                    localStorage.setItem(`messages-${userId}`, JSON.stringify(updatedMessages));
                    return updatedMessages;
                });
            }
            scrollToBottom();
        };

        socket.on('new_message', handleMessage);

        return () => {
            socket.off('new_message', handleMessage);
        };
    }, [userId, user.user?._id]);

    // Handle sending a new message
    const sendMessage = () => {
        if (!newMessage.trim() || !userId || !user.user?._id) return;

        const messageData: Message = {
            id: Date.now().toString(),
            message: newMessage,
            sender: user.user._id,
            recipient: userId,
            timestamp: Date.now()
        };

        console.log(`Sending message: ${newMessage}`);
        socket.emit('private_message', messageData);
        setNewMessage('');
    };

    // Function to format timestamp
    const formatTimestamp = (timestamp: number): string => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    // Scroll to the bottom of the messages container
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Determine status color
    const statusColor = (status: boolean) => (status ? 'text-green-500' : 'text-red-500');

    return (
        <div className=' border-2 rounded-lg border-l-3 border-r-3 border-dashed border-black h-full'>
            {loading ? (
                <div className="flex h-[36rem] w-full items-center justify-center flex-col space-y-4 gap-4">
                    <div className="flex  justify-center flex-col space-y-3">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        <div className='m-4'>
                            <div>Recipient Status: &nbsp;
                                <Badge variant='secondary' className={statusColor(onlineStatus[userId])}>
                                    {userId ? (onlineStatus[userId] ? "Online" : "Offline") : "Unknown"}
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <div className="chat-messages m-3 h-[30rem] overflow-y-scroll" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                                {messages.map((message) => (
                                    <div key={message.id} className={`message ${message.sender === user.user?._id ? 'sent' : 'received'}`}>
                                        <div>
                                            <p className='text-sm'>{message.message}</p>
                                            <span className="text-xs">{formatTimestamp(message.timestamp)}</span>
                                            <br />
                                            <span className="text-xs">{message.sender === user.user?._id ? 'You' : 'Sender'}</span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='m-3'>
                            <div className="m-3">
                                <Textarea
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                />
                            </div>
                            <div className="flex items-stretch">
                                <Button className='m-2 w-full' onClick={sendMessage}>Send</Button>
                            </div>
                        </div>
                    </div>
                </>
            )}


        </div>
    );
};

export default Chat;
