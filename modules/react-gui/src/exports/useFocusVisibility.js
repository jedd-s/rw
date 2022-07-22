/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import { useInputModality } from '#exports/useInputModality';

/**
 * Respond to changes in *visibile* focus. Focus is visible whenever a keyboard is used.
 */
export function useFocusVisibility(): boolean {
  const inputModality = useInputModality();
  return inputModality === 'keyboard';
}
