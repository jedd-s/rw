/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { CallbackRef } from '#types/react';
import type { ResizeEvent } from '#types/events';

import { supportsDOM } from '#internals/supportsDOM';
import { useCallback } from 'react';
import { useElementCallback } from '#exports/useElementCallback';

export type ResizeProps = {|
  box?: 'border-box' | 'content-box',
  onResize: ?(e: ResizeEvent) => void
|};

const HANDLE_RESIZE_KEY = '__reactHandleResize';
let didWarn = false;
let resizeObserver = null;

function getResizeObserver(): ?ResizeObserver {
  if (supportsDOM() && typeof window.ResizeObserver !== 'undefined') {
    if (resizeObserver == null) {
      resizeObserver = new window.ResizeObserver(function (entries) {
        entries.forEach((entry) => {
          const handleResize = entry.target[HANDLE_RESIZE_KEY];
          if (handleResize != null) {
            handleResize(entry);
          }
        });
      });
    }
  } else if (__DEV__) {
    if (!didWarn) {
      console.warn(
        'onResize relies on ResizeObserver which is not supported by this browser. ' +
          'Please include a polyfill, e.g., https://github.com/que-etc/resize-observer-polyfill.'
      );
      didWarn = true;
    }
  }
  return resizeObserver;
}

// TODO(#37): Support multiple uses
export function useResize(props: ResizeProps): CallbackRef {
  const observer = getResizeObserver();
  const { box = 'border-box', onResize } = props;

  const elementCallback = useCallback(
    (target: any) => {
      if (onResize != null) {
        // Flow bug: incorrect ResizeObserverEntry type
        // https://github.com/facebook/flow/issues/8693
        target[HANDLE_RESIZE_KEY] = function (entry: any) {
          const { borderBoxSize, contentRect } = entry;
          // 'contentRect' is legacy but not deprecated, and it provides the same
          // values as 'contentBoxSize' in fewer btyes
          let blockSize = contentRect.height;
          let inlineSize = contentRect.width;
          if (box === 'border-box') {
            if (borderBoxSize != null) {
              // Firefox doesn't provide a sequence of boxes, even though the spec
              // defines this value as a frozen array
              const borderSize = borderBoxSize[0] || borderBoxSize;
              blockSize = borderSize.blockSize;
              inlineSize = borderSize.inlineSize;
            } else {
              // 'borderBoxSize' is not currently available in all engines and not
              // included in most polyfills, so we fallback to 'getBoundingClientRect'
              const borderRect = target.getBoundingClientRect();
              blockSize = borderRect.height;
              inlineSize = borderRect.width;
            }
          }
          onResize({ blockSize, inlineSize });
        };
      }

      if (observer != null) {
        if (typeof target[HANDLE_RESIZE_KEY] === 'function') {
          // $FlowExpectedError: the Flow type is wrong
          observer.observe(target);
        }
      }

      return () => {
        if (observer != null) {
          observer.unobserve(target);
        }
      };
    },
    [box, observer, onResize]
  );

  return useElementCallback(elementCallback);
}
