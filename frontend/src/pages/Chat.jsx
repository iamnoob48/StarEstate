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
    <div className="flex h-screen bg-gray-50">
      {/* Users List */}
      <div className="w-72 bg-white shadow-lg rounded-r-2xl overflow-y-auto border-r border-gray-200">
        <h2 className="text-2xl font-bold p-6 border-b border-gray-200">
          Chats
        </h2>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className={`flex flex-col p-4 cursor-pointer transition-all duration-200 ${
              selectedUser?.id === user.id
                ? "bg-amber-50 shadow-inner rounded-xl"
                : "hover:bg-gray-100 rounded-lg"
            }`}
          >
            <p className="font-semibold text-gray-800">{user.username}</p>
            <p className="text-sm text-gray-500 truncate mt-1">
              {(messages[user.id] || []).slice(-1)[0]?.text ||
                "No messages yet"}
            </p>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white shadow-sm flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                  {selectedUser.username[0]}
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {selectedUser.username}
                </h2>
              </div>
              <span className="text-sm text-gray-400">Online</span>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {(messages[selectedUser.id] || []).map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 max-w-xs break-words rounded-2xl ${
                      msg.sender === "You"
                        ? "bg-amber-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none shadow-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
              />
              <Button
                onClick={handleSend}
                className="bg-amber-500 hover:bg-amber-600 text-white rounded-full p-3 shadow-md transition"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-400 text-lg">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
