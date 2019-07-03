import {CustomForm} from "../../components/custom-form";
import * as React from "react";
import {ReactNode} from "react";
import {FormRenderProps} from "react-final-form";
import {Button, Grid} from "@material-ui/core";
import {PlacemarkFields} from "./PlacemarkFields";

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
        <Grid container>
            <PlacemarkFields/>
            <Grid container style={{margin: 10}}>
                <Button disableFocusRipple={!submitting} variant="contained"
                        onClick={() => api.handleSubmit()}>Добавить</Button>
            </Grid>
        </Grid>

    );
}