import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Button, theme } from "antd";
import { motion } from "framer-motion";
import { UserOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Footer, Content } = Layout;

const Home: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const [currentMenu, setCurrentMenu] = useState<string>(location.pathname);

  useEffect(() => {
    setCurrentMenu(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = (e: { key: string }) => {
    setCurrentMenu(e.key);
    navigate(e.key);
  };

  const handleLoginButtonClick = () => {
    navigate("/login");
  }

  return (
    <Layout className="min-h-screen">
      {/* Header Section */}
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-lg font-bold text-white">逆向学习平台</div>
        </motion.div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[currentMenu]}
          style={{ flex: 1, minWidth: 0 }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="/home/homeContent">首页</Menu.Item>
          {/*<Menu.Item key="/home/dashboard">概览</Menu.Item>*/}
          <Menu.Item key="/home/helper">助手</Menu.Item>
        </Menu>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <Avatar size="large" icon={<UserOutlined />} style={{marginRight: "5px"}} />
          {localStorage.getItem("username") !== null ?
            <div style={{ color: "#fff" }}>{localStorage.getItem("username")}</div> :
            <Button type="primary" onClick={handleLoginButtonClick}>登录</Button>
          }
        </div>
      </Header>

      {/* Main Content Section */}
      <Content style={{ padding: '0 48px', flex: 1, display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ flex: 1, display: 'flex' }}>
          <div
            style={{
              background: colorBgContainer,
              flex: 1,
              padding: 24,
              borderRadius: borderRadiusLG,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: "100vh",
            }}
          >
            <Outlet />
          </div>
        </motion.div>
      </Content>

      {/* Footer Section */}
      <Footer style={{ textAlign: 'center', background: '#f0f2f5', padding: '20px 0' }}>
        © {new Date().getFullYear()} 逆向学习平台. All Rights Reserved.
      </Footer>
    </Layout>
  );
};

export default Home;