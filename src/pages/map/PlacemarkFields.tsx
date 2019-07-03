import * as React from "react";
import {Component, ReactNode} from "react";
import {Grid} from "@material-ui/core";
import {InputField, ISelectOption, SelectField} from "../../components/fields";

export class PlacemarkFields extends Component {
    private types: ISelectOption[] = [];
    private specializations: ISelectOption[] = [];

    constructor(props: {}) {
        super(props);
    }

    render(): ReactNode {
        return (
            <Grid container>
                <SelectField name={"type"} label={"Тип точки"} options={this.types}/>
                <SelectField name={"specialization"} label={"Вид специализации"} options={this.specializations}/>
                <InputField name={"info_number"} label={"Номер документа"}/>
                <InputField name={"info_action"} label={"Срок действия"}/>
                <InputField name={"scheme_number"} label={"Номер в схеме"}/>
                <InputField name={"square"} label={"Площадь"}/>
            </Grid>
        );
    }

}