import { debug } from 'lib/log'
import React from 'react'

function Loading(props) {
    debug('DETAIL_LOADING', props)
    return <section id="DETAIL_LOADING">{props.children}</section>
}

export default function Dynamic({ children }) {
    debug('DETAIL_LAYOUT', children)
    return (
        <section id="dynamic">
            {/* <React.Suspense fallback={'detail_loading'}> */}
            {children}
            {/* </React.Suspense> */}
        </section>
    )
}
