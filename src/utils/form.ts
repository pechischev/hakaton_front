
import * as _ from "lodash";
import { FieldRenderProps } from "react-final-form";
import { ReactText } from "react";
import {FieldErrors} from "../config";

function isEmptyField(value: string | number): boolean {
    const currentValue = _.isNumber(value) ? value.toString() : value;
    return _.isEmpty(currentValue);
}

export function getFieldErrorByCode<T>(codes: number[], value: string | number): string {
    // TODO: should get all codes
    const code = codes.length ? codes[0] : 0;
    if (isEmptyField(value)) {
        return FieldErrors.getTextError(code);
    }
    return "";
}

export function getError(state: Pick<FieldRenderProps<object, HTMLElement>, "meta">, type?: string): string {
    const { meta } = state;
    if (type === "date") {
        if (!meta.dirty) {
            return "";
        }
    }
    if (!meta.visited || meta.active) {
        return "";
    }
    return meta.error || (!meta.dirtySinceLastSubmit && meta.submitError);
}

export function formatValue(value: string, maxLength?: number): string {
    if (!value) {
        return value;
    }
    if (maxLength && value.length === maxLength) {
        return value.substring(0, value.length - 1);
    }
    return value;
}

export function parseAmountFieldValue(value: string): string {
    if (!value) {
        return value;
    }
    if (value === "0") {
        return "0.00";
    }
    const endNumberLength = 2;
    const arr = value.split(".");
    if (arr.length === 1) {
        return `${arr[0]}.00`;
    }
    if (arr[1].length === 0) {
        return `${arr[0]}.00`;
    }
    if (arr[1].length === 1) {
        return `${arr[0]}.${arr[1]}0`;
    }
    if (arr[1].length === endNumberLength) {
        return `${arr[0]}.${arr[1]}`;
    }
    return value;
}

export function formattedDataTime(value: number): string {
    const milliseconds = 1000;
    const hourInEngFormat = 12;

    const newDate = new Date(value * milliseconds);

    const sMonth = padValue(newDate.getMonth() + 1);
    const sDay = padValue(newDate.getDate());
    const sYear = newDate.getFullYear();
    let sHour = newDate.getHours();
    const sMinute = padValue(newDate.getMinutes());
    let sAMPM = "AM";

    const iHourCheck = parseInt(`${sHour}`, 10);

    if (iHourCheck > hourInEngFormat) {
        sAMPM = "PM";
        sHour = iHourCheck - hourInEngFormat;
    } else if (iHourCheck === 0) {
        sHour = hourInEngFormat;
    }

    const hour = padValue(sHour);

    return `${sMonth}.${sDay}.${sYear} / ${hour}:${sMinute} ${sAMPM}`;
}

export function padValue(value: number): ReactText {
    const radix = 10;
    return (value < radix) ? `0${value}` : value.toString();
}

export function formatDate(value: number): string {
    const dateValue = new Date(value);
    return `${dateValue.getMonth()}/${dateValue.getDate()}/${dateValue.getFullYear()}`;
}
