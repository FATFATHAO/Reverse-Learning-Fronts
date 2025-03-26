import { Button, Card, Col, Row, Typography } from "antd";
import { motion } from "framer-motion";
import { BookOutlined, DownloadOutlined, MessageOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const HomeContent = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/home/helper");
  }

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Title level={2}>欢迎来到逆向学习平台</Title>
      <Paragraph>探索最新的逆向分析学习技术，获取高质量学习资源，与社区交流经验。</Paragraph>

      {/* 快捷操作按钮 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col><Button type="primary" size="large" onClick={handleButtonClick}>开始学习</Button></Col>
      </Row>

      {/* 核心功能展示 */}
      <Row gutter={16}>
        <Col span={8}>
          <Card hoverable>
            <BookOutlined style={{ fontSize: 32 }} />
            <Title level={4}>学习进度</Title>
            <Paragraph>记录你的学习进度，规划学习路线。</Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable>
            <DownloadOutlined style={{ fontSize: 32 }} />
            <Title level={4}>资源下载</Title>
            <Paragraph>提供丰富的学习资料，免费下载。</Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable>
            <MessageOutlined style={{ fontSize: 32 }} />
            <Title level={4}>社区交流</Title>
            <Paragraph>与志同道合的学习者交流经验。</Paragraph>
          </Card>
        </Col>
      </Row>
    </motion.div>
  );
};

export default HomeContent;