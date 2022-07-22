/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

import { supportsPassiveEvents } from './supportsPassiveEvents';

const canUsePassiveEvents = supportsPassiveEvents();
const emptyFunction = () => {};
const emptyObject = {};
const passiveByDefault = {
  touchstart: true,
  touchmove: true,
  scroll: true
};

/**
 * Normalize event options and default performance-sensitive events to passive.
 */
function getOptions(
  type: string,
  options: ?EventOptions
): EventOptions | boolean {
  if (options != null) {
    const { capture, passive } = options;
    if (canUsePassiveEvents) {
      return passive == null || passiveByDefault[type] === true
        ? { capture, passive: true }
        : options;
    } else {
      return Boolean(capture);
    }
  }
  return false;
}

/**
 * Exports
 */

export type EventInit = {
  bubbles?: boolean,
  cancelable?: boolean,
  detail?: { [key: string]: mixed }
};

export type EventOptions = {
  capture?: boolean,
  passive?: boolean
};

// $FlowFixMe
export type EventListener = (e: any) => void;

export function addEventListener(
  target: EventTarget,
  type: string,
  listener: ?EventListener,
  options: ?EventOptions
): () => void {
  const opts = getOptions(type, options);
  if (typeof listener === 'function') {
    const element = (target: any);
    element.addEventListener(type, listener, opts);
    return function removeListener() {
      if (element != null) {
        element.removeEventListener(type, listener, opts);
      }
    };
  } else {
    return emptyFunction;
  }
}

export function removeEventListener(
  target: EventTarget,
  type: string,
  listener: ?EventListener,
  options: ?EventOptions
): void {
  const opts = getOptions(type, options);
  if (typeof listener === 'function') {
    const element = (target: any);
    element.removeEventListener(type, listener, opts);
  }
}

export function dispatchCustomEvent(
  target: EventTarget,
  type: string,
  payload?: EventInit
) {
  const event = document.createEvent('CustomEvent');
  const { bubbles = true, cancelable = true, detail } = payload || emptyObject;
  event.initCustomEvent(type, bubbles, cancelable, detail);
  target.dispatchEvent(event);
}
