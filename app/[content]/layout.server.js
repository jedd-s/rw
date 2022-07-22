// let c = console['log']
// console.log(c('Helllo', 'Helllo', 'Helllo'))

import { debug } from 'lib/log'
import React from 'react'

function Loading(props) {
    debug('CONTENT_LOADING', props)
    return <section id="CONTENT_LOADING">{props.children}</section>
}

export default function Root({ children }) {
    debug('CONTENT_LAYOUT', children)
    return (
        <>
            <section id="content-layout"></section>
            {children}
        </>
    )
}
