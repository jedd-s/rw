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

export type RichTextAreaProps = {
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

export const RichTextArea: React.AbstractComponent<
  RichTextAreaProps,
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
    autoComplete,
    dataSet,
    defaultValue,
    direction = 'auto',
    disabled,
    enterKeyHint,
    inputMode,
    lang,
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
  const element = createElement('div', {
    accessibilityAutoComplete: autoComplete,
    accessibilityControls,
    accessibilityDescribedBy,
    accessibilityDetails,
    accessibilityDisabled: disabled,
    accessibilityKeyShortcuts,
    accessibilityLabel,
    accessibilityLabelledBy,
    accessibilityMultiline: true,
    accessibilityPlaceholder: placeholder,
    accessibilityReadOnly: readOnly,
    accessibilityRequired: required,
    accessibilityRole,
    accessibilityRoleDescription,
    children: defaultValue || value,
    classList: defaultClassList,
    contentEditable: !disabled,
    dataSet,
    dir: direction,
    enterKeyHint,
    focusable: true,
    inputMode,
    lang,
    nativeID,
    ref,
    spellCheck,
    suppressContentEditableWarning: true,
    style,
    testID
  });

  return element;
});

RichTextArea.displayName = 'RichTextArea';

const classes = createStyleRules({
  richtextarea: {
    backgroundColor: 'transparent',
    border: '0 solid black',
    borderRadius: 0,
    boxSizing: 'border-box',
    font: `14px ${systemFontStack}`,
    margin: 0,
    minHeight: '2.75em',
    padding: 0
  }
});

const defaultClassList = [classes.richtextarea];
