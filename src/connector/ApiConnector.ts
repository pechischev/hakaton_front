import axios, {AxiosResponse} from "axios";
import {IType} from "../entities/type";

class ApiConnector {
    private client = axios.create({
        baseURL: "http://yolamap.16mb.com",
    });

    getTypes(): Promise<AxiosResponse<IType[]>> {
        return this.client.get("/point/get-types");
    }
}

export const connector = new ApiConnector();