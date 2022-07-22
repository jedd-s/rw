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
import type { ColorValue } from '#types/values';
import type {
  AnimationStyles,
  BorderStyles,
  GenericStyleProp,
  InteractionStyles,
  LayoutStyles,
  TransformStyles
} from '#types/styles';

import * as React from 'react';
import { createElement, createStyleRules } from '#exports/createElement';
import { addEventListener, removeEventListener } from '#exports/core';
import { useMergeRefs } from '#exports/useMergeRefs';
import { TextAncestorContext } from '#internals/TextAncestorContext';

type NumberOrString = number | string;

export type ImageStyle = {
  ...AnimationStyles,
  ...BorderStyles,
  ...InteractionStyles,
  ...LayoutStyles,
  ...TransformStyles,
  backdropFilter?: ?string,
  backgroundAttachment?: ?string,
  backgroundBlendMode?: ?string,
  backgroundClip?: ?string,
  backgroundColor?: ?ColorValue,
  backgroundImage?: ?string,
  backgroundOrigin?: 'border-box' | 'content-box' | 'padding-box',
  backgroundPosition?: ?string,
  backgroundRepeat?: ?string,
  backgroundSize?: ?string,
  boxShadow?: ?string,
  filter?: ?string,
  imageRendering?: ?(
    | 'auto'
    | 'crisp-edges'
    | 'high-quality'
    | 'pixelated'
    | 'smooth'
  ),
  objectFit?: ?('cover' | 'contain' | 'scale-down' | 'fill' | 'none'),
  objectPosition?: ?string,
  opacity?: ?number,
  outlineColor?: ?ColorValue,
  outlineOffset?: ?NumberOrString,
  outlineStyle?: ?string,
  outlineWidth?: ?NumberOrString
};

type ImageLoadEvent = {
  naturalWidth: number,
  naturalHeight: number,
  width: number,
  height: number,
  currentSource: string
};
type ImageSourceObj = { uri: string, scale?: number };
type ImageSource = string | ImageSourceObj | Array<ImageSourceObj>;

export type ImageProps = {
  accessibilityDescribedBy?: $PropertyType<
    AccessibilityStyledProps,
    'accessibilityDescribedBy'
  >,
  accessibilityDetails?: $PropertyType<
    AccessibilityStyledProps,
    'accessibilityDetails'
  >,
  accessibilityHasPopup?: $PropertyType<
    AccessibilityStyledProps,
    'accessibilityHasPopup'
  >,
  accessibilityHidden?: $PropertyType<
    AccessibilityStyledProps,
    'accessibilityHidden'
  >,
  accessibilityLabel?: $PropertyType<
    AccessibilityStyledProps,
    'accessibilityLabel'
  >,
  accessibilityLabelledBy?: $PropertyType<
    AccessibilityStyledProps,
    'accessibilityLabelledBy'
  >,
  accessibilityOwns?: $PropertyType<
    AccessibilityStyledProps,
    'accessibilityOwns'
  >,
  accessibilityPressed?: $PropertyType<
    AccessibilityStyledProps,
    'accessibilityPressed'
  >,
  accessibilityRole?: $PropertyType<
    AccessibilityStyledProps,
    'accessibilityRole'
  >,
  accessibilityRoleDescription?: $PropertyType<
    AccessibilityStyledProps,
    'accessibilityRoleDescription'
  >,
  accessibilitySelected?: $PropertyType<
    AccessibilityStyledProps,
    'accessibilitySelected'
  >,
  alternativeText?: ?string,
  crossOrigin?: 'anonymous' | 'use-credentials',
  dataSet?: { ... },
  decoding?: 'auto' | 'async' | 'sync',
  draggable?: ?boolean,
  focusable?: ?boolean,
  loading?: 'eager' | 'lazy',
  nativeID?: ?string,
  onError?: () => void,
  onLoad?: (e: ImageLoadEvent) => void,
  referrerPolicy?:
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'unsafe-url',
  source?: ?ImageSource,
  style?: GenericStyleProp<ImageStyle>,
  testID?: ?string
};

const ERROR_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const errorEventType = 'error';
const loadEventType = 'load';

