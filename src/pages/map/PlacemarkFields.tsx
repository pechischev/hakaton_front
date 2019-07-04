import * as React from "react";
import {Component, ReactNode} from "react";
import {Grid} from "@material-ui/core";
import {InputField, SelectField} from "../../components/fields";
import {InfoContext} from "../../connector/AppContext";

export class PlacemarkFields extends Component {

    render(): ReactNode {
        return (
            <Grid container>
                <SelectField name={"type"} label={"Тип точки"} options={InfoContext().getOptionTypes()}/>
                <SelectField name={"specialization"} label={"Вид специализации"} options={InfoContext().getOptionSpecializations()}/>
                <InputField name={"info_number"} label={"Номер документа"}/>
                <InputField name={"info_action"} label={"Срок действия"}/>
                <InputField name={"scheme_number"} label={"Номер в схеме"}/>
                <InputField name={"square"} label={"Площадь"}/>
            </Grid>
        );
    }

}