// tslint:disable:no-magic-numbers
import { EFormTypes } from "./EFormTypes";
import { IFieldError } from "./IFieldError";

// tslint:disable-next-line:no-unnecessary-class
export class FieldErrors {
    private static readonly errors = [
        { type: EFormTypes.EMAIL, codes: [ 15, 16] },
        { type: EFormTypes.PASSWORD, codes: [ 14, 19, 20] },
    ];

    static getTypesByCode(code: number, errors?: IFieldError[]): Array<EFormTypes | string> {
        const types: Array<EFormTypes | string> = [];
        (errors || FieldErrors.errors).forEach((value: IFieldError) => {
            if (value.codes.indexOf(code) === -1) {
                return;
            }
            types.push(value.type);
        });
        return types.length ? types : [EFormTypes.TEXT];
    }

    // TODO: should get error message from other file
    static getTextError(code: number): string {
        if (code === 0) {
            return "required";
        }
        return "";
    }
}
