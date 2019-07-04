import * as React from "react";
import {FC, Fragment} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {FormContext, IFormContext} from "./MapWrapper";
import {stubObject} from "lodash";
import {InfoContext, UserContext} from "../../connector/AppContext";
import {observer} from "mobx-react";

export const ViewPlacemarkForm: FC = observer(() => {
    return (
        <FormContext.Consumer>
            {({onUpdate, onRemove, selectedItem = stubObject()}: IFormContext) => (
                <Fragment>
                    <Grid container direction={"column"}>
                        <Grid item style={{margin: 10}}>
                            <Typography display={"inline"} variant={"body1"}>Адрес: </Typography>
                            <Typography display={"inline"} variant={"body1"}>{selectedItem.address}</Typography>
                        </Grid>
                        <Grid item style={{margin: 10}}>
                            <Typography display={"inline"} variant={"body1"}>Тип точки: </Typography>
                            <Typography display={"inline"} variant={"body1"}>{getTypeTitle(selectedItem.type)}</Typography>
                        </Grid>
                        <Grid item style={{margin: 10}}>
                            <Typography display={"inline"} variant={"body1"}>Вид специализации: </Typography>
                            <Typography display={"inline"} variant={"body1"}>{getSpecializationTitle(selectedItem.specialization)}</Typography>
                        </Grid>
                        <Grid item style={{margin: 10}}>
                            <Typography display={"inline"} variant={"body1"}>Номер документа: </Typography>
                            <Typography display={"inline"} variant={"body1"}>{selectedItem.info_number}</Typography>
                        </Grid>
                        <Grid item style={{margin: 10}}>
                            <Typography display={"inline"} variant={"body1"}>Срок действия: </Typography>
                            <Typography display={"inline"} variant={"body1"}>{selectedItem.info_action}</Typography>
                        </Grid>
                        <Grid item style={{margin: 10}}>
                            <Typography display={"inline"} variant={"body1"}>Номер в схеме: </Typography>
                            <Typography display={"inline"} variant={"body1"}>{selectedItem.scheme_number}</Typography>
                        </Grid>
                        <Grid item style={{margin: 10}}>
                            <Typography display={"inline"} variant={"body1"}>Площадь: </Typography>
                            <Typography display={"inline"} variant={"body1"}>{selectedItem.square}</Typography>
                        </Grid>
                        <Grid item style={{margin: 10}}>
                            <Typography display={"inline"} variant={"body1"}>Статус объекта: </Typography>
                            <Typography display={"inline"} variant={"body1"}>{selectedItem.status == 1 ? "Занято" : "Свободно"}</Typography>
                        </Grid>
                    </Grid>
                    {UserContext().isLoggedIn() &&
                        <Grid container style={{margin: 10, marginTop: 20}}>
                            <Grid item style={{marginRight: 10}}>
                                <Button onClick={onUpdate}>Изменить</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color={"secondary"} onClick={onRemove}>Удалить</Button>
                            </Grid>
                        </Grid>
                    }
                </Fragment>
            )}

        </FormContext.Consumer>
    );
});

function getTypeTitle(id: number): string {
    const types = InfoContext().types;
    const type = types.find((value) => value.id === id);
    if (type) {
        return type.title;
    }
    return "";
}

function getSpecializationTitle(id: number): string {
    const specializations = InfoContext().specializations;
    const specialization = specializations.find((value) => value.id === id);
    if (specialization) {
        return specialization.title;
    }
    return "";
}