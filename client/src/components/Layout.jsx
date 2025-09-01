import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoneyCollectOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Spinner from "./Spinner";

const { Header, Sider, Content } = Layout;

const LayoutApp = ({ children }) => {
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Dropdown Menu for Settings
  const settingsMenu = (
    <StyledDropdownMenu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="notifications" icon={<BellOutlined />}>
        Notifications
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() => {
          localStorage.removeItem("auth");
          navigate("/login");
        }}
      >
        Logout
      </Menu.Item>
    </StyledDropdownMenu>
  );

  return (
    <StyledLayout>
      {loading && <Spinner />}
      <StyledSider trigger={null} collapsible collapsed={collapsed}>
        <LogoContainer>
          <img src="/Logo.png" alt="logo" className="brand-logo" />
          <h4 className="logo-title">{collapsed ? "" : "StockIQ"}</h4>
        </LogoContainer>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
        >
          <Menu.Item key="/home" icon={<ShoppingOutlined />}>
            <Link to="/home">POS</Link>
          </Menu.Item>
          <Menu.Item key="/products" icon={<ShopOutlined />}>
            <Link to="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserSwitchOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<MoneyCollectOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>

          {/* Settings with Dropdown */}
          <Dropdown overlay={settingsMenu} trigger={["click"]}>
            <Menu.Item key="/settings" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
          </Dropdown>
        </Menu>
      </StyledSider>

      <Layout className="site-layout">
        <StyledHeader>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <CartIcon onClick={() => navigate("/cart")}>
            <ShoppingCartOutlined />
          </CartIcon>
        </StyledHeader>

        <StyledContent>{children}</StyledContent>
      </Layout>
    </StyledLayout>
  );
};

export default LayoutApp;

// ---------------- Styled Components ---------------- //

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledSider = styled(Sider)`
  background: linear-gradient(180deg, #1e3a8a, #3b82f6);
  color: #fff;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  img {
    width: 40px;
    margin-right: 10px;
  }
  .logo-title {
    color: white;
    font-size: 1rem;
    font-weight: 600;
  }
`;

const StyledHeader = styled(Header)`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const StyledContent = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  min-height: 280px;
  background: linear-gradient(135deg, #f9fafb, #e0f2fe);
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
`;

const CartIcon = styled.div`
  cursor: pointer;
  font-size: 1.2rem;
  position: relative;
`;

// Custom Styled Dropdown Menu
const StyledDropdownMenu = styled(Menu)`
  border-radius: 8px;
  padding: 0.5rem;
  background: linear-gradient(135deg, #2563eb, #60a5fa);
  .ant-dropdown-menu-item {
    color: white !important;
    font-weight: 500;
    border-radius: 6px;
    transition: all 0.2s ease;
  }
  .ant-dropdown-menu-item:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
