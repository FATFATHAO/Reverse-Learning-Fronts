import React, { useState } from "react";
import { Input, Button, Layout, Avatar, Spin } from "antd";
import { UserOutlined, RobotOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "antd/dist/reset.css";

const { Content } = Layout;

interface Message {
  role: "user" | "ai";
  content: string;
}

const Helper: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "请问你有什么学习上的问题呢，可以问问我" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat", {
        username: "test_user", // 这里可以替换为实际的用户名
        prompt: input,
      });

      if (response.data && response.data.status === "success" && response.data.response) {
        const aiReply: Message = { role: "ai", content: response.data.response };
        setMessages((prev) => [...prev, aiReply]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", content: "AI 发生错误，请稍后重试。" }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", content: "请求失败，请检查网络连接。" }]);
    }
    setLoading(false);
  };

  return (
    <Layout style={{ height: "100vh", padding: "20px" }}>
      <Content style={{ maxWidth: "1000px", margin: "auto", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", minHeight: "80vh", justifyContent: "center" }}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.role === "ai" && <Avatar icon={<RobotOutlined />} />}
              <div
                style={{
                  background: msg.role === "user" ? "#1890ff" : "#f6f6f6",
                  color: msg.role === "user" ? "#fff" : "#000",
                  padding: "10px 15px",
                  borderRadius: "16px",
                  maxWidth: "60%",
                  wordWrap: "break-word",
                }}
              >
                {msg.role === "ai" ? <ReactMarkdown>{msg.content}</ReactMarkdown> : msg.content}
              </div>
              {msg.role === "user" && <Avatar icon={<UserOutlined />} />}
            </motion.div>
          ))}
          {loading && <Spin />}
        </div>
        <div style={{ display: "flex", marginTop: "16px", gap: "8px" }}>
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="请输入你的问题..." style={{ flex: 1 }} />
          <Button type="primary" onClick={handleSend}>发送</Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Helper;
