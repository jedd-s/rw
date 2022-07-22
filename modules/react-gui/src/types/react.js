/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

export type CallbackRef = (node: HTMLElement | null) => mixed;
export type ObjectRef = { current: null | HTMLElement };
export type Ref = CallbackRef | ObjectRef;

export type TCallbackRef<T> = (T) => mixed;
export type TObjectRef<T> = { current: T, ... };
export type TRef<T> = TCallbackRef<T> | TObjectRef<T>;
