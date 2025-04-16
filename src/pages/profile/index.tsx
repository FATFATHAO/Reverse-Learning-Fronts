import { Avatar, Typography, Row, Col, Divider, Button, message, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import * as echarts from "echarts";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Paragraph } = Typography;

const Profile = () => {
  const username = localStorage.getItem("username") || "未登录用户";

  const emotionChartRef = useRef<HTMLDivElement | null>(null);
  // const activityChartRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sourceNumber, setSourceNumber] = useState(null);

  //  新增 state 来保存评估数据
  const [evaluationData, setEvaluationData] = useState<any[] | null>(null);


  const handleDownloadMemButtonClick = async () => {
    if (!username) {
      message.error("请先登录或提供用户名");
      return;
    }

    if (!sourceNumber) {
      message.warning("请选择要下载的内容类型");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://127.0.0.1:8500/source', 
        {
          username: username,
          sourcenumber: sourceNumber
        },
        {
          responseType: 'blob' 
        }
      );

      // 创建一个链接下载文件
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      const filenameMap = {
        1: '聊天记录.txt',
        2: '错题记录.txt',
        3: '学习建议.txt',
        4: '学习状态分数记录.xlsx'
      };

      link.href = downloadUrl;
      link.download = filenameMap[sourceNumber] || '下载内容';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      message.error("下载失败，请稍后重试");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //  拉取评估信息并保存到 state
  const fetchEvaluation = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8500/evaluation/${localStorage.getItem("username")}`);
      const rawData = response.data;
      const formattedData = [
        { name: "追问深度", value: rawData["追问深度"] },
        { name: "反馈及时性", value: rawData["反馈及时性"] },
        { name: "修正主动性", value: rawData["修正主动性"] },
        { name: "情感参与度", value: rawData["情感参与度"] },
        { name: "综合评分", value: rawData["综合评分"] },
      ];
      setEvaluationData(formattedData); // 设置状态，触发图表更新
      console.log(formattedData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEvaluation();
  }, []);

  //  初始化图表 + 根据状态更新图表数据
  useEffect(() => {
    const emotionChart = echarts.init(emotionChartRef.current!);
    // const activityChart = echarts.init(activityChartRef.current!);

    // // 设置提问次数图（静态）
    // activityChart.setOption({
    //   title: { text: "提问次数趋势", left: "center" },
    //   xAxis: { type: "category", data: ["周一", "周二", "周三", "周四", "周五"] },
    //   yAxis: { type: "value" },
    //   series: [
    //     {
    //       data: [2, 4, 3, 5, 6],
    //       type: "line",
    //       smooth: true,
    //       areaStyle: {},
    //     },
    //   ],
    // });

    // 如果有评估数据，就渲染情绪图
    if (evaluationData) {
      emotionChart.setOption({
        title: { text: "评估维度分析", left: "center" },
        tooltip: {},
        series: [
          {
            type: "pie",
            radius: "50%",
            data: evaluationData,
            emphasis: {
              itemStyle: { shadowBlur: 10, shadowColor: "rgba(0, 0, 0, 0.5)" },
            },
          },
        ],
      });
    }

    return () => {
      emotionChart.dispose();
      // activityChart.dispose();
    };
  }, [evaluationData]); // 监听 evaluationData 更新图表

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: "24px",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        boxSizing: "border-box",
        height: "100%"
      }}
    >
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={6} style={{ textAlign: "center" }}>
          <Avatar size={100} icon={<UserOutlined />} />
          <Title level={4} style={{ marginTop: 12 }}>{username}</Title>
        </Col>

        <Col xs={24} md={18}>
          <Title level={3}>个人信息</Title>
          <Paragraph>欢迎使用学习平台！以下是您的基本数据统计与分析。</Paragraph>
          <Divider />

          <Row gutter={[16, 16]}>
            <Col xs={48} md={12} offset={15}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <div ref={emotionChartRef} style={{ width: "100%", height: 300 }} />
              </motion.div>
            </Col>
          </Row>
        </Col>
      </Row>
      <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
        }}>
          <Select
            style={{ width: 200, marginBottom: 16 }}
            placeholder="选择下载类型"
            onChange={setSourceNumber}
          >
            <Select.Option value={1}>聊天记录</Select.Option>
            <Select.Option value={2}>错题记录</Select.Option>
            <Select.Option value={3}>学习建议</Select.Option>
            <Select.Option value={4}>学习状态分数记录</Select.Option>
          </Select>
          <Button
            type="primary"
            onClick={handleDownloadMemButtonClick}
            loading={loading}
          >
            下载记忆
          </Button>
        </div>
        <Button onClick={() => { navigate(-1) }}>返回</Button>
      </div>
    </motion.div>
  );
};

export default Profile;
