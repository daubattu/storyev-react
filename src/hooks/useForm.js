import { useState, useCallback, useEffect } from 'react';
import { isEmpty } from 'utils';

function useForm(schema) {
  const [values, setValues] = useState(schema.fields);
  const [errors, setErrors] = useState({});

  const onChange = useCallback(
    (key, value) => {
      if (errors[key]) {
        setErrors({
          ...errors,
          [key]: null
        });
      }
      setValues({ ...values, [key]: value });
    },
    [values, errors]
  );

  const setFields = useCallback(fields => setValues(fields), []);

  useEffect(() => {
    setValues(schema.fields);
  }, [schema.fields]);

  const validateCallback = useCallback(() => {
    if (schema.validators) {
      for (const [field, validators] of Object.entries(schema.validators)) {
        for (const validator of validators) {
          if (validator.type === 'required' && isEmpty(values[field])) {
            return {
              [field]: validator.message
            };
          }
        }
      }
    }
    return null;
  }, [values, schema.validators]);

  const onSubmit = useCallback(
    callback => {
      setErrors({});
      const error = validateCallback();
      if (!error) {
        callback();
      } else {
        setErrors(error);
      }
    },
    [validateCallback]
  );

  return [
    { values, errors },
    { onChange, onSubmit, setErrors, setFields, setValues }
  ];
}

export default useForm;