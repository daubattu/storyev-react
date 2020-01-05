import React from "react";
import { Card } from "antd";

import PageHeader from "components/PageHeader/PageHeader";
import { FormStory } from "components/Form";

import { storyService } from 'services';

export default () => {
  const handleOnSubmit = _story => {
    return storyService.addStory(_story)
  };

  return (
    <>
      <PageHeader />
      <Card>
        <FormStory handleOnSubmit={handleOnSubmit} submitText="Thêm mới" />
      </Card>
    </>
  );
};
