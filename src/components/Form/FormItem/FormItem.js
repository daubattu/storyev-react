import React, { useMemo } from 'react';
import { Form } from 'antd';

export default ({ label, children, validateStatus, help, ...rest }) => {
  const props = useMemo(
    () => {
      if (help && validateStatus) {
        return {
          validateStatus,
          help
        };
      }
      return {};
    },
    [validateStatus, help]
  );

  return (
    <Form.Item label={label} {...props} {...rest}>
      { children }
    </Form.Item>
  )
}