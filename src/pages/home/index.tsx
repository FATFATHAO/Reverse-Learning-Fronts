import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Button, theme, Dropdown, MenuProps, Space } from "antd";
import { motion } from "framer-motion";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Footer, Content } = Layout;

const Home: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const [currentMenu, setCurrentMenu] = useState<string>(location.pathname);
  const username = localStorage.getItem("username");

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人信息',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      danger: true,
      label: '退出登录',
    },
  ];

  useEffect(() => {
    setCurrentMenu(location.pathname);
  }, [location.pathname]);

  const handleDropMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'profile') {
      navigate("/home/profile"); // 或 navigate('/profile');
    } else if (key === 'logout') {
      localStorage.clear();
      window.location.reload(); // 简单处理也可以用状态管理代替
    }
  };

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  // const handleLogout = () => {
  //   localStorage.clear();
  //   window.location.reload(); // 或者你可以用状态去重新渲染组件
  // };

  // const handleLoginButtonClick = () => {
  //   navigate("/login");
  // }

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
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Avatar size="large" icon={<UserOutlined />} style={{ marginRight: "5px" }} />
          {username ? (
            <Dropdown menu={{ items, onClick: handleDropMenuClick }} trigger={['hover']} arrow={{pointAtCenter: true}} placement="bottom">
              <div style={{ color: '#fff', cursor: 'pointer' }}>
                <Space>
                  {username}
                  <DownOutlined style={{marginLeft: "5px"}} />
                </Space>
              </div>
            </Dropdown>
          ) : (
            <Button type="primary" onClick={() => navigate('/login')}>
              登录
            </Button>
          )}
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
