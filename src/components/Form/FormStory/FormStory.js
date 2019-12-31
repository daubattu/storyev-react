import React from "react";
import { Form, Input, Button, Col, Row, Upload, Icon, Select } from "antd";
import FormItem from "../FormItem";

import useForm from "hooks/useForm";

import styles from "./FormStory.module.scss";

import { uploadService } from "services";

const { TextArea } = Input;
const { Option } = Select;

const initialForm = {
  name: "",
  part: "",
  en: "",
  vn: "",
  audio: ""
};

const validators = {
  name: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  part: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  en: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  vn: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  audio: [
    {
      type: "required",
      message: "This field is required!"
    }
  ]
};

export default ({ handleOnSubmit, formValue = {} }) => {
  const [{ values, errors }, { onSubmit, onChange, setValues }] = useForm({
    fields: formValue.id ? formValue : initialForm,
    validators
  });

  const _onSubmit = event => {
    event.preventDefault();
    console.log(values);
    onSubmit(() => {
      handleOnSubmit(values).then(() => setValues(initialForm));
    });
  };

  const customRequest = ({ onSuccess, onError, file, onProgress }) => {
    return field => {
      uploadService(file, {
        onUploadProgress: event => {
          onProgress({ percent: (event.loaded / event.total) * 100 });
        }
      })
        .then(response => {
          onChange(field, process.env.REACT_APP_BASE_URL + "/" + response);
          onSuccess();
        })
        .catch(onError);
    };
  };

  return (
    <Form onSubmit={_onSubmit} className={styles.wrapper}>
      <Row gutter={12}>
        <Col span={20}>
          <FormItem
            label="Ten truyen"
            validateStatus="error"
            help={errors.word}
          >
            <Input
              value={values.name}
              onChange={event => onChange("name", event.target.value)}
            />
          </FormItem>
        </Col>
        <Col span={4}>
          <FormItem label="Phan" validateStatus="error" help={errors.part}>
            <Select
              value={values.part}
              onChange={value => onChange("part", Number(value))}
            >
              <Option value="1">Phan 1</Option>
              <Option value="2">Phan 2</Option>
              <Option value="3">Phan 3</Option>
              <Option value="4">Phan 4</Option>
              <Option value="5">Phan 5</Option>
              <Option value="6">Phan 6</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="Audio" validateStatus="error" help={errors.audio}>
        <Upload
          accept="audio/*"
          showUploadList={{ showDownloadIcon: false }}
          customRequest={({ onSuccess, onError, file, onProgress }) =>
            customRequest({ onSuccess, onError, file, onProgress })("audio")
          }
        >
          <Button>
            <Icon type="upload" /> Chon file
          </Button>
        </Upload>
      </FormItem>
      <Row gutter={12}>
        <Col span={12}>
          <FormItem label="Vietnamese" validateStatus="error" help={errors.vn}>
            <TextArea
              rows={20}
              value={values.vn}
              onChange={event => onChange("vn", event.target.value)}
            />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label="English" validateStatus="error" help={errors.en}>
            <TextArea
              rows={20}
              value={values.en}
              onChange={event => onChange("en", event.target.value)}
            />
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        <Button type="primary" htmlType="submit">
          Them
        </Button>
      </FormItem>
    </Form>
  );
};
