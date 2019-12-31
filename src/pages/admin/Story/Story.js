import React from 'react';
import { Card, Button, Icon } from "antd";

// import MainLayout from '../../../layouts/Main';
import PageHeader from "../../../components/PageHeader/PageHeader";

const Story = ({ history }) => {
  return (
    <>
      <PageHeader title="Quan ly truyen chem" extra={[
        <Button key="1" type="primary" onClick={() => history.push("/stories/add")}>
          <Icon type="plus" /> Them moi
        </Button>
      ]}/>
      <Card>
        <h1>Story</h1>
      </Card>
    </>
  )
}

export default Story;