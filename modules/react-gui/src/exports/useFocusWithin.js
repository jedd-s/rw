/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { CallbackRef } from '#types/react';

import { useCallback, useRef } from 'react';
import { addEventListener } from '#exports/core';
import { useElementCallback } from '#exports/useElementCallback';

type FocusWithinConfig = {
  disabled?: ?boolean,
  // Called after a focused element is removed from the DOM and has been blurred
  // onAfterBlurWithin?: (e: SyntheticEvent<EventTarget>) => void,
  // Called before a focused element is removed from the DOM and will be blurred
  // onBeforeBlurWithin?: (e: SyntheticEvent<EventTarget>) => void,
  // Called once the target and all its descendants lose focus
  onBlurWithin?: ?(e: FocusEvent) => void,
  // Called once the target element or a descendant receives focus
  onFocusWithin?: ?(e: FocusEvent) => void,
  // Called each time the focus-within state changes
  onFocusWithinChange?: (isFocusWithin: boolean) => void
};

/**
 * useFocusWithin implementation
 */

const passiveOptions = { passive: true };

export function useFocusWithin(config: FocusWithinConfig): CallbackRef {
  const {
    disabled,
    // onAfterBlurWithin,
    // onBeforeBlurWithin,
    onBlurWithin,
    onFocusWithin,
    onFocusWithinChange
  } = config;

  const focusWithinRef = useRef(false);

  const elementCallback = useCallback(
    (target) => {
      const focusInListener = (e) => {
        if (disabled) {
          return;
        }
        if (onFocusWithin != null) {
          onFocusWithin(e);
        }
        if (focusWithinRef.current === false) {
          focusWithinRef.current = true;
          if (onFocusWithinChange != null) {
            onFocusWithinChange(true);
          }
        }
      };

      const focusOutListener = (e) => {
        if (disabled) {
          return;
        }
        if (onBlurWithin != null) {
          onBlurWithin(e);
        }
        if (
          focusWithinRef.current === true &&
          target != null &&
          target instanceof HTMLElement
        ) {
          // Ignore focus moving within the subtree
          if (!target.contains(e.relatedTarget)) {
            focusWithinRef.current = false;
            if (onFocusWithinChange) {
              onFocusWithinChange(false);
            }
          }
        }
      };

      const attachedListeners = [
        addEventListener(target, 'focusin', focusInListener, passiveOptions),
        addEventListener(target, 'focusout', focusOutListener, passiveOptions)
      ];

      return () => {
        attachedListeners.forEach((removeListener) => {
          removeListener();
        });
      };
    },
    [disabled, onBlurWithin, onFocusWithin, onFocusWithinChange]
  );

  return useElementCallback(elementCallback);
}
