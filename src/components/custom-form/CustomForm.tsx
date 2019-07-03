import * as React from "react";
import { Component, ReactNode, Fragment } from "react";
import { Form, FormRenderProps } from "react-final-form";
import { FormApi, FormState } from "final-form";
import { autobind } from "core-decorators";
import { isEmpty, isObject, merge, stubObject, values, toLower, set, get } from "lodash";
import { Subject } from "rxjs";
import EventListener from "react-event-listener";
import {IFieldError} from "../../config/IFieldError";
import {Nullable} from "../../react-app-env";
import {getFieldErrorByCode} from "../../utils";
import {FieldErrors} from "../../config";
import {IError} from "../../entities";

export interface ICustomFormProps<T extends object> {
    data?: T | Partial<T>;
    validateOnBlur?: boolean;
    keepDirtyOnReinitialize?: boolean;

    error$?: Subject<IError>;

    render(api: FormRenderProps<T>, submitting?: boolean): ReactNode;

    submit(data: T, form?: FormApi<T>): Promise<Nullable<object>> | object | void;

    validateData?(values: object): IFieldError[];

    validate?(errors: object, values: object): object;
}

@autobind
export class CustomForm<T extends object> extends Component<ICustomFormProps<T>> {
    private errors: Nullable<object> = void 0;

    componentDidMount(): void {
        const {error$} = this.props;
        if (error$) {
            error$.subscribe(this.setError);
        }
    }

    componentWillUnmount(): void {
        const {error$} = this.props;
        if (error$) {
            error$.unsubscribe();
        }
    }

    render(): ReactNode {
        const {render, data, validateOnBlur, keepDirtyOnReinitialize = true} = this.props;

        return (
            <Form
                onSubmit={this.onSubmit}
                validate={this.onValidate}
                initialValues={data || stubObject()}
                render={(api: FormRenderProps<any>) => {
                    return (
                        <Fragment>
                            {render(api, this.submitting(api.form.getState() as unknown as FormState<T>))}
                            <EventListener target={document} onKeyPress={this.onKeyPress.bind(this, api)}/>
                        </Fragment>
                    );
                }}
                {...{validateOnBlur, keepDirtyOnReinitialize}}
            />
        );
    }

    private onSubmit(formData: T, form: FormApi<T>, callback?: (errors?: object) => void):
        Promise<Nullable<object>> | object | void {
        const {submit} = this.props;
        return new Promise((resolve) => resolve(formData)).then(async (data) => {
            return submit(data as T, form);
        }).catch((err) => {
            if (callback && !isEmpty(this.errors)) {
                return callback(this.errors);
            }
            console.error(err); // for logging
        });
    }

    private onValidate(formData: object): object | Promise<object> {
        let errors = {};
        const {validate, validateData} = this.props;
        const requiredFields = validateData && validateData(formData) || [];
        for (const field of requiredFields) {
            const value = get(formData, field.type);
            const codes = field.codes;
            const error = getFieldErrorByCode(codes, value);
            if (!!error) {
                set(errors, field.type, error);
            }
        }
        if (validate) {
            errors = merge(errors, validate(errors, formData));
        }
        return errors;
    }

    private submitting(api: FormState<T>): boolean {
        const hasErrors = this.hasErrors(api.errors);
        const hasServerError = !api.dirtySinceLastSubmit && this.hasErrors(api.submitErrors);
        const success = api.dirty;
        return !(api.submitting || api.pristine || hasErrors || hasServerError) && success;
    }

    private hasErrors(errors: object): boolean {
        return !!values(errors)
            .find((value: object | string) => (isObject(value)) ? this.hasErrors(value) : !isEmpty(value));
    }

    private setError(error: IError): void {
        const {validateData} = this.props;
        const requiredFields = validateData && validateData(values);
        const fieldTypes = FieldErrors.getTypesByCode(error.code || error.status, requiredFields);
        const errors = {};
        for (const type of fieldTypes) {
            set(errors, type, FieldErrors.getTextError(error.code) || error.title);
        }
        this.errors = errors;
    }

    private onKeyPress(api: FormRenderProps<T>, event: KeyboardEvent): void {
        if (toLower(event.code ) !== "enter") {
            return;
        }
        if (api.active) {
            api.handleSubmit();
        }
    }
}
