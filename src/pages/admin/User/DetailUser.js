import React from "react";
import { Card } from "antd";

import PageHeader from "../../../components/PageHeader/PageHeader";

const DetailUser = () => {
  console.log('re render Detail User')
  return (
    <>
      <PageHeader />
      <Card>
        <h1>DetailUser</h1>
      </Card>
    </>
  );
};

export default DetailUser;
