import {UserStore} from "../entities/user";

export const stores = {
    userStore: new UserStore(),
};

export function UserContext(): UserStore {
    return stores.userStore;
}