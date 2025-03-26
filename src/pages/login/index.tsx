import React, { useState } from "react";
import { Form, Input, Button, Card, Tabs, message } from "antd";
import axios from "axios";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const handleSubmit = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", values);
      if (response.data.status === "success") {
        message.success("登录成功");
        localStorage.setItem("username", values.username);
        window.location.href = "/home/homeContent";
      } else {
        message.error("登录失败");
      }
    } catch (error) {
      message.error("请求失败，请稍后重试");
    }
    setLoading(false);
  };

  const handleRegister = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/register", values);
      if (response.data.status === "success") {
        message.success("注册成功，请登录");
        setActiveTab("login"); // 切换到登录页
      } else {
        message.error("注册失败");
      }
    } catch (error) {
      message.error("请求失败，请稍后重试");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card style={{ width: 400, padding: 20 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="登录" key="login">
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入用户名" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码" }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>登录</Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="注册" key="register">
            <Form layout="vertical" onFinish={handleRegister}>
              <Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入用户名" }]}>
                <Input />
              </Form.Item>
              <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码" }]}>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>注册</Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;