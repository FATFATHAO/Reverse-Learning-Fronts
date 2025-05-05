import React, { useState, useRef, useEffect } from "react";
import { Input, Button, Layout, Avatar, Spin, Menu, Upload, message } from "antd";
import { UserOutlined, RobotOutlined, CameraOutlined, UploadOutlined, SmileOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // 添加样式以正确显示公式
import "antd/dist/reset.css";
import Sider from "antd/es/layout/Sider";

const { Content } = Layout;

interface Message {
  role: "user" | "ai";
  content: string;
  type?: "text" | "image";
}

const Helper: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "请问你有什么学习上的问题呢，可以问问我" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [selectedKey, setSelectedKey] = useState("helper");
  const username = localStorage.getItem("username");

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // const base64String = (reader.result as string).split(",")[1]; // 去掉 data:image/png;base64, 前缀
        resolve(reader.result as string);
      };
      reader.onerror = reject;
    });

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8500/chat", {
        username: username,
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
      <Sider theme="light">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="helper" icon={<RobotOutlined />}>
            学习助手
          </Menu.Item>
          <Menu.Item key="camera" icon={<CameraOutlined />}>
            拍照解题助手
          </Menu.Item>
          <Menu.Item key="advice" icon={<SmileOutlined />}>
            建议助手
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: "20px" }}>
        <Content style={{ maxWidth: "1000px", margin: "auto", width: "100%" }}>
          {selectedKey === "helper" ? (
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", height: "80vh", overflowY: "auto", padding: "10px" }}>
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
                      {msg.role === "ai" ? <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >{msg.content}</ReactMarkdown> : msg.content}
                    </div>
                    {msg.role === "user" && <Avatar icon={<UserOutlined />} />}
                  </motion.div>
                ))}
                {loading && <Spin />}
                <div ref={messagesEndRef} />
              </div>
              <div style={{ display: "flex", marginTop: "16px", gap: "8px" }}>
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="请输入你的问题..." style={{ flex: 1 }} />
                <Button type="primary" onClick={handleSend}>发送</Button>
              </div></div>
          ) : (
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", height: "80vh", overflowY: "auto", padding: "10px" }}>
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
                      {msg.type === "image" ? (
                        <img src={msg.content} alt="uploaded" style={{ maxWidth: "100%", borderRadius: "8px" }} />
                      ) : msg.role === "ai" ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                        >{msg.content}</ReactMarkdown>
                      ) : (
                        msg.content
                      )}
                    </div>
                    {msg.role === "user" && <Avatar icon={<UserOutlined />} />}
                  </motion.div>
                ))}
                {loading && <Spin />}
                <div ref={messagesEndRef} />
              </div>

              {/* 发送框 */}
              <div style={{ display: "flex", marginTop: "16px", gap: "8px" }}>
                <Upload
                  beforeUpload={async (file) => {
                    const formData = new FormData();
                    formData.append("image", file, file.name);

                    setLoading(true);

                    try {
                      const base64 = await toBase64(file as File); // 转换图片为base64字符串

                      const response = await axios.post("http://127.0.0.1:8500/upload-image", {
                        username: username,
                        file: base64,
                      }, {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      });

                      if (response.data?.status === "success") {
                        const parsed = response.data.response;
                        const aiContent = `**题目：**\n${parsed.题目}\n\n**解析：**\n${parsed.正确答案.详细解析}`;

                        setMessages((prev) => [
                          ...prev,
                          { role: "user", type: "image", content: URL.createObjectURL(file) },
                          { role: "ai", type: "text", content: aiContent },
                        ]);
                        message.success("图片上传成功！");
                      } else {
                        message.error("图片识别失败，请稍后重试。");
                      }
                    } catch (error) {
                      message.error("上传失败，请检查网络连接。");
                    }
                    setLoading(false);
                    return false; // 阻止默认上传
                  }}
                  showUploadList={false}
                >
                  <Button style={{ width: "130vh" }} icon={<UploadOutlined />}>上传图片</Button>
                </Upload>
              </div>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Helper;
