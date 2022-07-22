/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { AccessibilityProps } from '#types/accessibility';
import type { ElementType } from 'react';

import { omit, pick } from '#internals/filterObjectProperties';
import { hyphenateString } from '#internals/hyphenateString';

export type AccessibilityStyledProps = {|
  ...AccessibilityProps,
  classList?: ?Array<string>,
  style?: any,
  testID?: ?string
|};

type Props = Object;

const hasOwnProperty = Object.prototype.hasOwnProperty;
const isArray = Array.isArray;

const passList = new Set([
  'accessibilityActiveDescendant',
  'accessibilityAtomic',
  'accessibilityAutoComplete',
  'accessibilityBusy',
  'accessibilityChecked',
  'accessibilityColumnCount',
  'accessibilityColumnIndex',
  'accessibilityColumnSpan',
  'accessibilityControls',
  'accessibilityCurrent',
  'accessibilityDescribedBy',
  'accessibilityDetails',
  'accessibilityDisabled',
  'accessibilityErrorMessage',
  'accessibilityExpanded',
  'accessibilityFlowTo',
  'accessibilityHasPopup',
  'accessibilityHidden',
  'accessibilityInvalid',
  'accessibilityKeyShortcuts',
  'accessibilityLabel',
  'accessibilityLabelledBy',
  'accessibilityLevel',
  'accessibilityLiveRegion',
  'accessibilityModal',
  'accessibilityMultiline',
  'accessibilityMultiSelectable',
  'accessibilityOrientation',
  'accessibilityOwns',
  'accessibilityPlaceholder',
  'accessibilityPosInSet',
  'accessibilityPressed',
  'accessibilityReadOnly',
  'accessibilityRequired',
  'accessibilityRole',
  'accessibilityRoleDescription',
  'accessibilityRowCount',
  'accessibilityRowIndex',
  'accessibilityRowSpan',
  'accessibilitySelected',
  'accessibilitySetSize',
  'accessibilitySort',
  'accessibilityValueMax',
  'accessibilityValueMin',
  'accessibilityValueNow',
  'accessibilityValueText',
  'focusable',
  'dataSet',
  'nativeID',
  'style',
  'testID'
]);

export function filterProps(props: Props): Props {
  return pick(props, passList);
}

function excludeProps(props: Props): Props {
  return omit(props, passList);
}

function flattenIDRefList(idRefList: string | Array<string>): string {
  if (typeof idRefList === 'string') {
    return idRefList;
  }
  return idRefList.join(' ');
}

