import React from "react";
import { Table, Icon, Popconfirm } from "antd";

export default ({ data, handleDelete, onClickEdit }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
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
          <Icon
            type="edit"
            style={{ cursor: "pointer", marginRight: "5px" }}
            onClick={() => onClickEdit(item.id)}
          />
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
