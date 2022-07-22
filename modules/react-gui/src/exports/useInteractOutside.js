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

export type InteractOutsideProps = {
  disabled?: ?boolean,
  onInteractOutside?: (e: any) => void
};

const clickEventType = 'click';

export function useInteractOutside(props: InteractOutsideProps): CallbackRef {
  const { disabled, onInteractOutside } = props;

  const elementCallback = useCallback(
    (target) => {
      // Determine if we should trigger an outside click
      const clickListener = (e) => {
        if (disabled) {
          return;
        }
        if (
          target != null &&
          target instanceof HTMLElement &&
          !target.contains(e.target)
        ) {
          if (onInteractOutside != null) {
            onInteractOutside(e);
          }
        }
      };

      const removeClick = addEventListener(
        document,
        clickEventType,
        clickListener
      );

      () => {
        removeClick();
      };
    },
    [disabled, onInteractOutside]
  );

  return useElementCallback(elementCallback);
}
