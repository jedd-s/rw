import { debug } from 'lib/log'
import React from 'react'

function Loading(props) {
    debug('DETAIL_LOADING', props)
    return <section id="DETAIL_LOADING">{props.children}</section>
}

export default function Root({ children }) {
    debug('DETAIL_LAYOUT', children.props)
    return (
        <>
            <section id="detail-layout">detail</section>
            <React.Suspense fallback={'detail_loading'}>
                {children}
            </React.Suspense>
        </>
    )
}
