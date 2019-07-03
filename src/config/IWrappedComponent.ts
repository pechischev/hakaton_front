import {Nullable} from "../react-app-env";


export interface IWrappedComponent {
    unwrap(): Nullable<object>;
}
