const viewportCallbacks = new Set()
let viewportResizeHandler
function createViewportResizeHandler() {
    const info = (type) => {
        const rect = document.documentElement.getBoundingClientRect()

        const viewport = {
            top: window.visualViewport.offsetTop,
            left: window.visualViewport.offsetLeft,
            // width: Math.max(window.innerWidth, rect.width),
            width: Math.max(
                window.visualViewport.width,
                document.documentElement.clientWidth,
            ),
            height: window.visualViewport.height,
        }
        const size = {
            top: rect.top,
            left: rect.left,
            width: Math.max(rect.width, document.documentElement.clientWidth),
            height: Math.max(
                rect.height,
                document.documentElement.clientHeight,
            ),
        }
        return {
            type: type,
            content: size,
            viewport: viewport,
        }
    }
    viewportResizeHandler = (event) => {
        const type = event.type

        const info1 = info(
            type === 'orientationchange' ? 'orientationchange-start' : type,
        )

        viewportCallbacks.forEach((callback) => callback(info1))

        if (type === 'orientationchange') {
            queueMicrotask(() => {
                const info2 = info('orientationchange-end')
                viewportCallbacks.forEach((callback) => callback(info2))
            })
        }
    }
    // window.addEventListener('resize', viewportResizeHandler)
    window.visualViewport.addEventListener('resize', viewportResizeHandler)
    window.addEventListener('orientationchange', viewportResizeHandler)
}

export function resizeViewport(callback) {
    viewportCallbacks.add(callback)
    if (!viewportResizeHandler) createViewportResizeHandler()
    return () => {
        viewportCallbacks.delete(callback)
        if (!viewportCallbacks.size && viewportResizeHandler) {
            viewportResizeHandler = undefined
        }
    }
}
//# sourceMappingURL=handle-window.js.map
