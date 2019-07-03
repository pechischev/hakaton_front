import {EFormType} from "./interfaces";
import * as React from "react";
import {ReactNode} from "react";
import {AddPlacemarkForm} from "./AddPlacemarkForm";
import {EditPlacemarkForm} from "./EditPlacemarkForm";
import {ViewPlacemarkForm} from "./ViewPlacemarkForm";

export class FormCreator {
    static createForm(type: EFormType): ReactNode {
        switch (type) {
            case EFormType.VIEW:
                return <ViewPlacemarkForm/>;
            case EFormType.APPEND:
                return <AddPlacemarkForm/>;
            case EFormType.EDIT:
                return <EditPlacemarkForm/>;
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