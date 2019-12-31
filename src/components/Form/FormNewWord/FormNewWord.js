import React from "react";
import { Form, Input, Button, Col, Row, Upload, Icon } from "antd";
import FormItem from "../FormItem";

import useForm from "hooks/useForm";

import styles from "./FormNewWord.module.scss";
import { uploadService } from "services";

const { TextArea } = Input;

const initialForm = {
  word: "",
  spelling: "",
  // part_id: "",
  // story_id: "",
  audio_us: "",
  audio_uk: "",
  example: ""
};

const validators = {
  word: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  spelling: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  audio_us: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  audio_uk: [
    {
      type: "required",
      message: "This field is required!"
    }
  ],
  // part_id: [
  //   {
  //     type: "required",
  //     message: "This field is required!"
  //   }
  // ],
  // story_id: [
  //   {
  //     type: "required",
  //     message: "This field is required!"
  //   }
  // ],
  example: [
    {
      type: "required",
      message: "This field is required!"
    }
  ]
};

export default ({ handleOnSubmit, handleOnCancel, formValue = {} }) => {
  const [{ values, errors }, { onSubmit, onChange }] = useForm({
    fields: formValue.id ? formValue : initialForm,
    validators
  });

  const _onSubmit = event => {
    event.preventDefault();
    console.log(values);
    onSubmit(() => {
      handleOnSubmit(values);
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
          onChange(field, process.env.REACT_APP_BASE_URL + "/" + response)
          onSuccess();
        })
        .catch(onError);
    };
  };

  return (
    <Form onSubmit={_onSubmit} className={styles.wrapper}>
      <Row gutter={12}>
        <Col span={12}>
          <FormItem label="Tu moi" validateStatus="error" help={errors.word}>
            <Input
              value={values.word}
              onChange={event => onChange("word", event.target.value)}
            />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label="Phien am"
            validateStatus="error"
            help={errors.spelling}
          >
            <Input
              value={values.word}
              onChange={event => onChange("spelling", event.target.value)}
            />
          </FormItem>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <FormItem
            label="Audio US"
            validateStatus="error"
            help={errors.audio_us}
          >
            <Upload
              accept="audio/*"
              showUploadList={{ showDownloadIcon: false }}
              customRequest={({ onSuccess, onError, file, onProgress }) =>
                customRequest({ onSuccess, onError, file, onProgress })(
                  "audio_us"
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
            label="Audio UK"
            validateStatus="error"
            help={errors.audio_uk}
          >
            <Upload onChange={event => console.log(event)}>
              <Button>
                <Icon type="upload" /> Chon file
              </Button>
            </Upload>
          </FormItem>
        </Col>
      </Row>
      {/* <Row gutter={12}>
        <Col span={12}>
          <FormItem label="Phan" validateStatus="error" help={errors.part_id}>
            <Input
              value={values.part_id}
              onChange={event => onChange("part_id", event.target.value)}
            />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label="Truyen"
            validateStatus="error"
            help={errors.story_id}
          >
            <Input
              value={values.story_id}
              onChange={event => onChange("story_id", event.target.value)}
            />
          </FormItem>
        </Col>
      </Row> */}
      <FormItem label="Vi du" validateStatus="error" help={errors.example}>
        <TextArea
          value={values.example}
          onChange={event => onChange("example", event.target.value)}
        />
      </FormItem>
      <FormItem className="row-action">
        <Button onClick={handleOnCancel}>Huy</Button>
        <Button type="primary" htmlType="submit">
          Them
        </Button>
      </FormItem>
    </Form>
  );
};
