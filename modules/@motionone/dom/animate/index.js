import { animateStyle } from "./animate-style";
import { getOptions } from "./utils/options";
import { resolveElements } from "./utils/resolve-elements";
import { wrapAnimationWithControls } from "./utils/controls";
import { resolveOption } from "../utils/stagger";
export function animate(elements, keyframes, options = {}) {
    elements = resolveElements(elements);
    const numElements = elements.length;
    /**
     * Create and start new animations
     */
    const animationFactories = [];
    for (let i = 0; i < numElements; i++) {
        const element = elements[i];
        for (const key in keyframes) {
            const valueOptions = getOptions(options, key);
            valueOptions.delay = resolveOption(valueOptions.delay, i, numElements);
            const animation = animateStyle(element, key, keyframes[key], valueOptions);
            animationFactories.push(animation);
        }
    }
    return wrapAnimationWithControls(animationFactories, 
    /**
     * TODO:
     * If easing is set to spring or glide, duration will be dynamically
     * generated. Ideally we would dynamically generate this from
     * animation.effect.getComputedTiming().duration but this isn't
     * supported in iOS13 or our number polyfill. Perhaps it's possible
     * to Proxy animations returned from animateStyle that has duration
     * as a getter.
     */
    options.duration);
}
//# sourceMappingURL=index.js.map