/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { AccessibilityStyledProps } from '#exports/createElement';
import type { GenericStyleProp } from '#types/styles';

import * as React from 'react';
import { createElement, createStyleRules } from '#exports/createElement';
import { systemFontStack } from '#internals/constants';

export type TextAreaProps = {
  ...$Diff<AccessibilityStyledProps, { classList: any }>,
  autoCapitalize?: ?string,
  autoComplete?: ?string,
  autoCorrect?: 'on' | 'off',
  dataSet?: { ... },
  defaultValue?: ?string,
  direction?: 'auto' | 'ltr' | 'rtl',
  disabled?: ?boolean,
  enterKeyHint?:
    | 'done'
    | 'enter'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send',
  inputMode?:
    | 'decimal'
    | 'email'
    | 'none'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'text'
    | 'url',
  lang?: ?string,
  maxLength?: ?number,
  nativeID?: ?string,
  placeholder?: ?string,
  readOnly?: ?boolean,
  required?: ?boolean,
  spellCheck?: ?boolean,
  style?: GenericStyleProp<any>,
  testID?: ?string,
  value?: ?string
};

const emptyFunction = () => {};

export const TextArea: React.AbstractComponent<
  TextAreaProps,
  HTMLElement
> = React.forwardRef((props, ref) => {
  const {
    accessibilityControls,
    accessibilityDescribedBy,
    accessibilityDetails,
    accessibilityKeyShortcuts,
    accessibilityLabel,
    accessibilityLabelledBy,
    accessibilityRole,
    accessibilityRoleDescription,
    autoCapitalize = 'sentences',
    autoComplete,
    autoCorrect = 'off',
    dataSet,
    defaultValue,
    direction = 'auto',
    disabled,
    enterKeyHint,
    inputMode,
    lang,
    maxLength,
    nativeID,
    placeholder,
    readOnly,
    required,
    spellCheck,
    style,
    testID,
    value
  } = props;

  // Construct the element
  const element = createElement('textarea', {
    accessibilityControls,
    accessibilityDescribedBy,
    accessibilityDetails,
    accessibilityKeyShortcuts,
    accessibilityLabel,
    accessibilityLabelledBy,
    accessibilityRole,
    accessibilityRoleDescription,
    autoCapitalize,
    autoComplete,
    autoCorrect,
    classList: defaultClassList,
    dataSet,
    defaultValue,
    dir: direction,
    disabled,
    enterKeyHint,
    inputMode,
    lang,
    maxLength,
    nativeID,
    placeholder,
    readOnly,
    ref,
    required,
    spellCheck,
    style,
    testID,
    value,
    // Suppress React DOM warning when 'value' is set without 'onChange'
    onChange: emptyFunction
  });

  return element;
});

TextArea.displayName = 'TextArea';

const classes = createStyleRules({
  textarea: {
    backgroundColor: 'transparent',
    border: '0 solid black',
    borderRadius: 0,
    boxSizing: 'border-box',
    font: `14px ${systemFontStack}`,
    margin: 0,
    padding: 0,
    resize: 'none'
  }
});

const defaultClassList = [classes.textarea];
