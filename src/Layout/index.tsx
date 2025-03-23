// src/Layout/AppLayout.tsx
import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";

const { Content } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout className="min-h-screen flex flex-col">
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <Content className="flex-1 p-6">
        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          {children}
        </motion.div>
      </Content>

      {/* Footer Section */}
      <Footer />
    </Layout>
  );
};

export default AppLayout;