import "./Chatbox.css";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

function Mymessages({ userId, adminId }) {
  const [newMessage, setNewMessage] = useState("");
  const [showmsg, setShowmsg] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMessagess = async () => {
      const res = await axios.get("http://localhost:6500/Message/userRes", {
        withCredentials: true,
      });
      setShowmsg(res.data);
    };
    fetchMessagess();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [showmsg]);

  const handleSend = async () => {
    try {
      const res = await axios.post(
        "http://localhost:6500/Message",
        {
          receiverId: adminId,
          message: newMessage,
        },
        { withCredentials: true }
      );
      setShowmsg((prev) => [
        ...prev,
        {
          _id: Date.now(),
          message: newMessage,
          senderId: { _id: "685d04b423a2e4d7296a5b64" },
          receiverId: userId,
          createdAt: new Date(),
        },
      ]);
    } catch (err) {
      Swal.fire({
        text: "خطا در ارسال پیام ",
        title: "خطا",
        icon: "error",
      });
    }
    setNewMessage("");
  };

  return (
    <div className="chatBox-user-container">
      <div className="chat-wrapper">
        <div className="chat-messages">
          <div className="chat-bubble admin">
            <MdSupportAgent size={20} className="me-2" />
            سلام کاربر عزیز، پیام خود را برای پشتیبانی بگذارید.
          </div>

          {showmsg.map((msg) => (
            <div
              key={msg._id}
              className={`chat-bubble ${
                msg.senderId === "685d04b423a2e4d7296a5b64" ? "admin" : "user"
              }`}
            >
              {msg.senderId === "685d04b423a2e4d7296a5b64" ? (
                <MdSupportAgent size={20} className="me-2" />
              ) : (
                <FaUser size={18} className="me-2" />
              )}

              {msg.message}
            </div>
          ))}

          <div ref={scrollRef} />
        </div>

        <div className="chat-input-bar">
          <input
            type="text"
            className="input-style"
            placeholder="پیام خود را بنویسید..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="send-msg-btn" onClick={handleSend}>
            ارسال
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mymessages;
