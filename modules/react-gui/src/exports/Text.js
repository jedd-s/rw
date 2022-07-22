/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ColorValue } from '#types/values';
import type { GenericStyleProp } from '#types/styles';
import type { ViewProps, ViewStyle } from './View';

import * as React from 'react';
import { createElement, createStyleRules, filterProps } from './createElement';
import getAccessibilityElementWithSideEffect from '#internals/getAccessibilityElementWithSideEffect';
import { TextAncestorContext } from '#internals/TextAncestorContext';
import { systemFontStack } from '#internals/constants';

type FontWeightValue =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type NumberOrString = number | string;

export type TextStyle = {
  ...ViewStyle,
  color?: ?ColorValue,
  direction?: 'auto' | 'ltr' | 'rtl',
  fontFamily?: ?string,
  fontFeatureSettings?: ?string,
  fontSize?: ?NumberOrString,
  fontStyle?: 'italic' | 'normal',
  fontWeight?: ?FontWeightValue,
  fontVariant?: ?string,
  letterSpacing?: ?NumberOrString,
  lineClamp?: ?number,
  lineHeight?: ?NumberOrString,
  textAlign?:
    | 'center'
    | 'end'
    | 'inherit'
    | 'justify'
    | 'justify-all'
    | 'left'
    | 'right'
    | 'start',
  textDecorationColor?: ?ColorValue,
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through',
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed',
  textIndent?: ?NumberOrString,
  textOverflow?: ?string,
  textRendering?:
    | 'auto'
    | 'geometricPrecision'
    | 'optimizeLegibility'
    | 'optimizeSpeed',
  textShadow?: ?string,
  textTransform?: 'capitalize' | 'lowercase' | 'none' | 'uppercase',
  unicodeBidi?:
    | 'normal'
    | 'bidi-override'
    | 'embed'
    | 'isolate'
    | 'isolate-override'
    | 'plaintext',
  verticalAlign?: ?string,
  whiteSpace?: ?string,
  wordBreak?: 'normal' | 'break-all' | 'break-word' | 'keep-all',
  wordWrap?: ?string,
  /* @platform web */
  // TODO: polyfill as 'fontSmoothing'?
  MozOsxFontSmoothing?: ?string,
  WebkitFontSmoothing?: ?string
};

export type TextProps = {
  ...ViewProps,
  lang?: ?string, // TODO: lang codes
  style?: GenericStyleProp<TextStyle>
};

export { TextAncestorContext };

export const Text: React.AbstractComponent<
  TextProps,
  HTMLElement
> = React.forwardRef((props, ref) => {
  const { children, direction, href, hrefAttrs, lang } = props;

  const hasTextAncestor = React.useContext(TextAncestorContext);

  // Don't render a DOM node wrapper if this element is nested within another Text,
  // and it has no props or ref set.
  if (hasTextAncestor && ref == null) {
    const propsLength = Object.keys(props).length;
    if (propsLength === 0) {
      return null;
    } else if (props.children != null && propsLength === 1) {
      return props.children;
    }
  }

  // Construct the props
  const elementProps = filterProps(props);
  elementProps.children = children;
  elementProps.classList = hasTextAncestor ? inlineClassList : defaultClassList;
  // Only set the dir to 'auto' for root text elements, unless it is explicit
  // set via props.
  elementProps.dir = direction;
  if (!hasTextAncestor && direction == null) {
    elementProps.dir = 'auto';
  }
  elementProps.lang = lang;
  elementProps.ref = ref;
  if (href) {
    elementProps.href = href;
    if (hrefAttrs != null) {
      const { download, rel, target } = hrefAttrs;
      if (download != null) {
        elementProps.download = download;
      }
      if (rel != null) {
        elementProps.rel = rel;
      }
      if (typeof target === 'string') {
        elementProps.target = target.charAt(0) !== '_' ? '_' + target : target;
      }
    }
  }

  // Construct the element
  const accessibilityElementType = getAccessibilityElementWithSideEffect(
    elementProps
  );
  const elementType =
    accessibilityElementType || (hasTextAncestor ? 'span' : 'div');
  const element = createElement(elementType, elementProps);

  return hasTextAncestor ? (
    element
  ) : (
    <TextAncestorContext.Provider value={true}>
      {element}
    </TextAncestorContext.Provider>
  );
});

Text.displayName = 'Text';

const classes = createStyleRules({
  text: {
    backgroundColor: 'transparent',
    border: '0 solid black',
    boxSizing: 'border-box',
    color: 'black',
    display: 'inline',
    font: `14px ${systemFontStack}`,
    margin: 0,
    padding: 0,
    textDecoration: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  textHasAncestor: {
    color: 'inherit',
    font: 'inherit',
    whiteSpace: 'inherit'
  }
});

const defaultClassList = [classes.text];
const inlineClassList = [classes.text, classes.textHasAncestor];
