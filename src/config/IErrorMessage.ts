import { ReactNode } from "react";

export interface IErrorMessage {
    title: string;
    description: ReactNode | string;
    button?: ReactNode;
    code?: number;
}
