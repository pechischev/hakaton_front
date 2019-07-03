import { FieldProps } from "react-final-form";

export interface IField<T extends HTMLElement = HTMLElement, V = string | number> extends FieldProps<V, T> {
    label?: string;
    placeholder?: string;
    mask?: string;
    isVisible?: boolean;
    disabled?: boolean;
    required?: boolean;
}
