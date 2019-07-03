import * as React from "react";
import {FC, Fragment} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {FormContext, IFormContext} from "./MapWrapper";
import {stubObject} from "lodash";
import {UserContext} from "../../connector/AppContext";
import {observer} from "mobx-react";

export const ViewPlacemarkForm: FC = observer(() => {
    return (
        <FormContext.Consumer>
            {({onUpdate, onRemove, selectedItem = stubObject()}: IFormContext) => (
                <Fragment>
                    <Grid container direction={"column"}>
                        <Grid item>
                            <Typography display={"inline"} variant={"body1"}>Тип точки: </Typography>
                            <Typography display={"inline"} variant={"body2"}>{selectedItem.type}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography display={"inline"} variant={"body1"}>Вид специализации: </Typography>
                            <Typography display={"inline"} variant={"body2"}>{selectedItem.specialization}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography display={"inline"} variant={"body1"}>Номер документа: </Typography>
                            <Typography display={"inline"} variant={"body2"}>{selectedItem.info}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography display={"inline"} variant={"body1"}>Срок действия: </Typography>
                            <Typography display={"inline"} variant={"body2"}>{selectedItem.info}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography display={"inline"} variant={"body1"}>Номер в схеме: </Typography>
                            <Typography display={"inline"} variant={"body2"}>{selectedItem.scheme_number}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography display={"inline"} variant={"body1"}>Площадь: </Typography>
                            <Typography display={"inline"} variant={"body2"}>{selectedItem.square}</Typography>
                        </Grid>
                    </Grid>
                    {UserContext().isLoggedIn() &&
                        <Grid container style={{margin: 10}}>
                            <Grid item style={{marginRight: 10}}>
                                <Button variant="contained" onClick={onUpdate}>Изменить</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color={"secondary"} onClick={onRemove}>Удалить</Button>
                            </Grid>
                        </Grid>
                    }
                </Fragment>
            )}

        </FormContext.Consumer>
    );
});