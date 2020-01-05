import React, { useState, useEffect } from "react";
import { Card, Spin } from "antd";

import PageHeader from "components/PageHeader/PageHeader";
import { FormStory } from "components/Form";

import { storyService } from "services";

export default ({ match }) => {
  const [story, setStory] = useState();

  useEffect(() => {
    storyService.getStoryById(match.params.id)
      .then(response => setStory(response))
  }, [match.params.id]);

  const handleOnSubmit = _story => {
    return storyService.editStory(_story);
  };

  return (
    <>
      <PageHeader />
      <Card>
        {story ? (
          <FormStory handleOnSubmit={handleOnSubmit} formValue={story} submitText="Cập nhật" />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px"
            }}
          >
            <Spin />
          </div>
        )}
      </Card>
    </>
  );
};
