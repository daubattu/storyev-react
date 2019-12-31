import React from "react";

import styles from "./Content.module.scss";

export default ({ children }) => {
  return (
    <main className={styles.container}>
      {children}
    </main>
  )
};
