import {Store} from "../../entities/store";
import {action, observable} from "mobx";
import {IItem} from "./MapWrapper";
import {get} from "lodash";
import {EFormType} from "./interfaces";
import {Nullable} from "../../react-app-env";

export class MapStore extends Store {
    @observable items: IItem[] = [
        {
            id: 1,
            status: 1,
            positionx: 56.630842,
            positiony: 47.886089,
            address: "aaaa",
            type: 1,
            square: "aaa",
            specialization: 2,
            info_action: "asdasdd",
            info_number: "1111",
            scheme_number: "6.2.153.6"
        }
    ];
    @observable mode: EFormType = EFormType.NONE;
    @observable selectedItem: Nullable<IItem> = void 0;
    @observable curPos: number[] = [];

    @action.bound
    setCurPos(pos: number[]) {
        this.curPos = pos;
    }

    @action.bound
    selectItem(item: Nullable<IItem>) {
        this.selectedItem = item;
    }

    @action.bound
    setMode(mode: EFormType) {
        this.mode = mode;
    }

    @action.bound
    setItems(items: IItem[]) {
        this.items = [...this.items, ...items];
    }

    @action.bound
    changeItems(items: IItem[]) {
        this.items = items;
    }

    getPoints() {
        this.asyncCall(this.transport.getPoints()).then((data) => {
            const items = get(data, "data", []);
            this.setItems(items);
        })
    }

    createPoint(data: object) {
        const params = {
            ...data,
            positionx: this.curPos[0],
            positiony: this.curPos[1],
            status: 1
        };
        this.asyncCall(this.transport.createPoint(params))
            .then((response) => {
                console.info("[MapStore.createPoint]", response);
                const item = get(response, "data");
                this.setItems([item]);
                this.selectItem(item);
            })
            .then(() => this.setMode(EFormType.VIEW))
    }

    editPoint(data: object) {
        if (!this.selectedItem) {
            return;
        }
        this.asyncCall(this.transport.updatePoint(this.selectedItem.id, data))
            .then((response) => {
                console.info("[MapStore.editPoint]", response);
                const item = get(response, "data");
                const items = this.items.filter((value) => item.id !== value.id);
                this.changeItems([...items, item]);
                this.selectItem(item);
            })
            .then(() => this.setMode(EFormType.VIEW))
    }

    removePoint() {
        if (!this.selectedItem) {
            return;
        }
        this.asyncCall(this.transport.removePoint(this.selectedItem.id))
            .then(() => {
                this.setMode(EFormType.NONE);
                this.selectItem(void 0);
            })
    }
}