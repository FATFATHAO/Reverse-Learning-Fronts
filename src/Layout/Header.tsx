import React from "react";
import { Layout, Menu, Avatar, Button } from "antd";
import { motion } from "framer-motion";
import { UserOutlined } from "@ant-design/icons";

const { Header: AntdHeader } = Layout;

const THeader: React.FC = () => {
  return (
    <AntdHeader className="flex justify-between items-center bg-white shadow-md px-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-lg font-bold">逆向学习平台</div>
      </motion.div>
      <Menu mode="horizontal" className="flex-1 justify-center border-none">
        <Menu.Item key="1">首页</Menu.Item>
        <Menu.Item key="2">课程</Menu.Item>
        <Menu.Item key="3">论坛</Menu.Item>
      </Menu>
      <div className="flex items-center gap-4">
        <Avatar size="large" icon={<UserOutlined />} />
        <Button type="primary">登录</Button>
      </div>
    </AntdHeader>
  );
};

export default THeader;