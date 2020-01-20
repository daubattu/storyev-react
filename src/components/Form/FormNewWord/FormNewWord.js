import React from "react";
import { Form, Input, Button, Col, Row, Upload, Icon, Select } from "antd";
import FormItem from "../FormItem";

import useForm from "hooks/useForm";

import styles from "./FormNewWord.module.scss";
import { uploadService } from "services";

const { TextArea } = Input;
const { Option } = Select;

const initialForm = {
  word: "",
  spelling_bre: "",
  type: "",
  part: "",
  story_id: "",
  audio_name: "",
  audio_bre: "",
  example: "",
  mean: ""
};

const validators = {
  word: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  mean_vn: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  mean_en: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  spelling_bre: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  spelling_name: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  audio_bre: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  audio_name: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  type: [
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
  story_id: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  example: [
    {
      type: "required",
      message: "This field is required!"
    }
  ]
};

export default ({
  handleOnSubmit,
  handleOnCancel,
  formValue = {},
  submitText
}) => {
  const [{ values, errors }, { onSubmit, onChange, setValues }] = useForm({
    fields: formValue.id ? formValue : initialForm,
    validators
  });

  const _onSubmit = event => {
    event.preventDefault();
    console.log(values);
    onSubmit(() => {
      handleOnSubmit({
        ...values,
        part: Number(values.part),
        story_id: Number(values.story_id)
      }).then(() => setValues(initialForm));
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
      <FormItem label="Tu moi" validateStatus="error" help={errors.word}>
        <Input
          value={values.word}
          onChange={event => onChange("word", event.target.value)}
        />
      </FormItem>
      <Row gutter={12}>
        <Col span={12}>
          <FormItem
            label="Phien am Bre"
            validateStatus="error"
            help={errors.spelling_bre}
          >
            <Input
              value={values.spelling_bre}
              onChange={event => onChange("spelling_bre", event.target.value)}
            />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label="Phien am NAmE"
            validateStatus="error"
            help={errors.spelling_name}
          >
            <Input
              value={values.spelling_name}
              onChange={event => onChange("spelling_name", event.target.value)}
            />
          </FormItem>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <FormItem
            label="Audio Bre"
            validateStatus="error"
            help={errors.audio_bre}
          >
            <Upload
              accept="audio/*"
              showUploadList={{ showDownloadIcon: false }}
              customRequest={({ onSuccess, onError, file, onProgress }) =>
                customRequest({ onSuccess, onError, file, onProgress })(
                  "audio_bre"
                )
              }
            >
              <Button>
                <Icon type="upload" /> Chon file
              </Button>
            </Upload>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label="Audio NAmE"
            validateStatus="error"
            help={errors.audio_name}
          >
            <Upload
              style={{ width: "100%" }}
              accept="audio/*"
              showUploadList={{ showDownloadIcon: false }}
              customRequest={({ onSuccess, onError, file, onProgress }) =>
                customRequest({ onSuccess, onError, file, onProgress })(
                  "audio_name"
                )
              }
            >
              <Button>
                <Icon type="upload" /> Chon file
              </Button>
            </Upload>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="Nghĩa TV" validateStatus="error" help={errors.mean_vn}>
        <Input
          value={values.mean_vn}
          onChange={event => onChange("mean_vn", event.target.value)}
        />
      </FormItem>
      <FormItem label="Nghĩa TA" validateStatus="error" help={errors.mean_en}>
        <Input
          value={values.mean_en}
          onChange={event => onChange("mean_en", event.target.value)}
        />
      </FormItem>
      <Row gutter={12}>
        <Col span={8}>
          <FormItem label="Loai tu" validateStatus="error" help={errors.type}>
            <Select
              value={values.type}
              onChange={value => onChange("type", value)}
            >
              <Option value="Danh từ">Danh từ</Option>
              <Option value="Động từ">Động từ</Option>
              <Option value="Tính từ">Tính từ</Option>
              <Option value="Trạng từ">Trạng từ</Option>
              <Option value="Phó từ">Phó từ</Option>
              <Option value="Giới từ">Giới từ</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem label="Phan" validateStatus="error" help={errors.part}>
            <Select
              value={values.part}
              onChange={value => onChange("part", value)}
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
        <Col span={8}>
          <FormItem
            label="ID truyen"
            validateStatus="error"
            help={errors.story_id}
          >
            <Input
              value={values.story_id}
              onChange={event => onChange("story_id", event.target.value)}
            />
          </FormItem>
        </Col>
      </Row>
      <FormItem label="Vi du" validateStatus="error" help={errors.example}>
        <TextArea
          value={values.example}
          onChange={event => onChange("example", event.target.value)}
        />
      </FormItem>
      <FormItem className="row-action">
        <Button onClick={handleOnCancel}>Huy</Button>
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
      </FormItem>
    </Form>
  );
};
