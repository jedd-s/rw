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
import {
  createElement,
  createStyleRules,
  filterProps
} from '#exports/createElement';
import { systemFontStack } from '#internals/constants';

export type TextInputProps = {
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
  secureTextEntry?: ?boolean,
  spellCheck?: ?boolean,
  style?: GenericStyleProp<any>,
  testID?: ?string,
  value?: ?string
};

const emptyFunction = () => {};

export const TextInput: React.AbstractComponent<
  TextInputProps,
  HTMLElement
> = React.forwardRef((props, ref) => {
  const {
    autoCapitalize = 'sentences',
    autoComplete,
    autoCorrect = 'off',
    defaultValue,
    direction = 'auto',
    disabled,
    enterKeyHint,
    inputMode,
    lang,
    maxLength,
    placeholder,
    readOnly,
    required,
    secureTextEntry,
    spellCheck,
    value
  } = props;

  // Construct the props
  const elementProps = filterProps(props);
  elementProps.autoCapitalize = autoCapitalize;
  elementProps.autoComplete = autoComplete;
  elementProps.autoCorrect = autoCorrect;
  elementProps.classList = defaultClassList;
  elementProps.defaultValue = defaultValue;
  elementProps.dir = direction;
  elementProps.disabled = disabled;
  elementProps.enterKeyHint = enterKeyHint;
  elementProps.inputMode = inputMode;
  elementProps.lang = lang;
  elementProps.maxLength = maxLength;
  elementProps.placeholder = placeholder;
  elementProps.readOnly = readOnly;
  elementProps.ref = ref;
  elementProps.required = required;
  elementProps.spellCheck = spellCheck;
  elementProps.type = secureTextEntry
    ? 'password'
    : inputMode === 'email'
    ? 'email'
    : 'text';
  elementProps.value = value;
  // Suppress React DOM warning when 'value' is set without 'onChange'
  elementProps.onChange = emptyFunction;

  // Construct the element
  const element = createElement('input', elementProps);

  return element;
});

TextInput.displayName = 'TextInput';

const classes = createStyleRules({
  textinput: {
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

const defaultClassList = [classes.textinput];
