import * as React from "react";
import {FC} from "react";
import {Field, FieldRenderProps} from "react-final-form";
import {IField} from "./IField";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import * as _ from "lodash";

export type ISelectOption = {id: number; label: string};

interface ISelectFieldProps extends IField {
    options: ISelectOption[];
}

const id = _.uniqueId("select");

export const SelectField: FC<ISelectFieldProps> = ({name, label, options}) => {

    return (
        <FormControl fullWidth style={{margin: 10}}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <Field
                name={name}
                formControlProps={{ fullWidth: true }}
            >
                {(props: FieldRenderProps<any, any>) => {
                    return (
                        <Select
                            autoWidth
                            {...props.input}
                        >
                            {
                                options.map(({id, label}, index) => (<MenuItem value={id} key={index}>{label}</MenuItem>))
                            }
                        </Select>
                    )
                }}
            </Field>
        </FormControl>
    );
};