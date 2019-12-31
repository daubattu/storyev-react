import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Icon } from "antd";

import { useMediaQuery } from 'react-responsive';

import styles from "./MainLayout.module.scss";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Content from "../Content/Content";

import logo from "assets/logo.svg";

const { Header } = Layout;

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const isMobile = useMediaQuery({
    query: '(max-device-width: 576px)'
  })
  const isTablet = useMediaQuery({
    query: '(max-device-width: 768px)'
  })

  useLayoutEffect(() => {
    if (isTablet) {
      setCollapsed(true)
    } else {
      setCollapsed(false);
    }
  }, [isTablet, setCollapsed]);

  return (
    <div className={styles.container}>
      <Layout>
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobile={isMobile}
          isTablet={isTablet}
          logo={logo}
          title="StoryEV"
        />
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <div className="header-left">
              <Link className="logo" to="/"><img className="logo" src={logo} alt="" /></Link>
              <Icon
                className="trigger"
                type={collapsed ? "menu-unfold" : "menu-fold"}
                onClick={() => setCollapsed(!collapsed)}
              />
            </div>
            <div className="header-right">

            </div>
          </Header>
          <Content>
            { children }
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default React.memo(MainLayout);
