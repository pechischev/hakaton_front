
import { AxiosError, AxiosResponse } from "axios";
import { attempt, get } from "lodash";
import { Subject } from "rxjs";
import { autobind } from "core-decorators";
import {IError} from "../error";
import {Transport} from "../../connector/Transport";

@autobind
export class Store {
    private readonly _error$ = new Subject<IError>();

    private _transport = new Transport();

    get transport(): Transport {
        return this._transport;
    }

    set transport(value: Transport) {
        this._transport = value;
    }

    get error$(): Subject<IError> {
        return this._error$;
    }

    call<T extends AxiosResponse>(
        promise: Promise<T>,
        onSuccess: (response: T) => void,
        onError: (err: AxiosError) => void,
    ): void {
        if (!this._transport) {
            return;
        }
        promise.then(onSuccess).catch(onError);
    }

    async asyncCall<T extends AxiosResponse>(promise: Promise<T>, onError?: (err: AxiosError) => void): Promise<T> {
        return promise.catch(async (error: AxiosError) => {
            if (onError) {
                onError(error);
            } else {
                this.onError(error);
            }
            return Promise.reject(error);
        });
    }

    onError(error: AxiosError): void {
        console.error("[Store.onError]", error);
        attempt(this.onErrorImpl!);
        const response = error.response as AxiosResponse<IError>;
        if (!response) {
            return;
        }
        const errorResponse = get<AxiosResponse<IError>, "data">(response, "data");
        this._error$.next(errorResponse);
    }

    protected onErrorImpl?(): void;
}
