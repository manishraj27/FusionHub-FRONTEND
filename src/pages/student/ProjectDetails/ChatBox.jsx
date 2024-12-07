import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const ChatBox = ({ projectId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:2000/api/messages/chat/${projectId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      
      setMessages(data);
      console.log(message);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:2000/api/self/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch user profile");
      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      if (!message.trim()) return;
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:2000/api/messages/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: userProfile?.id,
          projectId,
          content: message,
        }),
      });
      if (!response.ok) throw new Error("Failed to send message");
      const newMessage = {
        sender: userProfile,
        content: message,
        id: Date.now(), // Temporary unique ID for rendering
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Append new message to state
      setMessage(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  useEffect(() => {
    fetchMessages();
    fetchUserProfile();
  }, [projectId]);

  useEffect(() => {
    fetchMessages();
    fetchUserProfile();
  
    const interval = setInterval(() => {
      fetchMessages(); // Fetch messages periodically
    }, 3000); // Fetch every 3 seconds
  
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [projectId]);

  
  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {messages.map((msg) => (
            <div
              className={`flex gap-2 mb-2 ${
                msg.sender.id === userProfile?.id ? "justify-end" : "justify-start"
              }`}
              key={msg.id}
            >
              {msg.sender.id !== userProfile?.id && (
                <Avatar>
                  <AvatarFallback>
                    {msg.sender.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="space-y-2 py-2 px-2 border rounded-xl">
                <p>{msg.sender.fullName}</p>
                <p className="text-gray-300">{msg.content}</p>
              </div>
              {msg.sender.id === userProfile?.id && (
                <Avatar>
                  <AvatarFallback>
                    {msg.sender.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>
        <div className="relative p-0">
          <Input
            placeholder="Type a message..."
            className="py-7 border-t outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            onClick={handleSendMessage}
            className="absolute right-2 top-3 rounded-full"
            size="icon"
            variant="ghost"
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
