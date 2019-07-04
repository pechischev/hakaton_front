import {CustomForm} from "../../components/custom-form";
import * as React from "react";
import {ReactNode} from "react";
import {FormRenderProps} from "react-final-form";
import {Button, Grid} from "@material-ui/core";
import {PlacemarkFields} from "./PlacemarkFields";
import {FormContext, IFormContext} from "./MapWrapper";

export const AddPlacemarkForm = () => {
    return (
        <FormContext.Consumer>
            {({store}: IFormContext) => (
                <CustomForm
                    submit={(data) => store.createPoint(data)}
                    render={getFields}
                />
            )}
        </FormContext.Consumer>
    );
};

function getFields(api: FormRenderProps<object>, submitting?: boolean): ReactNode {
    return (
        <Grid container>
            <PlacemarkFields/>
            <Grid container style={{padding: 10, marginTop: 20}}>
                <Button disabled={!submitting} variant="outlined"
                        onClick={() => api.handleSubmit()}>Добавить</Button>
            </Grid>
        </Grid>

    );
}