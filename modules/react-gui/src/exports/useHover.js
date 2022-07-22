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
import {
  addEventListener,
  dispatchCustomEvent,
  getInputModality,
  removeEventListener
} from '#exports/core';
import { supportsPointerEvent } from '#internals/supportsPointerEvent';
import { useElementCallback } from '#exports/useElementCallback';

/**
 * Types
 */

export type HoverProps = {
  bubbles?: ?boolean,
  disabled?: ?boolean,
  onHoverStart?: ?(e: any) => void,
  onHoverChange?: ?(bool: boolean) => void,
  onHoverUpdate?: ?(e: any) => void,
  onHoverEnd?: ?(e: any) => void
};

/**
 * Implementation
 */

const opts = { passive: true };
const lockEventType = 'react:hover-lock';
const unlockEventType = 'react:hover-unlock';
const modalityOpts = { live: true };

// This accounts for the non-PointerEvent fallback events.
function getPointerType(event) {
  const { pointerType } = event;
  return pointerType != null ? pointerType : getInputModality(modalityOpts);
}

export function useHover(props: HoverProps): CallbackRef {
  const {
    bubbles,
    disabled,
    onHoverStart,
    onHoverChange,
    onHoverUpdate,
    onHoverEnd
  } = props;

  const canUsePE = supportsPointerEvent();

  const elementCallback = useCallback(
    (target) => {
      const enterEventType = canUsePE ? 'pointerenter' : 'mouseenter';
      const moveEventType = canUsePE ? 'pointermove' : 'mousemove';
      const leaveEventType = canUsePE ? 'pointerleave' : 'mouseleave';

      /**
       * "Bubbling" controllers
       */
      const lockListener = function (lockEvent) {
        if (disabled) {
          return;
        }
        if (lockEvent.target !== target) {
          hoverEnd(lockEvent.detail);
        }
      };

      const unlockListener = function (lockEvent) {
        if (disabled) {
          return;
        }
        if (lockEvent.target !== target) {
          hoverStart(lockEvent.detail);
        }
      };

      /**
       * Enter element
       */
      const enterListener = function (e) {
        if (disabled) {
          return;
        }
        if (getPointerType(e) !== 'touch') {
          if (bubbles === false) {
            dispatchCustomEvent(target, lockEventType, { detail: e });
          }
          hoverStart(e);
          // Attach listeners on demand
          addEventListener(target, lockEventType, lockListener, opts);
          addEventListener(target, unlockEventType, unlockListener, opts);
          if (onHoverUpdate != null) {
            addEventListener(target, moveEventType, moveListener, opts);
          }
          addEventListener(target, leaveEventType, leaveListener, opts);
        }
      };

      /**
       * Move within element
       */
      const moveListener = function (e) {
        if (disabled) {
          return;
        }
        if (getPointerType(e) !== 'touch') {
          if (onHoverUpdate != null) {
            // Not all browsers have these properties
            if (e.x == null) {
              e.x = e.clientX;
            }
            if (e.y == null) {
              e.y = e.clientY;
            }
            onHoverUpdate(e);
          }
        }
      };

      /**
       * Leave element
       */
      const leaveListener = function (e) {
        if (disabled) {
          return;
        }
        if (getPointerType(e) !== 'touch') {
          if (bubbles === false) {
            dispatchCustomEvent(target, unlockEventType, { detail: e });
          }
          hoverEnd(e);
          // Remove on-demand listeners
          removeEventListener(target, lockEventType, lockListener, opts);
          removeEventListener(target, unlockEventType, unlockListener, opts);
          if (onHoverUpdate != null) {
            removeEventListener(target, moveEventType, moveListener, opts);
          }
          removeEventListener(target, leaveEventType, leaveListener, opts);
        }
      };

      /**
       * Start the hover gesture
       */
      const hoverStart = function (e) {
        if (onHoverStart != null) {
          onHoverStart(e);
        }
        if (onHoverChange != null) {
          onHoverChange(true);
        }
      };

      /**
       * End the hover gesture
       */
      const hoverEnd = function (e) {
        if (onHoverEnd != null) {
          onHoverEnd(e);
        }
        if (onHoverChange != null) {
          onHoverChange(false);
        }
      };

      addEventListener(target, enterEventType, enterListener, opts);

      return () => {
        removeEventListener(target, lockEventType, lockListener, opts);
        removeEventListener(target, unlockEventType, unlockListener, opts);
        removeEventListener(target, enterEventType, enterListener, opts);
        removeEventListener(target, moveEventType, moveListener, opts);
        removeEventListener(target, leaveEventType, leaveListener, opts);
      };
    },
    [
      canUsePE,
      bubbles,
      disabled,
      onHoverStart,
      onHoverChange,
      onHoverUpdate,
      onHoverEnd
    ]
  );

  return useElementCallback(elementCallback);
}