function getImageData(image: HTMLImageElement) {
  const { naturalWidth, naturalHeight, width, height, currentSrc, src } = image;

  return {
    naturalWidth,
    naturalHeight,
    width,
    height,
    currentSource: currentSrc != null ? currentSrc : src
  };
}

export const Image: React.AbstractComponent<
  ImageProps,
  HTMLElement
> = React.forwardRef((props, forwardedRef) => {
  const {
    accessibilityDescribedBy,
    accessibilityDetails,
    accessibilityHasPopup,
    accessibilityHidden,
    accessibilityLabel,
    accessibilityLabelledBy,
    accessibilityOwns,
    accessibilityPressed,
    accessibilityRole,
    accessibilityRoleDescription,
    accessibilitySelected,
    alternativeText,
    crossOrigin,
    dataSet,
    decoding = 'auto',
    draggable = false,
    focusable,
    loading,
    nativeID,
    onError,
    onLoad,
    referrerPolicy,
    source,
    style,
    testID
  } = props;

  const attachedNode = React.useRef(null);
  const hasTextAncestor = React.useContext(TextAncestorContext);

  const internalImageRef = React.useCallback(
    (target) => {
      const errorListener = function () {
        // If the image fails to load, browsers will display a "broken" icon.
        // To avoid this we replace the image with a transparent gif.
        setManagedSrc(ERROR_PLACEHOLDER);
        if (onError != null) {
          onError();
        }
      };

      const loadListener = function (e) {
        const { target: image } = e;
        if (image.src === ERROR_PLACEHOLDER) {
          // Prevent the placeholder from triggering a 'load' event that event
          // listeners would otherwise receive.
          e.stopImmediatePropagation();
        } else if (onLoad != null) {
          onLoad(getImageData(image));
        }
      };

      if (target !== null) {
        attachedNode.current = target;
        addEventListener(target, errorEventType, errorListener);
        addEventListener(target, loadEventType, loadListener);
        // If the image is loaded before JS loads (e.g., SSR), then we manually
        // call onLoad
        if (onLoad != null && target.complete) {
          onLoad(getImageData(target));
        }
      } else if (attachedNode.current != null) {
        const node = attachedNode.current;
        removeEventListener(node, errorEventType, errorListener);
        removeEventListener(node, loadEventType, loadListener);
        attachedNode.current = null;
      }
    },
    [onError, onLoad]
  );

  const ref = useMergeRefs<HTMLImageElement | null>(
    internalImageRef,
    forwardedRef
  );

  let src;
  let srcSet;
  if (typeof source === 'string') {
    src = source;
  } else if (Array.isArray(source)) {
    src = source[0].uri;
    srcSet = source.map(({ uri, scale }) => `${uri} ${scale || 1}x`);
  } else if (source != null && source.uri) {
    src = source.uri;
  }

  const [managedSrc, setManagedSrc] = React.useState(src);

  // Construct the element
  const element = createElement('img', {
    accessibilityDescribedBy,
    accessibilityDetails,
    accessibilityHasPopup,
    accessibilityHidden,
    accessibilityLabel,
    accessibilityLabelledBy,
    accessibilityOwns,
    accessibilityPressed,
    accessibilityRole,
    accessibilityRoleDescription,
    accessibilitySelected,
    alt: alternativeText,
    classList: hasTextAncestor ? inlineClassList : defaultClassList,
    crossOrigin,
    dataSet,
    decoding,
    draggable,
    focusable,
    loading,
    nativeID,
    ref,
    referrerPolicy,
    src: managedSrc,
    srcSet:
      srcSet != null && managedSrc !== ERROR_PLACEHOLDER
        ? srcSet.join(',')
        : null,
    style,
    testID
  });

  return element;
});

Image.displayName = 'Image';

const classes = createStyleRules({
  image: {
    backgroundColor: 'transparent',
    border: '0 solid black',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    margin: 0,
    minHeight: 0,
    minWidth: 0,
    objectFit: 'cover',
    padding: 0,
    position: 'relative',
    zIndex: 0
  },
  inlineImage: {
    display: 'inline-flex'
  }
});

const defaultClassList = [classes.image];
const inlineClassList = [classes.image, classes.inlineImage];
