
import { autobind } from "core-decorators";
import { action, observable } from "mobx";
import {Nullable} from "../../react-app-env";
import {Store} from "../store/Store";

@autobind
export class UserStore extends Store {
    private static readonly TOKENS = "user";
    @observable private user?: object;

    isLoggedIn(): boolean {
        return !!localStorage.getItem(UserStore.TOKENS);
    }

    getUser(): Nullable<object> {
        return this.user;
    }

    @action.bound
    login(): void {
        const user =  localStorage.getItem(UserStore.TOKENS);
        if (!user) {
            return;
        }
        this.user = JSON.parse(user);
    }

    @action.bound
    logout(): void {
        if (!this.isLoggedIn()) {
            return;
        }
        localStorage.removeItem(UserStore.TOKENS);
        this.user = void 0;
    }

}
