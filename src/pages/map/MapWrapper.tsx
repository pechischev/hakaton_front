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
import {stubObject} from "lodash";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {InfoContext, UserContext} from "../../connector/AppContext";
import {MapStore} from "./MapStore";
import {Filters} from "./Filters";

export interface IItem {
    id: number;
    address: string;
    type: number;
    square: string;
    specialization: number;
    info_number: string;
    info_action: string;
    scheme_number: string;
    status: number;
    positionx: number;
    positiony: number;
}

const mapDefaultState = {
    center: [56.630842, 47.886089],
    zoom: 16,
    controls: []
};

export interface IFormContext {
    selectedItem: Nullable<IItem>;
    store: MapStore;

    onUpdate(): void;

    onView(): void;

    onRemove(): void;
}


export const FormContext = React.createContext<IFormContext>(stubObject());

@observer
@autobind
export class MapWrapper extends Component<{}> {

    private popupRef: RefObject<Popup> = createRef();
    private confirmRef: RefObject<Popup> = createRef();
    private readonly store = new MapStore();

    constructor(props: {}) {
        super(props);

        this.store.getPoints();
        InfoContext().getSpecializations()
            .then(() => this.store.setSpecializations(InfoContext().specializations.map(({id}) => id)));
        InfoContext().getTypes()
            .then(() => this.store.setTypes(InfoContext().types.map(({id}) => id)));
    }

    render(): ReactNode {
        const showForm = this.store.mode !== EFormType.NONE;
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
                            <SearchControl options={{float: 'right'}}/>
                            {!!this.store.curPos.length && (
                                <Placemark geometry={this.store.curPos}/>
                            )}
                            <Clusterer>
                                {this.store.getItems().map((item: IItem, index) => {
                                    return (
                                        <Placemark
                                            key={index} geometry={[item.positionx, item.positiony]}
                                            onClick={() => {
                                                this.store.selectItem(item);
                                                this.store.setMode(EFormType.VIEW)
                                            }}
                                            options={{
                                                preset: 'islands#circleIcon',
                                                iconColor: InfoContext().getPointColor(item.specialization),
                                            }}
                                        />
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
                        selectedItem: this.store.selectedItem,
                        store: this.store
                    }}>

                        <Filters store={this.store}/>
                        {showForm && (
                            <div className="form-container">
                                <InnerForm show={showForm} onClose={this.onCloseForm.bind(this)}
                                           title={FormCreator.getTitleForm(this.store.mode)}>
                                    {FormCreator.createForm(this.store.mode)}
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
                                            this.store.setMode(EFormType.APPEND);
                                        }}
                                    >
                                        Добавить
                                    </Button>
                                    <Button
                                        color="secondary"
                                        variant="outlined"
                                        onClick={() => {
                                            props.show(false);
                                            this.store.setMode(EFormType.NONE);
                                            this.store.setCurPos([]);
                                        }}>Отменить</Button>
                                </Fragment>
                            );
                        }}
                    />
                    <Popup
                        ref={this.confirmRef}
                        title={"Вы действительно хотите удалить объект?"}
                        renderActions={(props) => {
                            return (
                                <Fragment>
                                    <Button
                                        color="secondary"
                                        variant="outlined"
                                        onClick={() => {
                                            props.show(false);
                                            this.store.setMode(EFormType.NONE);
                                            this.store.removePoint();
                                        }}
                                    >
                                        Да
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            props.show(false);
                                            this.store.setMode(EFormType.NONE);
                                            this.store.selectItem(void 0);
                                        }}>Нет</Button>
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
        const isUsed = this.store.mode !== EFormType.NONE;
        if (isUsed) {
            return;
        }
        this.store.setCurPos(event.get("coords"));
        const popup = this.popupRef.current;
        if (popup && !popup.isShow()) {
            popup.open();
        }
    }

    private onCloseForm() {
        this.store.setMode(EFormType.NONE);
        this.store.setCurPos([]);
    }

    private onUpdate() {
        this.store.setMode(EFormType.EDIT);
    }

    private onView() {
        this.store.setMode(EFormType.VIEW);
    }

    private onRemove() {
        const confirmRef = this.confirmRef.current;
        if (confirmRef && !confirmRef.isShow()) {
            confirmRef.open();
        }
    }
}