import React from "react";
import { Menu, Icon, Drawer, Layout } from "antd";

import { useHistory, useRouteMatch } from "react-router-dom";

import menus from "configs/menus";

import styles from "./Sidebar.module.scss";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = ({ collapsed, setCollapsed, logo, title, isMobile, isTablet, visible, setVisible }) => {
  console.log('re render Sidebar')
  const history = useHistory();
  const match = useRouteMatch();

  const prefix = match.path.split("/")[1];

  const defaultOpenKeys = menus
    .filter(m => match.path !== "/" && m.subMenus && m.path.includes(prefix))
    .map(r => r.path);

  const sidebar = (
    <Sider trigger={null} collapsible collapsed={isMobile ? false : collapsed}>
      <div className="logo">
        <img src={logo} alt="" /> <span>{title}</span>
      </div>
      <Menu theme="dark" mode="inline" defaultOpenKeys={defaultOpenKeys}>
        {menus.map(menu => {
          const subMenus =
            menu.subMenus && menu.subMenus.filter(sm => !sm.hiden);
          if (subMenus && subMenus.length !== 0) {
            return (
              <SubMenu
                key={menu.path}
                title={
                  <span>
                    <Icon type={menu.icon} />
                    <span>{menu.name}</span>
                  </span>
                }
              >
                {subMenus.map(r => {
                  return (
                    <Menu.Item
                      className={
                        match.path === r.path ? "ant-menu-item-selected" : ""
                      }
                      onClick={() => history.push(r.path)}
                      key={r.path}
                    >
                      {r.name}
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          }
          return (
            <Menu.Item
              className={
                defaultOpenKeys.includes(menu.path) 
                ||
                match.path === menu.path ? "ant-menu-item-selected" : ""
              }
              key={menu.path}
              onClick={() => history.push(menu.path)}
            >
              <Icon type={menu.icon} />
              <span>{menu.name}</span>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
  
  return (
    <div className={styles.container}>
      {isMobile ? (
        <Drawer
          className={styles.container}
          placement="left"
          closable={false}
          onClose={() => setCollapsed(true)}
          visible={!collapsed}
        >
          {sidebar}
        </Drawer>
      ) : (
        sidebar
      )}
    </div>
  );
};

export default React.memo(Sidebar);
