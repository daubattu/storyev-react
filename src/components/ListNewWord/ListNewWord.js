import React from "react";
import { Table, Icon, Popconfirm } from "antd";

export default ({ data, handleDelete }) => {
  const columns = [
    {
      title: "Part",
      dataIndex: "part",
      key: "part"
    },
    {
      title: "Story",
      dataIndex: "story_id",
      key: "story_id"
    },
    {
      title: "Word",
      dataIndex: "word",
      key: "word"
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Spelling",
      dataIndex: "spelling",
      key: "spelling"
    },
    {
      title: "Audio US",
      dataIndex: "audio_us",
      key: "audio_us"
    },
    {
      title: "Audio UK",
      dataIndex: "audio_uk",
      key: "audio_uk"
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, item) => (
        <div>
          <Popconfirm
            placement="topLeft"
            title={"Xoa tu moi" + item.word}
            onConfirm={() => handleDelete(item.id)}
            okText="Yes"
            cancelText="No"
          >
            <Icon type="delete" onClick={() => {}} />
          </Popconfirm>
        </div>
      )
    }
  ];

  return <Table columns={columns} dataSource={data} />;
};
