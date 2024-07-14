import React, { useEffect, useState, useRef } from 'react';
import { fetchMessages, fetchUserData, handleSendMessage } from '@/app/authStore/userActions';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatProps {
    userId: string;
}

interface UserData {
    user: any;
    userStats: any;
}

interface Message {
    id: string;
    text: string;
    senderId: string;
    timestamp: any;
}

const Chat: React.FC<ChatProps> = ({ userId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [user, setUser] = useState<UserData>({ user: null, userStats: null });
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch user data on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchUserData(setUser, setLoading);
            setLoading(false);
        };

        fetchData();
    }, []);

    // Fetch messages initially and on userId or user updates
    useEffect(() => {
        const fetchInitialMessages = async () => {
            if (userId && user.user?._id) {
                await fetchMessages(setMessages, setLoading, userId, user);
                scrollToBottom();
            }
        };

        fetchInitialMessages();
    }, [userId, user]);

    // Function to fetch messages periodically
    useEffect(() => {
        const interval = setInterval(() => {
            if (userId && user.user?._id) {
                fetchMessages(setMessages, false, userId, user);
            }
        }, 5 * 60 * 1000); // Fetch messages every 5 minutes

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [userId, user]);

    // Handle sending a new message
    const sendMessage = async () => {
        if (!newMessage.trim() || !userId || !user.user?._id) return;

        await handleSendMessage(newMessage, setNewMessage, setMessages, userId, user);

        // After sending message, fetch updated messages
        fetchMessages(setMessages, setLoading, userId, user);
    };

    // Function to format timestamp
    const formatTimestamp = (timestamp: any): string => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Adjust format as needed
    };

    // Scroll to the bottom of the messages container
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };



    return (
        <div className='p-3'>
            {loading ? (
                <div className="flex m-3 h-96 w-full items-center justify-center flex-col space-y-4 gap-4">
                    <div className="flex flex-col">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <Button className="mb-4" variant="default" onClick={() => fetchMessages(setMessages, setLoading, userId, user)}>🔃</Button>
                    <div className="chat-messages m-3 h-96 overflow-y-scroll">
                        {messages.map((message) => (
                            <div key={message.id} className={`message ${message.senderId === user.user?._id ? 'sent' : 'received'}`}>

                                <div>
                                    <p className='text-lg' >{message.text}</p>
                                    <span className="text-sm">{formatTimestamp(message.timestamp)}</span>
                                    <br />
                                    <span className="text-sm">{message.senderId === user.user?._id ? 'You' : 'Sender'}</span>
                                </div>

                            </div>
                        ))}
                        <div ref={messagesEndRef} /> {/* Empty div to scroll to */}
                    </div>
                </div>)}


            <div className='flex flex-col gap-1'>
                <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className='m-2'
                />
                <Button variant="secondary" className='m-2' onClick={sendMessage}>Send</Button>

            </div>
        </div >
    );
};

export default Chat;
