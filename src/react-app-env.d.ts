/// <reference types="react-scripts" />

import {Component} from "react";

export type TNullableTypes = Component | HTMLElement;

export type Nullable<T> = T extends (null | TNullableTypes) ? (T | null | undefined) : (T | undefined);
