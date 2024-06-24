import React, { useState } from "react";
import router from "../../router/IndexRouter";
import { Outlet } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Sider } = Layout;

// 一级菜单列表
const headerMenuList = [
  {
    key: "teacher",
    label: "教师管理",
  },
  {
    key: "question",
    label: "题目管理",
  },
  {
    key: "paper",
    label: "组卷系统",
  },
];

// 二级菜单列表
const subMenuList = [
  [
    {
      key: "student",
      icon: React.createElement(UserOutlined),
      label: "学生管理",
    },
    {
      key: "school-class",
      icon: React.createElement(UserOutlined),
      label: "班级管理",
    },
    {
      key: "test",
      icon: React.createElement(UserOutlined),
      label: "考试管理",
    },
  ],
  [
    {
      key: "list",
      icon: React.createElement(UserOutlined),
      label: "题目管理",
    },
    {
      key: "select",
      icon: React.createElement(UserOutlined),
      label: "选择题",
    },
    {
      key: "input",
      icon: React.createElement(UserOutlined),
      label: "填空题",
    },
    {
      key: "subjective",
      icon: React.createElement(UserOutlined),
      label: "主观题",
    },
    {
      key: "knowledge",
      icon: React.createElement(UserOutlined),
      label: "知识点",
    },
  ],
  [
    {
      key: "auto",
      icon: React.createElement(UserOutlined),
      label: "自动组卷",
    },
    {
      key: "manual",
      icon: React.createElement(UserOutlined),
      label: "手动组卷",
    },
  ],
];

export default function SystemLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 欢迎消息
  const [showHello, setShowHello] = useState(true);
  // 当前一级菜单
  const [currentMenu, setCurrentMenu] = useState(headerMenuList[0]);
  // 当前二级菜单
  const [currentSubMenu, setCurrentSubMenu] = useState(subMenuList[0]);
  // 当前面包屑
  const [breadcrumbList, setBreadcrumb] = useState([
    { title: "在线学习系统", href: "/system" },
  ]);

  // 点击一级菜单，更新二级菜单
  const handleMenuClick = (e) => {
    if (e.key === "teacher") {
      setCurrentMenu(headerMenuList[0]);
      setCurrentSubMenu(subMenuList[0]);
    }
    if (e.key === "question") {
      setCurrentMenu(headerMenuList[1]);
      setCurrentSubMenu(subMenuList[1]);
    }
    if (e.key === "paper") {
      setCurrentMenu(headerMenuList[2]);
      setCurrentSubMenu(subMenuList[2]);
    }
  };

  // 点击二级菜单，进行路由跳转
  const handleSubMenuClick = (e) => {
    const path = `/system/${currentMenu.key}/${e.key}`;
    // console.log(path);
    // 当前二级菜单项，用于面包屑展示
    const item = subMenuList.flat().find((menuItem) => menuItem.key === e.key);
    setShowHello(false); // 在选择菜单时隐藏
    setBreadcrumb([
      { title: "在线学习系统", href: "/system" },
      { title: currentMenu.label },
      { title: item.label },
    ]);
    router.navigate(path);
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#f2f2f2",
            marginRight: 42,
            fontSize: 18,
          }}
        >
          在线学习系统
        </span>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["teacher"]}
          items={headerMenuList}
          onClick={handleMenuClick}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            items={currentSubMenu}
            onClick={handleSubMenuClick}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "12px 0",
            }}
            items={breadcrumbList}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: "calc(100vh - 134px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {showHello && (
              <div style={{ fontSize: 22, fontWeight: "bold" }}>
                您好，欢迎使用在线学习系统
              </div>
            )}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
