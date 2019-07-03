import {CustomForm} from "../../components/custom-form";
import * as React from "react";
import {FormRenderProps} from "react-final-form";
import {ReactNode} from "react";
import {Button, Grid} from "@material-ui/core";
import {InputField} from "../../components/fields";

export const AddPlacemarkForm = () => {
    return (
        <CustomForm
            submit={(data) => {
                console.log(data);
            }}
            render={getFields}
        />
    );
};

function getFields(api: FormRenderProps<object>, submitting?: boolean): ReactNode {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <InputField required name={"type"} label={"Тип точки"}/>
                <InputField name={"specialization"} label={"Вид специализации"} />
                <InputField name={"info_number"} label={"Номер документа"} />
                <InputField name={"info_action"} label={"Срок действия"} />
                <InputField name={"scheme_number"} label={"Номер в схеме"}/>
                <InputField name={"square"} label={"Площадь"}/>
            </Grid>
            <Grid item xs={12} style={{margin: 10}}>
                <Button disableFocusRipple={!submitting} variant="contained" onClick={ () => api.handleSubmit() }>Добавить</Button>
            </Grid>
        </Grid>

    );
}