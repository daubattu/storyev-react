import React, { useState, useEffect } from "react";

import { Card, Button, Icon, Modal, Spin } from "antd";
import PageHeader from "components/PageHeader/PageHeader";
import { FormNewWord } from "components/Form";
import ListNewWord from "components/ListNewWord/ListNewWord";

import { newWordService } from "services";

import styles from "./NewWord.module.scss";

export default () => {
  const [newwords, setNewWords] = useState();
  const [selected, setSelected] = useState({});
  const [visibleModal, setVisibleModal] = useState(false);

  const isEdit = !!selected.id;

  useEffect(() => {
    newWordService
      .getNewWords()
      .then(response => setNewWords(response))
      .catch(() => setNewWords([]));
  }, []);

  const handleOnSubmit = _newWord => {
    return newWordService.addNewWord(_newWord);
  };

  const handleOnCancel = () => setVisibleModal(false);

  const handleDelete = id => {
    setNewWords(newwords.filter(nw => nw.id !== id));
    newWordService.deleteNewWord(id);
  };

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
        {newwords ? (
          <ListNewWord
            handleDelete={handleDelete}
            data={newwords.map(nw => ({ ...nw, key: nw.id }))}
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

        <Modal
          className={styles.modal}
          title={isEdit ? "Chinh sua tu moi" : "Them tu moi"}
          visible={visibleModal}
          onCancel={() => setVisibleModal(false)}
          footer={null}
        >
          <FormNewWord
            handleOnSubmit={handleOnSubmit}
            handleOnCancel={handleOnCancel}
            formValue={selected}
          />
        </Modal>
      </Card>
    </>
  );
};
