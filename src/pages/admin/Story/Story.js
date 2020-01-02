import React, { useEffect, useState } from "react";
import { Card, Button, Icon, Spin } from "antd";
import { storyService } from "services";

// import MainLayout from '../../../layouts/Main';
import PageHeader from "../../../components/PageHeader/PageHeader";
import ListStory from "components/ListStory/ListStory";

const Story = ({ history }) => {
  const [stories, setStories] = useState(null);
  useEffect(() => {
    storyService
      .getStories("", { part: 1 })
      .then(response => setStories(response))
      .catch(() => setStories([]));
  }, []);

  const handleDelete = id => {
    setStories(stories.filter(s => s.id !== id));
    storyService.deleteStory(id);
  };

  return (
    <>
      <PageHeader
        title="Quan ly truyen chem"
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => history.push("/stories/add")}
          >
            <Icon type="plus" /> Them moi
          </Button>
        ]}
      />
      <Card>
        {stories ? (
          <ListStory
            handleDelete={handleDelete}
            data={stories.map(s => ({ ...s, key: s.id }))}
          />
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

export default Story;
