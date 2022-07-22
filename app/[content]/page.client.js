// import NextClientContext from 'appkit/NextClientContext.client'
// import NextSharedContext from 'appkit/NextSharedContext.js'
// import { EventsClient } from 'components/events.client'
import React from 'react'

// export function getServerSideProps({ params }) {
//   return { props: { params } }
// }
/* 
https://union.barstoolsports.com/stories/latest?page=0
https://union.barstoolsports.com/stories/[slug]
*/

export default function Page({ children }) {
    const [state, setState] = React.useState(0)

    React.useEffect(() => {
        if (__CLIENT__) {
            // c('Hi')
        }
    }, [])

    return (
        <>
            <div id="page">
                <div>What am i doing</div>
            </div>
            <React.Suspense fallback={null}>{children}</React.Suspense>
        </>
    )
}
