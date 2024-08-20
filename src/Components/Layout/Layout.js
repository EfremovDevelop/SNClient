import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Layout as LayoutAntd, Menu } from "antd";
import './Layout.css'; // Подключаем внешний CSS файл

const { Header, Content, Footer, Sider } = LayoutAntd;

const items = [
  {
    label: <Link to={"/"}>Личная страница</Link>,
    key: "1",
  },
  {
    label: <Link to={"/projects"}>Сообщения</Link>,
    key: "2",
  },
  {
    label: <Link to={"/login"}>Друзья</Link>,
    key: "3",
  },
  {
    label: <Link to={"/logoff"}>Выход</Link>,
    key: "4",
  },
];

const Layout = ({ user }) => {
  return (
    <LayoutAntd style={{ minHeight: '100vh', margin: 0 }}>
      <Sider width={200} className="site-layout-background" style={{ padding: 0 }}>
        <div style={{ padding: '16px', color: 'white' }}>
          {user.isAuthenticated ? (
            <strong>{user.userName}</strong>
          ) : (
            <strong>Гость</strong>
          )}
        </div>
        <Menu theme="dark" mode="inline" items={items} className="menu" />
      </Sider>
      <LayoutAntd style={{ padding: 0 }}>
        <Header style={{ background: '#001529', color: 'white', padding: '0 16px' }}>
          <div style={{ float: 'right' }}>
            SocialNetwork
          </div>
        </Header>
        <Content style={{ padding: 0 }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>SocialNetwork ©2024</Footer>
      </LayoutAntd>
    </LayoutAntd>
  );
}

export default Layout;