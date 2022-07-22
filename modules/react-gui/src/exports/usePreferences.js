/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import { useMediaQuery } from '#internals/useMediaQuery';

export type Preferences = {
  colorScheme: 'light' | 'dark',
  reducedMotion: boolean
};

export function usePreferences(): Preferences {
  const darkColorScheme = useMediaQuery('(prefers-color-scheme: dark)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion)');
  const colorScheme = darkColorScheme ? 'dark' : 'light';
  return { colorScheme, reducedMotion };
}
