/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/**
 * Users should be able to switch input mechanisms at any point should the user
 * determine that certain tasks and interactions are more easily accomplished
 * by using an alternative input mechanism. Content must not limit the user's
 * interaction to any particular input mechanism unless the restriction is
 * essential, or is required to ensure the security of the content or to
 * respect user settings.
 *
 * https://www.w3.org/WAI/WCAG21/Understanding/concurrent-input-mechanisms
 */

import { addEventListener, dispatchCustomEvent } from '#exports/core';
import { supportsDOM } from './supportsDOM';
import { supportsPointerEvent } from './supportsPointerEvent';

let modality = 'keyboard';
let liveModality = 'keyboard';
let previousLiveModality;
let previousModality;
let isEmulatingMouseEvents = false;

const KEYBOARD = 'keyboard';
const MOUSE = 'mouse';
const TOUCH = 'touch';

const BLUR = 'blur';
const CONTEXTMENU = 'contextmenu';
const FOCUS = 'focus';
const KEYDOWN = 'keydown';
const MOUSEDOWN = 'mousedown';
const MOUSEMOVE = 'mousemove';
const MOUSEOVER = 'mouseover';
const MOUSEUP = 'mouseup';
const POINTERDOWN = 'pointerdown';
const POINTERMOVE = 'pointermove';
const POINTEROVER = 'pointerover';
const SCROLL = 'scroll';
const SELECTIONCHANGE = 'selectionchange';
const TOUCHCANCEL = 'touchcancel';
const TOUCHMOVE = 'touchmove';
const TOUCHSTART = 'touchstart';
const VISIBILITYCHANGE = 'visibilitychange';

const captureOptions = { capture: true, passive: true };

function restoreModality() {
  if (previousLiveModality != null || previousModality != null) {
    if (previousLiveModality != null) {
      liveModality = previousLiveModality;
      previousLiveModality = null;
    }
    if (previousModality != null) {
      modality = previousModality;
      previousModality = null;
    }
    dispatchModalityEvent();
  }
}

function onBlurWindow() {
  previousLiveModality = liveModality;
  previousModality = modality;
  modality = KEYBOARD;
  liveModality = KEYBOARD;
  dispatchModalityEvent();
  // for fallback events
  isEmulatingMouseEvents = false;
}

function onFocusWindow() {
  restoreModality();
}

function onKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  if (liveModality !== KEYBOARD) {
    liveModality = KEYBOARD;
    modality = KEYBOARD;
    dispatchModalityEvent();
  }
}

function onVisibilityChange() {
  if (document.visibilityState !== 'hidden') {
    restoreModality();
  }
}

function onPointerish(event: any) {
  const eventType = event.type;

  if (supportsPointerEvent()) {
    if (eventType === POINTERDOWN) {
      if (modality !== event.pointerType) {
        liveModality = event.pointerType;
        modality = event.pointerType;
        dispatchModalityEvent();
      }
      return;
    }
    if (eventType === POINTERMOVE || eventType === POINTEROVER) {
      if (liveModality !== event.pointerType) {
        liveModality = event.pointerType;
        dispatchModalityEvent();
      }
      return;
    }
  }
  // Fallback for non-PointerEvent environment
  else {
    if (!isEmulatingMouseEvents) {
      if (eventType === MOUSEDOWN) {
        if (modality !== MOUSE) {
          liveModality = MOUSE;
          modality = MOUSE;
          dispatchModalityEvent();
        }
      }
      if (eventType === MOUSEMOVE || eventType === MOUSEOVER) {
        if (liveModality !== MOUSE) {
          liveModality = MOUSE;
          dispatchModalityEvent();
        }
      }
    }

    // Flag when browser may produce emulated events
    if (eventType === TOUCHSTART) {
      isEmulatingMouseEvents = true;
      if (event.touches && event.touches.length > 1) {
        isEmulatingMouseEvents = false;
      }
      if (modality !== TOUCH) {
        liveModality = TOUCH;
        modality = TOUCH;
        dispatchModalityEvent();
      }
      return;
    }

    // Remove flag after emulated events are finished or cancelled, and if an
    // event occurs that cuts short a touch event sequence.
    if (
      eventType === CONTEXTMENU ||
      eventType === MOUSEUP ||
      eventType === SELECTIONCHANGE ||
      eventType === SCROLL ||
      eventType === TOUCHCANCEL ||
      eventType === TOUCHMOVE
    ) {
      isEmulatingMouseEvents = false;
    }
  }
}

if (supportsDOM()) {
  addEventListener(window, BLUR, onBlurWindow);
  addEventListener(window, FOCUS, onFocusWindow);
  // Force reset of modality state
  addEventListener(document, 'react:input-modality-reset', () => {
    isEmulatingMouseEvents = false;
    modality = KEYBOARD;
    liveModality = KEYBOARD;
  });
  // Must be capture phase because 'stopPropagation' might prevent these
  // events bubbling to the document.
  addEventListener(document, KEYDOWN, onKeyDown, captureOptions);
  addEventListener(
    document,
    VISIBILITYCHANGE,
    onVisibilityChange,
    captureOptions
  );
  [
    POINTERDOWN,
    POINTERMOVE,
    POINTEROVER,
    // Fallbacks
    CONTEXTMENU,
    MOUSEDOWN,
    MOUSEMOVE,
    MOUSEOVER,
    MOUSEUP,
    SCROLL,
    SELECTIONCHANGE,
    TOUCHCANCEL,
    TOUCHMOVE,
    TOUCHSTART
  ].forEach((eventType) => {
    addEventListener(document, eventType, onPointerish, captureOptions);
  });
}

function dispatchModalityEvent() {
  const capturedModality = {
    active: getInputModality(),
    live: getInputModality({ live: true })
  };
  const detail = {
    getInputModality(options) {
      if (options != null && options.live === true) {
        return capturedModality.live;
      } else {
        return capturedModality.active;
      }
    }
  };
  dispatchCustomEvent(document, InputModalityChangeEventType, { detail });
}

export type InputModality = 'keyboard' | 'mouse' | 'touch' | 'pen';

export type InputModalityOptions = { live?: boolean };

export const InputModalityChangeEventType = 'react:input-modality-change';

export function getInputModality(
  options: ?InputModalityOptions
): InputModality {
  const live = options != null && options.live;
  return live ? liveModality : modality;
}
