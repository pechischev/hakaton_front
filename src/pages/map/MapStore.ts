import { Store } from "../../entities/store";
import { action, computed, observable } from "mobx";
import { IItem } from "./MapWrapper";
import { get } from "lodash";
import { EFormType } from "./interfaces";
import { Nullable } from "../../react-app-env";

export class MapStore extends Store {
    @observable items: IItem[] = [];
    @observable mode: EFormType = EFormType.NONE;
    @observable selectedItem: Nullable<IItem> = void 0;
    @observable curPos: number[] = [];

    @observable filterTypes: number[] = [];
    @observable filterSpecializations: number[] = [];
    @observable status: number[] = [0, 1];

    @action.bound
    setStatuses(types: number[]) {
        this.status = types;
    }

    @action.bound
    setTypes(types: number[]) {
        this.filterTypes = types;
    }

    @action.bound
    setSpecializations(values: number[]) {
        this.filterSpecializations = values;
    }

    @computed
    get getItems(): IItem[] {
        console.log(this.items)
        return this.items
            .filter((item) => {
                return !!(~this.filterTypes.indexOf(item.type));
            })
            .filter((item: any) => {
                return !!(~this.filterSpecializations.indexOf(item.specialization));
            })
            .filter((item: any) => {
                return !!(~this.status.indexOf(item.status));
            })
    }

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

    saveItems() {
        localStorage.setItem("items", JSON.stringify(this.items));
    }

    getPoints() {
        this.setItems(JSON.parse(<string>localStorage.getItem("items")) || []);
        // this.asyncCall(this.transport.getPoints()).then((data) => {
        //     const items = get(data, "data", []);
        //     this.setItems(items);
        // })
    }

    createPoint(data: object) {
        const params: any = {
            ...data,
            positionx: this.curPos[0],
            positiony: this.curPos[1],
            status: 1
        };
        const item = params;
        this.setItems([item]);
        this.selectItem(item);
        this.setMode(EFormType.VIEW)
        this.saveItems()
        // this.asyncCall(this.transport.createPoint(params))
        //     .then((response) => {
        //         console.info("[MapStore.createPoint]", response);
        //         const item = get(response, "data");
        //         this.setItems([item]);
        //         this.selectItem(item);
        //     })
        //     .then(() => this.setMode(EFormType.VIEW))
    }

    editPoint(data: object) {
        if (!this.selectedItem) {
            return;
        }
        const item: any = data;
        const items = this.items.filter((value) => item.id !== value.id);
        this.changeItems([...items, item]);
        this.selectItem(item);
        this.setMode(EFormType.VIEW)
        this.saveItems()
        // this.asyncCall(this.transport.updatePoint(this.selectedItem.id, data))
        //     .then((response) => {
        //         console.info("[MapStore.editPoint]", response);
        //         const item = get(response, "data");
        //         const items = this.items.filter((value) => item.id !== value.id);
        //         this.changeItems([...items, item]);
        //         this.selectItem(item);
        //     })
        //     .then(() => this.setMode(EFormType.VIEW))
    }

    removePoint() {
        const selectedItem = this.selectedItem;
        if (!selectedItem) {
            return;
        }
        const items = this.items.filter((value) => selectedItem.id !== value.id);
        this.changeItems(items);
        this.selectItem(void 0);
        this.saveItems()
        // this.asyncCall(this.transport.removePoint(selectedItem.id))
        //     .then(() => {
        //         const items = this.items.filter((value) => selectedItem.id !== value.id);
        //         this.changeItems(items);
        //         this.selectItem(void 0);
        //     })
    }
}