export function createAccessibilityStyledProps(
  elementType: ElementType,
  props: ?Props
): Object {
  if (props == null) {
    return {};
  }

  const {
    accessibilityActiveDescendant,
    accessibilityAtomic,
    accessibilityAutoComplete,
    accessibilityBusy,
    accessibilityChecked,
    accessibilityColumnCount,
    accessibilityColumnIndex,
    accessibilityColumnSpan,
    accessibilityControls,
    accessibilityCurrent,
    accessibilityDescribedBy,
    accessibilityDetails,
    accessibilityDisabled,
    accessibilityErrorMessage,
    accessibilityExpanded,
    accessibilityFlowTo,
    accessibilityHasPopup,
    accessibilityHidden,
    accessibilityInvalid,
    accessibilityKeyShortcuts,
    accessibilityLabel,
    accessibilityLabelledBy,
    accessibilityLevel,
    accessibilityLiveRegion,
    accessibilityModal,
    accessibilityMultiline,
    accessibilityMultiSelectable,
    accessibilityOrientation,
    accessibilityOwns,
    accessibilityPlaceholder,
    accessibilityPosInSet,
    accessibilityPressed,
    accessibilityReadOnly,
    accessibilityRequired,
    accessibilityRole,
    accessibilityRoleDescription,
    accessibilityRowCount,
    accessibilityRowIndex,
    accessibilityRowSpan,
    accessibilitySelected,
    accessibilitySetSize,
    accessibilitySort,
    accessibilityValueMax,
    accessibilityValueMin,
    accessibilityValueNow,
    accessibilityValueText,
    classList,
    focusable,
    dataSet,
    nativeID,
    style,
    testID
  } = props;

  const forwardedProps: any = excludeProps(props);
  delete forwardedProps.classList;

  if (accessibilityActiveDescendant != null) {
    forwardedProps['aria-activedescendant'] = accessibilityActiveDescendant;
  }
  if (accessibilityAtomic != null) {
    forwardedProps['aria-atomic'] = accessibilityAtomic;
  }
  if (accessibilityAutoComplete != null) {
    forwardedProps['aria-autocomplete'] = accessibilityAutoComplete;
  }
  if (accessibilityBusy != null) {
    forwardedProps['aria-busy'] = accessibilityBusy;
  }
  if (accessibilityChecked != null) {
    forwardedProps['aria-checked'] = accessibilityChecked;
  }
  if (accessibilityColumnCount != null) {
    forwardedProps['aria-colcount'] = accessibilityColumnCount;
  }
  if (accessibilityColumnIndex != null) {
    forwardedProps['aria-colindex'] = accessibilityColumnIndex;
  }
  if (accessibilityColumnSpan != null) {
    forwardedProps['aria-colspan'] = accessibilityColumnSpan;
  }
  if (accessibilityControls != null) {
    forwardedProps['aria-controls'] = flattenIDRefList(accessibilityControls);
  }
  if (accessibilityCurrent != null) {
    forwardedProps['aria-current'] = accessibilityCurrent;
  }
  if (accessibilityDescribedBy != null) {
    forwardedProps['aria-describedby'] = flattenIDRefList(
      accessibilityDescribedBy
    );
  }
  if (accessibilityDetails != null) {
    forwardedProps['aria-details'] = accessibilityDetails;
  }
  if (accessibilityDisabled === true) {
    forwardedProps['aria-disabled'] = true;
    // Enhance with native semantics
    if (
      elementType === 'button' ||
      elementType === 'form' ||
      elementType === 'input' ||
      elementType === 'select' ||
      elementType === 'textarea'
    ) {
      forwardedProps.disabled = true;
    }
  }
  if (accessibilityErrorMessage != null) {
    forwardedProps['aria-errormessage'] = accessibilityErrorMessage;
  }
  if (accessibilityExpanded != null) {
    forwardedProps['aria-expanded'] = accessibilityExpanded;
  }
  if (accessibilityFlowTo != null) {
    forwardedProps['aria-flowto'] = flattenIDRefList(accessibilityFlowTo);
  }
  if (accessibilityHasPopup != null) {
    forwardedProps['aria-haspopup'] = accessibilityHasPopup;
  }
  if (accessibilityHidden === true) {
    forwardedProps['aria-hidden'] = accessibilityHidden;
  }
  if (accessibilityInvalid != null) {
    forwardedProps['aria-invalid'] = accessibilityInvalid;
  }
  if (accessibilityKeyShortcuts != null && isArray(accessibilityKeyShortcuts)) {
    forwardedProps['aria-keyshortcuts'] = accessibilityKeyShortcuts.join(' ');
  }
  if (accessibilityLabel != null) {
    forwardedProps['aria-label'] = accessibilityLabel;
  }
  if (accessibilityLabelledBy != null) {
    forwardedProps['aria-labelledby'] = flattenIDRefList(
      accessibilityLabelledBy
    );
  }
  if (accessibilityLevel != null) {
    forwardedProps['aria-level'] = accessibilityLevel;
  }
  if (accessibilityLiveRegion != null) {
    forwardedProps['aria-live'] = accessibilityLiveRegion;
  }
  if (accessibilityModal != null) {
    forwardedProps['aria-modal'] = accessibilityModal;
  }
  if (accessibilityMultiline != null) {
    forwardedProps['aria-multiline'] = accessibilityMultiline;
  }
  if (accessibilityMultiSelectable != null) {
    forwardedProps['aria-multiselectable'] = accessibilityMultiSelectable;
  }
  if (accessibilityOrientation != null) {
    forwardedProps['aria-orientation'] = accessibilityOrientation;
  }
  if (accessibilityOwns != null) {
    forwardedProps['aria-owns'] = flattenIDRefList(accessibilityOwns);
  }
  if (accessibilityPlaceholder != null) {
    forwardedProps['aria-placeholder'] = accessibilityPlaceholder;
  }
  if (accessibilityPosInSet != null) {
    forwardedProps['aria-posinset'] = accessibilityPosInSet;
  }
  if (accessibilityPressed != null) {
    forwardedProps['aria-pressed'] = accessibilityPressed;
  }
  if (accessibilityReadOnly != null) {
    forwardedProps['aria-readonly'] = accessibilityReadOnly;
    // Enhance with native semantics
    if (
      elementType === 'input' ||
      elementType === 'select' ||
      elementType === 'textarea'
    ) {
      forwardedProps.readOnly = true;
    }
  }
  if (accessibilityRequired != null) {
    forwardedProps['aria-required'] = accessibilityRequired;
    // Enhance with native semantics
    if (
      elementType === 'input' ||
      elementType === 'select' ||
      elementType === 'textarea'
    ) {
      forwardedProps.required = true;
    }
  }
  if (accessibilityRole != null) {
    // 'presentation' synonym has wider browser support
    const role =
      accessibilityRole === 'none' ? 'presentation' : accessibilityRole;
    forwardedProps['role'] = role;
  }
  if (accessibilityRoleDescription != null) {
    forwardedProps['aria-roledescription'] = accessibilityRoleDescription;
  }
  if (accessibilityRowCount != null) {
    forwardedProps['aria-rowcount'] = accessibilityRowCount;
  }
  if (accessibilityRowIndex != null) {
    forwardedProps['aria-rowindex'] = accessibilityRowIndex;
  }
  if (accessibilityRowSpan != null) {
    forwardedProps['aria-rowspan'] = accessibilityRowSpan;
  }
  if (accessibilitySelected != null) {
    forwardedProps['aria-selected'] = accessibilitySelected;
  }
  if (accessibilitySetSize != null) {
    forwardedProps['aria-setsize'] = accessibilitySetSize;
  }
  if (accessibilitySort != null) {
    forwardedProps['aria-sort'] = accessibilitySort;
  }
  if (accessibilityValueMax != null) {
    forwardedProps['aria-valuemax'] = accessibilityValueMax;
  }
  if (accessibilityValueMin != null) {
    forwardedProps['aria-valuemin'] = accessibilityValueMin;
  }
  if (accessibilityValueNow != null) {
    forwardedProps['aria-valuenow'] = accessibilityValueNow;
  }
  if (accessibilityValueText != null) {
    forwardedProps['aria-valuetext'] = accessibilityValueText;
  }

  // "dataSet" replaced with "data-*"
  if (dataSet != null) {
    for (const dataProp in dataSet) {
      if (hasOwnProperty.call(dataSet, dataProp)) {
        const dataName = hyphenateString(dataProp);
        const dataValue = dataSet[dataProp];
        if (dataValue != null) {
          forwardedProps[`data-${dataName}`] = dataValue;
        }
      }
    }
  }

  // "focusable" indicates that an element is a keyboard tab-stop.
  if (focusable != null) {
    forwardedProps.tabIndex = focusable ? '0' : '-1';
  }

  // "nativeID" replaced with "id"
  if (nativeID != null) {
    forwardedProps.id = nativeID;
  }

  // HACK: Add support for stylex by allowing the `style` prop to
  // accept a string (classnames) and redirect it to the element's
  // className prop
  let classes = Array.isArray(classList) ? classList : [];
  if (typeof style === 'string') {
    classes = classes.concat([style]);
  } else {
    forwardedProps.style = style;
  }

  if (classes.length > 0) {
    forwardedProps.className = classes.join(' ');
  }

  // DEV-only
  if (__DEV__) {
    // "testID" replaced with "data-testid"
    if (testID != null) {
      forwardedProps['data-testid'] = testID;
    }
  }

  return forwardedProps;
}
