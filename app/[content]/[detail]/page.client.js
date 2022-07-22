import React from 'react'

// export function getServerSideProps({ params }) {
//   return { props: { params } }
// }
/* 
https://union.barstoolsports.com/stories/latest?page=0
https://union.barstoolsports.com/stories/[slug]
*/
import dynamic from 'next/dynamic'

const ReactLazy = React.lazy(() => import('./dynamic.client.js'))

const Dynamic = dynamic(() => import('./dynamic.client.js'), {
    suspense: true,
})

export default function Page(props) {
    const { params } = props
    const [state, set] = React.useState('client')
    return (
        <>
            <div id="page" data-layout="vgrid">
                <h3 id="text">Detail</h3>
                <div>What am i doing</div>
            </div>
            <React.Suspense fallback={'lazy_and_dynamic'}>
                <ReactLazy />
                <Dynamic />
            </React.Suspense>
        </>
    )
}
