import { Button, Card, Col, Row, Typography } from "antd";
import { motion } from "framer-motion";
import { BookOutlined, DownloadOutlined, MessageOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const HomeContent = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/home/helper", {state: "helper"});
  }

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{padding: "20px"}}>
      <Title level={2}>欢迎来到基于智能逆向追溯的智能学习优化助手的学习平台</Title>
      <Paragraph>利用多种ai大模型进行结合，最终实现可以通过由果推因的智能化学习助手平台。</Paragraph>

      {/* 快捷操作按钮 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col><Button type="primary" size="large" onClick={handleButtonClick}>开始使用</Button></Col>
      </Row>

      {/* 核心功能展示 */}
      <Row gutter={16}>
        <Col span={8}>
          <Card hoverable onClick={() => navigate("/home/helper", {state: "helper"})}>
            <BookOutlined style={{ fontSize: 32 }} />
            <Title level={4}>学习助手</Title>
            <Paragraph>记录用户反馈的学习细节，帮助用户疏导目前自己的问题，更好的提高学习的效率。</Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable onClick={() => navigate("/home/profile")}>
            <DownloadOutlined style={{ fontSize: 32 }} />
            <Title level={4}>记忆下载</Title>
            <Paragraph>下载当前账户的学习反馈，即与学习助手的聊天记录，错题以及学习建议</Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable onClick={() => navigate("/home/helper", {state: "camera"})}>
            <MessageOutlined style={{ fontSize: 32 }} />
            <Title level={4}>拍照讲题</Title>
            <Paragraph>与智能ai助手一同探讨问题，只需要通过一张照片，就能获取题目的详细细节。</Paragraph>
          </Card>
        </Col>
      </Row>
    </motion.div>
  );
};

export default HomeContent;
