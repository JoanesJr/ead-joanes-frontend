import { useEffect, useState } from "react";
import Select,{ SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { useField } from "@unform/core";

type optionsSelect = {
  title: string;
  value: any;
}

type TVSelectProps = {
  name: string;
  label: string;
  options: optionsSelect[];
  disabled: boolean;
};

export const VSelect: React.FC<TVSelectProps> = ({ name, label, options, disabled = false, ...rest }) => {
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
    <>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        {...rest}
        error={!!error}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={() => (error ? clearError() : undefined)}
        disabled={disabled}
      >
        {options.map(option => (
          <MenuItem key={option.title} value={option.value}>{option.title}</MenuItem>
        ))}
      </Select>
    </>
  );
};
