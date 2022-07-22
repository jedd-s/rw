/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

function filterObjectProperties(
  obj: Object,
  list: Set<string>,
  pick: boolean
): Object {
  const nextObj = {};
  if (obj != null) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (pick) {
          if (list.has(key)) {
            nextObj[key] = obj[key];
          }
        } else if (list.has(key) === false) {
          nextObj[key] = obj[key];
        }
      }
    }
  }
  return nextObj;
}

export function pick(obj: Object, list: Set<string>): Object {
  return filterObjectProperties(obj, list, true);
}

export function omit(obj: Object, list: Set<string>): Object {
  return filterObjectProperties(obj, list, false);
}
