const windowCallbacks = new Set()
let windowResizeHandler
function createWindowResizeHandler() {
    windowResizeHandler = () => {
        const size = {
            width: Math.max(
                window.innerWidth,
                document.documentElement.clientWidth,
            ),
            height: Math.max(
                window.innerHeight,
                document.documentElement.clientHeight,
            ),
        }
        const info = {
            target: window,
            size,
            contentSize: size,
        }
        windowCallbacks.forEach((callback) => callback(info))
    }
    window.addEventListener('resize', windowResizeHandler)
}
export function resizeWindow(callback) {
    windowCallbacks.add(callback)
    if (!windowResizeHandler) createWindowResizeHandler()
    return () => {
        windowCallbacks.delete(callback)
        if (!windowCallbacks.size && windowResizeHandler) {
            windowResizeHandler = undefined
        }
    }
}
//# sourceMappingURL=handle-window.js.map
