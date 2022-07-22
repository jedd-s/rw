/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/**
 * Hook for integrating the Responder System into React
 *
 *   function SomeComponent({ onStartShouldSetResponder }) {
 *     const ref = useRef(null);
 *     useResponderEvents(ref, { onStartShouldSetResponder });
 *     return <div ref={ref} />
 *   }
 */

import type { CallbackRef } from '#types/react';
import type {
  ResponderConfig,
  ResponderEvent
} from '#internals/responder-system';

import {
  attachListeners,
  setConfig,
  terminateResponder
} from '#internals/responder-system';
import { useCallback, useDebugValue } from 'react';
import { useElementCallback } from '#exports/useElementCallback';

export type ResponderProps = ResponderConfig;

export type { ResponderEvent };

export function useResponder(config: ?ResponderProps): CallbackRef {
  useDebugValue(config);

  // Set the config as necessary
  const elementCallback = useCallback(
    (target) => {
      attachListeners();
      setConfig(target, config);
    },
    [config]
  );

  return useElementCallback(elementCallback);
}

export { terminateResponder };
