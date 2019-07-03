import {EFormType} from "./interfaces";
import * as React from "react";
import {ReactNode} from "react";
import {AddPlacemarkForm} from "./AddPlacemarkForm";

export class FormCreator {
    static createForm(type: EFormType): ReactNode {
        switch (type) {
            case EFormType.VIEW:
                return <div/>;
            case EFormType.APPEND:
                return <AddPlacemarkForm/>;
            case EFormType.EDIT:
                return <div/>;
            default:
                return <div/>;
        }
    }

    static getTitleForm(type: EFormType): string {
        switch (type) {
            case EFormType.APPEND:
                return "Заполнение информации";
            case EFormType.EDIT:
                return "Редактирование информации";
            case EFormType.VIEW:
            default:
                return "Информация";
        }
    }
}