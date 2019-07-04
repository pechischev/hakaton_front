import {Store} from "../store";
import {autobind} from "core-decorators";
import {action, observable} from "mobx";
import {IType} from "./index";
import {ISpecialization} from "../specialization";
import {AxiosResponse} from "axios";
import {ISelectOption} from "../../components/fields";

@autobind
export class InfoStore extends Store {
    @observable types: IType[] = [];
    @observable specializations: ISpecialization[] = [];

    async getTypes() {
        return this.asyncCall(this.transport.getTypes()).then(this.onGetTypes);
    }

    async getSpecializations() {
        return this.asyncCall(this.transport.getSpecialization()).then(this.onGetSpecializations);
    }

    getOptionTypes(): ISelectOption[] {
        return this.types.map(({id, title}) => ({id, label: title}));
    }

    getOptionSpecializations(): ISelectOption[] {
        return this.specializations.map(({id, title}) => ({id, label: title}));
    }

    getPointColor(id: number): string {
        const item = this.specializations.find((value) => value.id === id);
        if (!item) {
            return "#000000";
        }
        return item.colour;
    }

    getPointIcon(id: number): string {
        const item = this.types.find((value) => value.id === id);
        if (!item) {
            return "circle";
        }
        return item.icon;
    }

    @action.bound
    private onGetTypes(response: AxiosResponse<IType[]>) {
        console.info("[InfoStore.onGetTypes]", response);
        this.types = response.data;
    }

    @action.bound
    private onGetSpecializations(response: AxiosResponse<ISpecialization[]>) {
        console.info("[InfoStore.onGetSpecializations]", response);
        this.specializations = response.data;
    }
}
