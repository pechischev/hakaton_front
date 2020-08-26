import {CustomForm} from "../../components/custom-form";
import * as React from "react";
import {ReactNode, useState} from "react";
import {FormRenderProps} from "react-final-form";
import {Button, Grid} from "@material-ui/core";
import {PlacemarkFields} from "./PlacemarkFields";
import {FormContext, IFormContext} from "./MapWrapper";
import {LayerForm} from "../../components/LayerForm";

export const AddPlacemarkForm = () => {
    const [open, setOpen] = useState(false)

    return (
        <FormContext.Consumer>
            {({store}: IFormContext) => (
                <CustomForm
                    submit={(data: object) => store.createPoint(data)}
                    render={(api, submitting) => getFields(api, submitting, open, setOpen)}
                />
            )}
        </FormContext.Consumer>
    );
};

function getFields(api: FormRenderProps<object>, submitting: boolean = false, open: boolean, setOpen: any): ReactNode {
    return (
        <Grid container>
            <PlacemarkFields/>
            <LayerForm
                images={(api.form.getState().values  as any).images || {}}
                updateImages={ (images) => {
                    api.form.change('images', images)
                }}
            />
            <Grid container style={{padding: 10, marginTop: 20}}>
                <Button disabled={!submitting} variant="outlined"
                        onClick={() => api.handleSubmit()}>Добавить</Button>
            </Grid>
        </Grid>

    );
}
