/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { InputModality, InputModalityOptions } from '#exports/core';

import React from 'react';
import { addEventListener, getInputModality } from '#exports/core';
import { useLayoutEffect } from '#internals/useLayoutEffect';

export function useInputModality(
  options: ?InputModalityOptions
): InputModality {
  const live = options != null && options.live;
  const [inputModality, setInputModality] = React.useState(
    getInputModality(options)
  );

  useLayoutEffect(() => {
    const removeModalityListener = addEventListener(
      document,
      'react:input-modality-change',
      () => {
        const inputModalityValue = getInputModality({ live });
        setInputModality(inputModalityValue);
      }
    );
    return removeModalityListener;
  }, [live]);

  return inputModality;
}
