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

    // Load messages from local storage
    useEffect(() => {
        const cachedMessages = localStorage.getItem(`messages-${userId}`);
        if (cachedMessages) {
            setMessages(JSON.parse(cachedMessages));
        }
    }, [userId]);

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
                await fetchMessages(setMessagesWithCache, setLoading, userId, user);
                scrollToBottom();
            }
        };

        fetchInitialMessages();
    }, [userId, user]);



    // Handle sending a new message
    const sendMessage = async () => {
        if (!newMessage.trim() || !userId || !user.user?._id) return;

        await handleSendMessage(newMessage, setNewMessage, setMessagesWithCache, userId, user);

        // After sending message, fetch updated messages
        fetchMessages(setMessagesWithCache, setLoading, userId, user);
        scrollToBottom();
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

    // Save messages to local storage and state
    const setMessagesWithCache = (newMessages: Message[]) => {
        setMessages(newMessages);
        localStorage.setItem(`messages-${userId}`, JSON.stringify(newMessages));
    };

    // Function to fetch messages periodically
    useEffect(() => {
        const interval = setInterval(() => {
            if (userId && user.user?._id) {
                fetchMessages(setMessagesWithCache, setLoading, userId, user);
            }
        }, 5 * 60 * 1000); // Fetch messages every 5 minutes

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [setMessagesWithCache, user, userId]);

    return (
        <div className='border-2 rounded-lg border-l-3 border-r-3 border-dashed border-black'>
            <div className="flex items-stretch">
                <Button className="m-3 w-full" variant="secondary" onClick={() => fetchMessages(setMessagesWithCache, setLoading, userId, user)}>🔃 Refresh</Button>
            </div>
            {/* <Button className='m-2 w-full' onClick={sendMessage}>Send</Button> */}
            {loading ? (
                <div className="flex m-3 h-96 w-full items-center justify-center flex-col space-y-4 gap-4">
                    <div className="flex flex-col">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="chat-messages m-3 h-96 overflow-y-scroll">
                        {messages.map((message) => (
                            <div key={message.id} className={`message ${message.senderId === user.user?._id ? 'sent' : 'received'}`}>
                                <div>
                                    <p className='text-sm'>{message.text}</p>
                                    <span className="text-xs">{formatTimestamp(message.timestamp)}</span>
                                    <br />
                                    <span className="text-xs">{message.senderId === user.user?._id ? 'You' : 'Sender'}</span>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} /> {/* Empty div to scroll to */}
                    </div>
                </div>
            )}

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
        </div>
    );
};

export default Chat;
