/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

export type ColorValue = null | string;

export type DimensionValue = null | number | string;

export type EdgeInsetsValue = {|
  top: number,
  left: number,
  right: number,
  bottom: number
|};

export type PointValue = {|
  x: number,
  y: number
|};
