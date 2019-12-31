import React from "react";
import { PageHeader } from "antd";
import menus from "configs/menus";
import { useRouteMatch, matchPath, Link } from "react-router-dom";

import styles from "./PageHeader.module.scss";

export default ({ title = "", subTitle = "", ...rest }) => {
  console.log('re render PageHeader');
  const match = useRouteMatch();
  const paths = match.path
    .split("/")
    .filter(p => p)
    .map(p => "/" + p);

  const menusFlatten = menus
    .filter(
      m =>
        match.path !== "/" &&
        m.path.includes(match.path.split("/")[0])
    )
    .reduce(
      (r, m) => {
        r = r.concat({ path: m.path, name: m.name, icon: m.icon })
        if (m.subMenus) {
          r = r.concat(...m.subMenus);
        }
        return r;
      }, []
    );

  const findRoute = valuePath => {
    for (let m of menusFlatten) {
      if (matchPath(valuePath, { path: m.path, exact: true })) {
        return m.name;
      }
    }
  };

  let routes = [
    {
      path: "/",
      name: "Trang chu"
    }
  ];

  let prefixValuePath = "";

  for (let i = 0; i < paths.length; i++) {
    const valuePath = prefixValuePath + paths[i];

    routes = routes.concat({
      path: valuePath,
      name: findRoute(valuePath)
    });

    prefixValuePath += paths[i];
  }

  console.log(routes);

  return (
    <div className={styles.container}>
      <PageHeader
        title={title}
        breadcrumb={{
          itemRender: (route, params, routes, paths) => {
            if (match.path === route.path) {
              return route.name
            }
            return <Link to={route.path}>{route.name}</Link>
          },
          routes
        }}
        subTitle={subTitle}
        {...rest}
      />
    </div>
  );
};
