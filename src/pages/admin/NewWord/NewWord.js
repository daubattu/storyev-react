import React, { useState } from "react";

import { Card, Button, Icon, Modal } from "antd";
import PageHeader from "components/PageHeader/PageHeader";
import { FormNewWord } from "components/Form";

import styles from './NewWord.module.scss';

export default () => {
  const [selected, setSelected] = useState({});
  const [visibleModal, setVisibleModal] = useState(false);

  const isEdit = !!selected.id;

  const handleOnSubmit = _newWord => {
    console.log(_newWord);
  };

  const handleOnCancel = () => setVisibleModal(false);
  
  return (
    <>
      <PageHeader
        title="Quan ly tu moi"
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => {
              setSelected({});
              setVisibleModal(true);
            }}
          >
            <Icon type="plus" /> Them moi
          </Button>
        ]}
      />
      <Card>
        <h1>New word</h1>
        <Modal
          className={styles.modal}
          title={isEdit ? "Chinh sua tu moi" : "Them tu moi"}
          visible={visibleModal}
          onCancel={() => setVisibleModal(false)}
          footer={null}
        >
          <FormNewWord handleOnSubmit={handleOnSubmit} handleOnCancel={handleOnCancel} formValue={selected} />
        </Modal>
      </Card>
    </>
  );
};
