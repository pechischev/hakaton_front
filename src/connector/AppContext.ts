import {UserStore} from "../entities/user";
import {InfoStore} from "../entities/type";

export const stores = {
    userStore: new UserStore(),
    infoStore: new InfoStore()
};

export function UserContext(): UserStore {
    return stores.userStore;
}

export function InfoContext(): InfoStore {
    return stores.infoStore;
}