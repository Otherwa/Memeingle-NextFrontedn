import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { fetchMessages } from '@/app/authStore/userActions';

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

const socket = io('http://localhost:5000', {
    transports: ['websocket'],
});

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


    // Fetch messages initially and on userId or user updates
    useEffect(() => {
        if (userId && user.user?._id) {

            fetchMessages(setMessages, setLoading, userId, user);
            scrollToBottom();
        }
    }, [userId, user]);

    // Handle receiving messages via Socket.IO
    useEffect(() => {
        socket.on('receiveMessage', (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            scrollToBottom();
        });

        return () => {
            socket.off('receiveMessage'); // Clean up listener on component unmount
        };
    }, []);

    // Handle sending a new message
    const sendMessage = () => {
        if (!newMessage.trim() || !userId || !user.user?._id) return;

        const messageData = { id: Date.now().toString(), text: newMessage, senderId: user.user._id, timestamp: new Date() };
        socket.emit('sendMessage', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setNewMessage('');

        // Save messages to local storage
        localStorage.setItem(`messages-${userId}`, JSON.stringify([...messages, messageData]));
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
        <div className='border-2 rounded-lg border-l-3 border-r-3 border-dashed border-black'>
            <div className="flex items-stretch">
                <Button className="m-3 w-full" variant="secondary" onClick={() => {
                    // Fetch messages on button click (implement fetchMessages as needed)
                    // Example: fetchMessages(setMessagesWithCache, setLoading, userId, user);
                }}>🔃 Refresh</Button>
            </div>
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
