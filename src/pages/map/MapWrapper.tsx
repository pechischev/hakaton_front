import * as React from "react";
import {Component, createRef, Fragment, ReactNode, RefObject} from "react";
import {Clusterer, Map, Placemark, SearchControl, YMaps} from "react-yandex-maps";
import {Button, Grid} from "@material-ui/core";
import {Sidebar} from "../../components/wrapper/Sidebar";
import {Popup} from "../../components/popup";
import {EFormType} from "./interfaces";
import {InnerForm} from "../../components/inner-form";
import "./map.scss"
import {FormCreator} from "./formCreator";
import {Nullable} from "../../react-app-env";
import {get, stubObject} from "lodash";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {UserContext} from "../../connector/AppContext";
import {Store} from "../../entities/store";

export interface IItem {
    id: number;
    address: string;
    type: string;
    square: string;
    specialization: string;
    info: string;
    scheme_number: string;
    positionx: number;
    positiony: number;
}

interface IState {
    currentPos: number[];
    mode: EFormType;
    items: IItem[];
    selectedItem: Nullable<IItem>;
}

const mapDefaultState = {
    center: [56.630842, 47.886089],
    zoom: 16,
    controls: []
};

export interface IFormContext {
    selectedItem: Nullable<IItem>;

    onUpdate(): void;

    onView(): void;

    onRemove(): void;
}


export const FormContext = React.createContext<IFormContext>(stubObject());

export const store = new Store();

@observer
@autobind
export class MapWrapper extends Component<{}, IState> {
    state = {
        currentPos: [],
        mode: EFormType.NONE,
        items: [{
            id: 1,
            positionx: 56.630842,
            positiony: 47.886089,
            address: "aaaa",
            type: "aaaa",
            square: "aaa",
            specialization: "ss",
            info: "asdasdd",
            scheme_number: "6.2.153.6"
        }],
        selectedItem: void 0,
    };

    private popupRef: RefObject<Popup> = createRef();

    constructor(props: {}) {
        super(props);

        store.asyncCall(store.transport.getPoints()).then((data) => {
            const items = get(data, "data", []);
            this.setState({items});
        })
    }

    render(): ReactNode {
        const showForm = this.state.mode !== EFormType.NONE;
        return (
            <React.Fragment>
                <YMaps query={{
                    lang: "ru_RU",
                    apikey: "4440a4db-1f0a-474f-9523-26d97bb3e509"
                }}>
                <div style={{position: "absolute", width: "100%", height: "100vh"}}>

                        <Map
                            defaultState={mapDefaultState}
                            style={{width: "100%", height: "100vh"}}
                            onClick={(event: any) => this.onMapClick(event)}
                        >
                            <SearchControl options={{ float: 'right'}}/>
                            {!!this.state.currentPos.length && (
                                <Placemark geometry={this.state.currentPos}/>
                            )}
                            <Clusterer>
                                {this.state.items.map((item: IItem, index) => {
                                    return (
                                        <Placemark key={index} geometry={[item.positionx, item.positiony]}
                                                   onClick={() => this.setState({
                                                       selectedItem: item,
                                                       mode: EFormType.VIEW
                                                   })}/>
                                    )
                                })}
                            </Clusterer>
                        </Map>

                </div>
                <Grid item className="sidebar-container" xs={1}>
                    <Sidebar/>
                </Grid>

                <FormContext.Provider value={{
                    onUpdate: this.onUpdate,
                    onView: this.onView,
                    onRemove: this.onRemove,
                    selectedItem: this.state.selectedItem
                }}>

                    {showForm && (
                        <div className="form-container">
                            <InnerForm show={showForm} onClose={this.onCloseForm.bind(this)}
                                       title={FormCreator.getTitleForm(this.state.mode)}>
                                {FormCreator.createForm(this.state.mode)}
                            </InnerForm>
                        </div>
                    )}
                </FormContext.Provider>

                <Popup
                    ref={this.popupRef}
                    title={"Добавить стационарный объект?"}
                    renderActions={(props) => {
                        return (
                            <Fragment>
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    onClick={() => {
                                        props.show(false);
                                        this.setState({mode: EFormType.APPEND});
                                    }}
                                >
                                    Добавить
                                </Button>
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    onClick={() => {
                                        props.show(false);
                                        this.setState({mode: EFormType.NONE, currentPos: []});
                                    }}>Отменить</Button>
                            </Fragment>
                        );
                    }}
                />
                </YMaps>
            </React.Fragment>
        )
    }

    private onMapClick(event: any): void {
        if (!UserContext().isLoggedIn()) {
            return;
        }
        const isEdit = this.state.mode === EFormType.EDIT || this.state.mode === EFormType.APPEND;
        if (isEdit) {
            return;
        }
        this.setState({currentPos: event.get("coords")});
        const popup = this.popupRef.current;
        if (popup && !popup.isShow()) {
            popup.open();
        }
    }

    private onCloseForm() {
        this.setState({mode: EFormType.NONE, currentPos: []});
    }

    private onUpdate() {
        this.setState({mode: EFormType.EDIT});
    }

    private onView() {
        this.setState({mode: EFormType.VIEW});
    }

    private onRemove() {
        this.setState({mode: EFormType.NONE});
    }
}