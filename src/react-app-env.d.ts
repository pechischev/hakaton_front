/// <reference types="react-scripts" />

import {Component} from "react";

export type TNullableTypes = Component | HTMLElement;

export type Nullable<T> = T extends (null | TNullableTypes) ? (T | null | undefined) : (T | undefined);

// tslint:disable-next-line:no-any no-shadowed-variable
export type Parameters<T> = T extends (...args: infer T) => any ? T : never;