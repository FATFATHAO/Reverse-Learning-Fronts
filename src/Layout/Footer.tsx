import React from "react";
import { Layout } from "antd";

const { Footer: AntdFooter } = Layout;

const TFooter: React.FC = () => {
  return (
    <AntdFooter className="text-center py-4 bg-gray-100">
      © 2025 逆向学习平台. All Rights Reserved.
    </AntdFooter>
  );
};

export default TFooter;