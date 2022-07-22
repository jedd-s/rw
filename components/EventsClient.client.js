import { useLayoutEffect } from 'appkit/Hooks'
import { resizeElement } from 'modules/@motionone/dom/gestures/resize/handle-element'
import { resizeWindow } from 'modules/@motionone/dom/gestures/resize/handle-window'

function EventsClient({ children }) {
    useLayoutEffect(() => {
        if (__CLIENT__) {
            // console.log('Window')
            resizeWindow((...args) => {
                console.log(`Window Resize`, args)
            })
        }
    }, [])
    return children
}

export default EventsClient
