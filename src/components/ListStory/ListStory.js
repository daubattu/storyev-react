import React from "react";
import { Table, Icon, Popconfirm } from "antd";

export default ({ data, handleDelete }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Part",
      dataIndex: "part",
      key: "part"
    },
    {
      title: "Audio",
      dataIndex: "audio",
      key: "audio"
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, item) => (
        <div>
          <Popconfirm
            placement="topLeft"
            title={"Xoa truyen chem" + item.name}
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
