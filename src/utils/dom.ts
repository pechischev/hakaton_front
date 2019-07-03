import { RefObject } from "react";
import {Nullable} from "../react-app-env";

export function isParent(parent: Element, element: Nullable<HTMLElement>): boolean {
    // tslint:disable-next-line:no-parameter-reassignment no-conditional-assignment
    while (element && (element = element.parentElement)) {
        if (element === parent) {
            return true;
        }
    }
    return false;
}

export function hasCurrentParent(parent: RefObject<HTMLElement>, element: Nullable<HTMLElement>): boolean {
    if (!parent.current) {
        return false;
    }
    return isParent(parent.current, element);
}
