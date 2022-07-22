import { debug } from 'lib/log'
import React from 'react'

function Loading(props) {
    debug('ANY_LOADING', props)
    return <section id="ANY_LOADING">{props.children}</section>
}

export default function Root({ children }) {
    debug('ANY_LAYOUT', children)
    return (
        <>
            <section id="any-root">
                <React.Suspense fallback={'any_loading'}>D</React.Suspense>
            </section>
            {children}
        </>
    )
}
