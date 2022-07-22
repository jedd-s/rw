import { useLayoutEffect } from 'appkit/Hooks'
import WkDevTool from 'appkit/WkDevTool.client'

import R from 'lib/r'
import { resizeElement } from 'modules/@motionone/dom/gestures/resize/handle-element'
import { resizeViewport } from 'modules/@motionone/dom/gestures/resize/handle-viewport'
import { resizeWindow } from 'modules/@motionone/dom/gestures/resize/handle-window'

function EventsClient({ children }) {
    R.useLayoutEffect(() => {
        if (__CLIENT__) {
            // console.log('Window')
            resizeViewport((args) => {
                console.log(`Window Resize`, args)
            })
        }
    }, [])
    return (
        <>
            {children}

            <WkDevTool />
        </>
    )
}

export default EventsClient
