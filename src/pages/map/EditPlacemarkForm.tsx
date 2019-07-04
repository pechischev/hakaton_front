import {CustomForm} from "../../components/custom-form";
import * as React from "react";
import {FC} from "react";
import {FormRenderProps} from "react-final-form";
import {Button, Grid} from "@material-ui/core";
import {PlacemarkFields} from "./PlacemarkFields";
import {FormContext, IFormContext, IItem} from "./MapWrapper";
import {stubObject} from "lodash";


export const EditPlacemarkForm: FC = () => {
    return (
        <FormContext.Consumer>
            {({onUpdate, onRemove, selectedItem = stubObject(), store}: IFormContext) => (
                <CustomForm
                    submit={(data) => {
                        store.editPoint(data);
                    }}
                    data={transformData(selectedItem)}
                    render={(api: FormRenderProps<object>, submitting?: boolean) => (
                        <Grid container>
                            <PlacemarkFields/>
                            <Grid container style={{margin: 10, marginTop: 20}}>
                                <Grid item style={{marginRight: 10}}>
                                    <Button disabled={!submitting} variant="outlined"
                                            onClick={() => api.handleSubmit()}>Изменить</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color={"secondary"} onClick={onRemove}>Отменить</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                />
            )}
        </FormContext.Consumer>
    );
};

function transformData(data: IItem): any {
    return data;
}