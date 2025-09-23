import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import io from "socket.io-client";

// Connect to backend Socket.io server
const socket = io("http://localhost:4003"); // replace with your server URL

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [currentUserId, setUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({}); // {userId: [msg, ...]}
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem("token");

  // Scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/users", {
      headers: { Authorization: token },
    });
    const data = await res.json();
    setUsers(data);
  };
  const fetchUserId = async () => {
    const res = await fetch("/api/userData", {
      headers: { Authorization: token },
    });
    const data = await res.json();
    setUserId(data.id);
  };

  useEffect(() => {
    fetchUsers();
    fetchUserId();
  }, []);

  useEffect(() => {
    // Register logged-in user with socket

    if (currentUserId) {
      socket.emit("register", currentUserId);
    }

    // Receive previous messages when registering
    socket.on("previous_messages", (msgs) => {
      const grouped = {};
      msgs.forEach((msg) => {
        const otherUserId =
          msg.senderId === currentUserId ? msg.receiverId : msg.senderId;
        if (!grouped[otherUserId]) grouped[otherUserId] = [];
        grouped[otherUserId].push({
          sender: msg.senderId === currentUserId ? "You" : "Them",
          text: msg.content,
        });
      });
      setMessages(grouped);
    });

    // Listen for new messages
    socket.on("receive_message", (msg) => {
      const otherUserId =
        msg.senderId === currentUserId ? msg.receiverId : msg.senderId;
      setMessages((prev) => ({
        ...prev,
        [otherUserId]: [
          ...(prev[otherUserId] || []),
          { sender: "Them", text: msg.content },
        ],
      }));
    });

    return () => {
      socket.off("previous_messages");
      socket.off("receive_message");
    };
  }, [currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

  const handleSend = () => {
    if (!newMessage.trim() || !selectedUser) return;

    // Emit message to backend
    socket.emit("send_message", {
      senderId: Number(currentUserId),
      receiverId: Number(selectedUser.id),
      text: newMessage,
    });

    // Optimistically add to local state
    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [
        ...(prev[selectedUser.id] || []),
        { sender: "You", text: newMessage },
      ],
    }));
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Users List */}
      <div className="w-150 bg-white border-r border-gray-300 overflow-y-auto">
        <h2 className="text-xl font-bold p-4">Messages</h2>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className={`p-4 cursor-pointer hover:bg-gray-200 ${
              selectedUser?.id === user.id ? "bg-gray-200" : ""
            }`}
          >
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600 truncate">
              {(messages[user.id] || []).slice(-1)[0]?.text || user.username}
            </p>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-300">
              <h2 className="font-bold text-lg">{selectedUser.username}</h2>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {(messages[selectedUser.id] || []).map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      msg.sender === "You"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-300 flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Button onClick={handleSend}>
                <PaperAirplaneIcon />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-500">Select a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
}
