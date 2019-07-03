import * as React from "react";
import {FC} from "react";
import {Field, FieldRenderProps} from "react-final-form";
import {TextField} from "@material-ui/core";
import {IField} from "./IField";
import {TextFieldProps} from "@material-ui/core/TextField/TextField";

export const InputField: FC<IField & TextFieldProps> = ({
                                           name, label, placeholder, type, required, mask, format, parse, ...rest
                                       }) => {
    return (
        <Field
            name={name}
            type={type}
        >
            {
                (props: FieldRenderProps<string | number, any>) => {
                    return (
                        <TextField
                            fullWidth
                            label={label}
                            required={required}
                            inputProps={props.input}
                            style={{margin: 10}}
                            {...rest}
                        />
                    )
                }
            }
        </Field>

    );
};