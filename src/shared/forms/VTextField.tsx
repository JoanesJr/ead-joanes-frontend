import { useEffect, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";

type TVTextFieldProps = TextFieldProps & {
  name: string;
  type?: string;
};

export const VTextField: React.FC<TVTextFieldProps> = ({ name, type, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);

  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={() => (error ? clearError() : undefined)}
    />
  );
};