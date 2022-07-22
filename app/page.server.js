// import { Fragment } from 'react'
// import TestClient from '../../appkit/TestClient.client.js'

// export function getServerSideProps({ params }) {
//   return { props: { params } }
// }
/* 
https://union.barstoolsports.com/stories/latest?page=0
https://union.barstoolsports.com/stories/[slug]
*/
import React from 'react'

export default function Page({ children }) {
    return (
        <>
            <div id="page" data-layout="vgrid"></div>
            {children}
        </>
    )
}
