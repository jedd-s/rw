/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { supportsDOM } from '#internals/supportsDOM';
import StyleObjectRegistry from './StyleObjectRegistry';
import styleResolver from './styleResolver';
import flattenStyle from './flattenStyle';

export const StyleSheet = {
  compose(style1: any, style2: any): any {
    if (__DEV__) {
      /* eslint-disable prefer-rest-params */
      const len = arguments.length;
      if (len > 2) {
        const readableStyles = [...arguments].map((a) => flattenStyle(a));
        throw new Error(
          `StyleSheet.compose() only accepts 2 arguments, received ${len}: ${JSON.stringify(
            readableStyles
          )}`
        );
      }
      /* eslint-enable prefer-rest-params */
    }

    if (style1 && style2) {
      return [style1, style2];
    } else {
      return style1 || style2;
    }
  },
  create(styles: Object): {| [key: string]: number |} {
    const result = {};
    Object.keys(styles).forEach((key) => {
      const id = styles[key] && StyleObjectRegistry.register(styles[key]);
      result[key] = id;
    });
    return result;
  },
  flatten: flattenStyle,
  resolve: styleResolver.resolve
};

// allow original component styles to be inspected in React Dev Tools
if (supportsDOM() && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle = StyleSheet.flatten;
}
