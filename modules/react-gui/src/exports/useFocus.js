/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { CallbackRef } from '#types/react';

import { useCallback } from 'react';
import { addEventListener } from '#exports/core';
import { useElementCallback } from '#exports/useElementCallback';

export type FocusProps = {
  disabled?: ?boolean,
  onBlur?: ?(e: FocusEvent) => void,
  onBlurCapture?: ?(e: FocusEvent) => void,
  onFocus?: ?(e: FocusEvent) => void,
  onFocusCapture?: ?(e: FocusEvent) => void,
  onFocusChange?: ?(isFocused: boolean, e: FocusEvent) => void
};

/**
 * useFocusEvents implementation
 */

const bubbleOptions = { passive: true };
const captureOptions = { capture: true, passive: true };

export function useFocus(props: FocusProps): CallbackRef {
  const {
    disabled,
    onBlur,
    onBlurCapture,
    onFocus,
    onFocusCapture,
    onFocusChange
  } = props;

  const elementCallback = useCallback(
    (target) => {
      function blurListener(e) {
        if (disabled) {
          return;
        }
        if (onBlur != null) {
          onBlur(e);
        }
        if (onFocusChange != null) {
          onFocusChange(false, e);
        }
      }

      function focusListener(e) {
        if (disabled) {
          return;
        }
        if (onFocus != null) {
          onFocus(e);
        }
        if (onFocusChange != null) {
          onFocusChange(true, e);
        }
      }

      const attachedListeners = [
        addEventListener(target, 'blur', blurListener, bubbleOptions),
        addEventListener(target, 'focus', focusListener, bubbleOptions),
        addEventListener(
          target,
          'blur',
          disabled ? null : onBlurCapture,
          captureOptions
        ),
        addEventListener(
          target,
          'focus',
          disabled ? null : onFocusCapture,
          captureOptions
        )
      ];

      return () => {
        attachedListeners.forEach((removeListener) => {
          removeListener();
        });
      };
    },
    [disabled, onBlur, onBlurCapture, onFocus, onFocusCapture, onFocusChange]
  );

  return useElementCallback(elementCallback);
}
