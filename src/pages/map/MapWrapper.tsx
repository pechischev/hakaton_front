import * as React from "react";
import {Component, ReactNode, createRef, RefObject, Fragment} from "react";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import {Button, Grid} from "@material-ui/core";
import {Sidebar} from "../../components/wrapper/Sidebar";
import {Popup} from "../../components/popup";
import {autobind} from "core-decorators";
import {Nullable} from "../../react-app-env";

interface IItem {
    id: number;
    name: string;
    pos: number[];
}

@autobind
export class MapWrapper extends Component {
    private items: IItem[] = [];

    private popupRef: RefObject<Popup> = createRef();
    private currentPos: number[] = [];

    render(): ReactNode {
        return (
            <React.Fragment>
                <div style={{position: "absolute", width: "100%", height: "100%"}}>
                    <YMaps>
                        <Map
                            defaultState={{center: [56.630842, 47.886089], zoom: 16, controls: []}}
                            style={{width: "100%", height: "100%"}}
                            onClick={this.onMapClick}
                        >
                            {this.items.map((item, index) => {
                                return (
                                    <Placemark key={index} geometry={item.pos}/>
                                )
                            })}
                        </Map>
                    </YMaps>
                </div>
                <Grid container style={{position: "relative"}}>
                    <Grid item>
                        <Sidebar/>
                    </Grid>
                    <Grid item/>
                </Grid>
                <Popup
                    ref={ this.popupRef }
                    title={ "Добавить стационарный объект?" }
                    renderActions={ (props) => {
                        return (
                            <Fragment>
                                <Button
                                    color="primary"
                                    onClick={ () => {
                                        props.show(false);
                                        // this.setState({mode: EFormType.APPEND});
                                    } }
                                >
                                    Добавить
                                </Button>
                                <Button color="secondary" onClick={ () => props.show(false) }>Отменить</Button>
                            </Fragment>
                        );
                    } }
                />
            </React.Fragment>
        )
    }

    private onMapClick(event: any): void {
        this.currentPos = event.get("coords");
        const popup = this.popupRef.current;
        if (popup && !popup.isShow()) {
            popup.open();
        }
    }
}