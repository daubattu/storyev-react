import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import routes from "routes/index";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    setTimeout(() => {
      setUser({ role: "admin" });
    }, 1500);
  }, []);

  console.log('re render App');

  if (!user) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Spin />
      </div>
    );
  }

  return routes[user.role];
}

export default React.memo(App);
