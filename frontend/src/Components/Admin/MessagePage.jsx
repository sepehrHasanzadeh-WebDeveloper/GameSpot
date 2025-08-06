import { useEffect, useState, useRef } from "react";
import axios from "axios";
import MsgCard from "./MsgCard";
import "./MsgCard.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaUser, FaUserShield } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:6500/Message/adminMessages",
          {
            withCredentials: true,
          }
        );
        setMessages(res.data);
      } catch (err) {
        window.alert("خطا در دریافت پیام‌ها", err);
      }
    };

    fetchMessages();
  }, []);

 
  useEffect(() => {
    if (selectedUserId) {
      const fetchConversation = async () => {
        try {
          const res = await axios.get(
            "http://localhost:6500/Message/Conversetion",
            {
              params: { userId: selectedUserId },
              withCredentials: true,
            }
          );
          setUserMessages(res.data);
        } catch (err) {
          window.alert("خطا در دریافت گفتگو با کاربر", err);
        }
      };

      fetchConversation();
    }
  }, [selectedUserId]);


  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [userMessages]);

  const handleReply = async () => {
    if (!replyMessage.trim()) {
      alert("لطفاً یک پیام وارد کنید");
      return;
    }

    try {
      await axios.post(
        "http://localhost:6500/Message/admin/reply",
        {
          receiverId: selectedUserId,
          message: replyMessage,
        },
        { withCredentials: true }
      );

      const newMsg = {
        _id: Date.now(),
        message: replyMessage,
        senderId: {
          _id: "685d04b423a2e4d7296a5b64",
          firstName: "ادمین",
          lastName: "",
        },
        receiverId: selectedUserId,
        createdAt: new Date().toISOString(),
      };

   
      setMessages((prev) => [...prev, newMsg]);
      setUserMessages((prev) => [...prev, newMsg]);
      setReplyMessage("");
    } catch (err) {
      window.alert("خطا در ارسال پاسخ", err);
    }
  };

  const uniqueUsers = [
    ...new Map(
      messages
        ?.filter(
          (msg) =>
            msg.senderId?._id && msg.senderId._id !== "685d04b423a2e4d7296a5b64"
        )
        .map((msg) => [msg.senderId._id, msg.senderId])
    ).values(),
  ];
  return (
    <Container style={{ margin: "50px 0" }}>
      <h3 className="text-center mb-5">پیام‌های دریافتی از کاربران</h3>
      <Row className="gy-5">
        <Col md={4}>
          <div className="list-users-msg">
            {uniqueUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  setSelectedUserId(user._id);
                  setSelectedUserEmail(user.email);
                }}
              >
                <MsgCard {...user} />
              </div>
            ))}
          </div>
        </Col>

        <Col md={8}>
          {selectedUserId && (
            <div className="chatBox-user-container">
              <h5 className="mb-3">مکالمه با {selectedUserEmail}</h5>

              <div className="chat-wrapper">
                <div className="chat-messages" ref={chatBoxRef}>
                  {userMessages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`chat-bubble ${
                        msg.senderId._id === selectedUserId ? "user" : "admin"
                      }`}
                    >
                      <div className="chat-content">
                        {msg.senderId._id === selectedUserId ? (
                          <FaUser size={51} className="me-2" />
                        ) : (
                          <MdSupportAgent size={30} className="me-2" />
                        )}
                        <span>{msg.message}</span>
                      </div>
                      <small className="text-muted">
                        {new Date(msg.createdAt).toLocaleString()}
                      </small>
                    </div>
                  ))}
                </div>

                <div className="chat-input-bar">
                  <input
                    type="text"
                    className="input-style"
                    placeholder="پاسخ خود را بنویسید..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  />
                  <button className="send-msg-btn" onClick={handleReply}>
                    ارسال
                  </button>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminMessages;
