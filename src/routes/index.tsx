import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { routerConfigType } from "./routerConfigType";
import Home from "../pages/home";
import { useCallback } from "react";
import DashBoard from "../pages/dashboard";
import Helper from "../pages/helper";
import HomeContent from "../pages/home/components/home-content";
import Login from "../pages/login";
import Profile from "../pages/profile";

const routeConfig: routerConfigType[] = [
  {
    path: "/",
    element: <Navigate to="/home/homeContent" replace />, // 默认重定向到 /home
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "homeContent",
        element: <HomeContent />,
        index: true,
      },
      {
        path: "dashboard",
        element: <DashBoard />,
      },
      {
        path: "helper",
        element: <Helper />,
      },
      {
        path: "profile",
        element: <Profile />
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/404",
    element: <>Not Found</>, // 404 页面
  },
];

function MyRoutes() {
  // 写死用户角色数据
  const userRole = "admin"; // 假设用户角色是 admin

  /**
   * @description: 转换路由配置数据
   * @param {routeConfig} routeConfig 路由配置
   */
  const transformRoutes = useCallback(
    (routeList: typeof routeConfig): RouteObject[] => {
      return routeList.map((route) => {
        const newRoute = { ...route };

        // 检查权限
        if (
          userRole &&
          newRoute.path !== "/404" &&
          newRoute.auth !== undefined &&
          !newRoute.auth.includes(userRole)
        ) {
          newRoute.element = <Navigate replace to="/404" />;
        }

        if (newRoute.children) {
          newRoute.children = transformRoutes(newRoute.children);
        }

        return newRoute;
      });
    },
    [userRole]
  );

  const routes = transformRoutes(routeConfig);
  const getRoutes = useRoutes(routes);

  return <>{getRoutes}</>;
}

export default MyRoutes;
