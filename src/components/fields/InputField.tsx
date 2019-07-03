import {ComponentType, FC} from "react";
import {Field} from "react-final-form";
import * as React from "react";
import {TextField} from "@material-ui/core";
import {IField} from "./IField";

export const InputField: FC<IField> = ({
    name, label, placeholder, type, required
                                       }) => {
    return (
        <Field
            fullWidth
            required={required}
            name={name}
            type={type}
            label={label}
            component={TextField as unknown as ComponentType<any>}
        />

    );
};