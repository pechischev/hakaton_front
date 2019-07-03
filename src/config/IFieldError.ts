import {EFormTypes} from "./EFormTypes";


export interface IFieldError {
    type: EFormTypes | string;
    codes: number[];
}
