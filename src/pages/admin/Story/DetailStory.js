import React from "react";
import { Card } from "antd";

// import MainLayout from '../../../layouts/Main';
import PageHeader from "../../../components/PageHeader/PageHeader";

const DetailStory = () => {
  console.log('re render Detail User')
  return (
    <>
      <PageHeader />
      <Card>
        <h1>DetailStory</h1>
      </Card>
    </>
  );
};

export default DetailStory;
