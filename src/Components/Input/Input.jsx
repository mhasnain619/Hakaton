import React from "react";
import TextField from "@mui/material/TextField";

const Input = ({ label, type, placeholder, onChangeEvent, value, text, InputProps, error, helperText, select = false }) => {
    return (
        <TextField
            fullWidth
            sx={{ margin: "0px 5px" }}
            value={value}
            label={label}
            onChange={onChangeEvent}
            type={type}
            error={error}
            helperText={helperText}
            placeholder={placeholder}
            select={select} // Only enable select when needed
            InputProps={InputProps}
        >
            {select ? text : null}
        </TextField>
    );
};

export default Input;
