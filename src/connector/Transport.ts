
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { get } from "lodash";
import { PartialObserver, Subject, Unsubscribable } from "rxjs";
import {Nullable} from "../react-app-env";
import {UserContext} from "./AppContext";

export class Transport<T extends object = object> {
    private static BASE_URL: string;
    private static readonly DEFAULT_URL = "http://yolamap.16mb.com";
    private readonly client = axios.create({
        baseURL: Transport.BASE_URL,
        withCredentials: true
    });
    private interceptor$ = new Subject<object>();
    // tslint:disable-next-line:no-any
    private observers: Array<Nullable<(value: any) => void>> = [];

    constructor() {
        Transport.BASE_URL = Transport.DEFAULT_URL;
        const options: AxiosRequestConfig = { baseURL: Transport.BASE_URL };

        this.client = axios.create(options);
        this.client.interceptors.request.use(
            (value: AxiosRequestConfig) => {
                this.interceptor$.unsubscribe();
                this.interceptor$ = new Subject();
                this.interceptor$.subscribe(...this.observers);
                this.interceptor$.next(value);
                return value;
            },
            async (error: Error) => {
                this.interceptor$.error(error);
                return Promise.reject(error);
            },
        );
        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                this.interceptor$.complete();
                return response;
            },
            async (error: AxiosError) => {
                this.interceptor$.error(error);
                return Promise.reject(error);
            },
        );
        this.observers.push(
            void 0,
            (error: AxiosError) => {
                const data = get(error, "response.data.error");
                if (!data) {
                    return;
                }
                // tslint:disable-next-line:no-magic-numbers
                const authErrorCodes = new Set([5, 12, 13]);
                const isAuthError = authErrorCodes.has(data.code);
                if (!isAuthError || !UserContext().isLoggedIn()) {
                    return;
                }
                UserContext().logout();
                window.location.pathname = `/login`;
            },
            void 0,
        );
    }

    subscribe(
        observer: Nullable<((value: T) => void) | PartialObserver<T> | null>,
        error?: Nullable<((error: any) => void) | null>, // tslint:disable-line:no-any
        complete?: () => void,
    ): Unsubscribable {
        if (!observer) {
            return this.interceptor$;
        }
        if (typeof observer === "object") {
            return this.interceptor$;
        }
        this.interceptor$.subscribe(observer as any, error || void 0, complete);
        this.observers = [...this.observers, observer, error || void 0, complete];
        return this.interceptor$;
    }

    unsubscribe(): void {
        this.interceptor$.unsubscribe();
        this.observers = [];
    }

    getTypes(): Promise<any> {
        return this.client.get("/point/get-types");
    }

    getSpecialization(): Promise<any> {
        return this.client.get("/point/get-specializations");
    }

    getPoints(): Promise<any> {
        return this.client.get("/point");
    }

    createPoint(): Promise<any> {
        return this.client.post("/point/create");
    }

    updatePoint(id: number): Promise<any> {
        return this.client.post("/point/update", {id})
    }

    removePoint(id: number): Promise<any> {
        return this.client.delete("/point/delete", { params: {id}})
    }
}
