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

/**
 * Types
 */

export type KeyboardProps = {
  disabled?: ?boolean,
  onKeyDown?: (e: KeyboardEvent) => void,
  onKeyDownCapture?: (e: KeyboardEvent) => void,
  onKeyUp?: (e: KeyboardEvent) => void,
  onKeyUpCapture?: (e: KeyboardEvent) => void
};

/**
 * useKeyboardEvents implementation
 */

const captureOptions = { capture: true };

// TODO: https://github.com/w3c/uievents/issues/202
export function useKeyboard(props: KeyboardProps): CallbackRef {
  const {
    disabled,
    onKeyDown,
    onKeyDownCapture,
    onKeyUp,
    onKeyUpCapture
  } = props;

  const elementCallback = useCallback(
    (target) => {
      const createKeyListener = (listener) => {
        return function keyListener(e) {
          if (disabled) {
            return;
          }
          // Ignore composition events
          if (!e.isComposing && e.keyCode !== 229) {
            if (listener != null) {
              listener(e);
            }
          }
        };
      };

      const keyDownListener = createKeyListener(onKeyDown);
      const keyUpListener = createKeyListener(onKeyUp);
      const keyDownCaptureListener = createKeyListener(onKeyDownCapture);
      const keyUpCaptureListener = createKeyListener(onKeyUpCapture);

      const attachedListeners = [
        addEventListener(target, 'keydown', keyDownListener),
        addEventListener(target, 'keyup', keyUpListener),
        addEventListener(
          target,
          'keydown',
          keyDownCaptureListener,
          captureOptions
        ),
        addEventListener(target, 'keyup', keyUpCaptureListener, captureOptions)
      ];

      return () => {
        attachedListeners.forEach((removeListener) => {
          removeListener();
        });
      };
    },
    [disabled, onKeyDown, onKeyDownCapture, onKeyUp, onKeyUpCapture]
  );

  return useElementCallback(elementCallback);
}
