import * as React from "react";
import {FC, Fragment, useState} from "react";
import {Button, Dialog, DialogContent, DialogTitle, Grid, Typography} from "@material-ui/core";
import {FormContext, IFormContext} from "./MapWrapper";
import {reverse, stubObject} from "lodash";
import {InfoContext, UserContext} from "../../connector/AppContext";
import {observer} from "mobx-react";

const LAYER_OFFSET = 30;

export const ViewPlacemarkForm: FC = observer(() => {
    const [layer, setLayer] = useState(0)
    const [open, setOpen] = useState(false)

    return (
        <FormContext.Consumer>
            {({onUpdate, onRemove, selectedItem = stubObject()}: IFormContext) => {

                const {images = []} = selectedItem;

                // @ts-ignore
                const revertImages = reverse(images.slice());
                const image = !!revertImages[layer] ? revertImages[layer].image : "";
                const title = !!revertImages[layer] ? revertImages[layer].title : "";

                return (
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

                        <Grid container direction={"row"} className={"layer-container"}>
                            <div className="layer-image">
                                <span>
                                <img src={ image } className="layer-image__image" onClick={() => setOpen(true)}/>
                                </span>

                            </div>
                            <div className="layer-list">
                                <Grid container direction={"column"}>
                                    <Grid item>
                                        <Typography display={"inline"} variant={"body1"}>
                                         <span className="layer-list__title" style={{
                                             top: LAYER_OFFSET * ((images as Array<object>).length + 1),
                                         }}>{title}</span>
                                        </Typography>
                                    </Grid>
                                    <Grid item style={{position: 'relative'}}>
                                    {revertImages.map((item: object, index: number) =>
                                        <span
                                            key={index}
                                            className="layer-list__item"
                                            data-active={layer == index}
                                            style={{
                                                top: LAYER_OFFSET * index,
                                                zIndex: ((images as Array<object>).length + 1) - index
                                            }}
                                            onClick={() => setLayer(index)}
                                        />)
                                    }
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth={"md"}>
                            <DialogTitle>{ title }</DialogTitle>
                            <DialogContent style={{ textAlign: 'center', padding: '20px'}}>
                                <img src={ image } style={{width: 800, height: 'auto' }}/>
                            </DialogContent>
                        </Dialog>

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
                )
            }}

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
