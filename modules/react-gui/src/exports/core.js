/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { EventInit, EventOptions, EventListener } from '#internals/event';
import type {
  InputModality,
  InputModalityOptions
} from '#internals/getInputModality';

import {
  addEventListener,
  dispatchCustomEvent,
  removeEventListener
} from '#internals/event';
import { focusWithOptions } from '#internals/focusWithOptions';
import { getInputModality } from '#internals/getInputModality';
import { supportsDOM } from '#internals/supportsDOM';

const focusableElements = new Set([
  'A',
  'BUTTON',
  'INPUT',
  'SELECT',
  'TEXTAREA'
]);

// ---------------------- EXPORTS ---------------------- //

export type { EventInit };
export type { EventOptions };
export type { EventListener };
export type { InputModality };
export type { InputModalityOptions };

/**
 * Add an event listener
 */
export { addEventListener };

/**
 * Blur an element
 */
export function blur(node: HTMLElement): void {
  if (node != null) {
    try {
      node.blur();
    } catch (err) {}
  }
}

/**
 * Clear the text from an input
 */
export function clear(node: HTMLInputElement | HTMLTextAreaElement): void {
  if (node != null && typeof node.value === 'string') {
    node.value = '';
  }
}

/**
 * Dispatch a custom event
 */
export { dispatchCustomEvent };

/**
 * Focus an element
 */
export function focus(
  node: HTMLElement,
  options?: {| preventScroll?: boolean |}
): void {
  if (node != null) {
    try {
      const name = node.nodeName;
      // A tabIndex of -1 allows the element to be programmatically focused but prevents keyboard
      // focus, so we don't want to set the value on elements configured to receive keyboard focus.
      if (
        focusableElements.has(name) === false &&
        node.getAttribute('tabIndex') == null
      ) {
        node.setAttribute('tabIndex', '-1');
      }
      focusWithOptions(node, options);
    } catch (err) {}
  }
}

/**
 * Get the currently focused element
 * TODO: https://github.com/microsoft/fluentui/pull/8290/files
 * TODO: https://stackoverflow.com/questions/25420219/find-focused-element-in-document-with-many-iframes
 */
export function getActiveElement(): ?HTMLElement {
  return supportsDOM() ? document.activeElement : null;
}

/**
 * Get the current input modality.
 */
export { getInputModality };

/**
 * Measure the layout of an element
 */
export function getLayoutRect(
  node: HTMLElement,
  options: { relativeTo: 'window' | HTMLElement }
): ?ClientRect {
  if (node != null) {
    return node.getBoundingClientRect();
  }
}

/**
 * Determine is a node is a child of another node.
 */
/*
export function nodeContains(
  node: HTMLElement,
  otherNode: ?HTMLElement,
): boolean {
  return node != null && node instanceof HTMLElement && node.contains(otherNode);
}
*/

/**
 * Remove an event listener
 */
export { removeEventListener };
