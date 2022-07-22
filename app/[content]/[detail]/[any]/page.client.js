import React from 'react'

// export function getServerSideProps({ params }) {
//   return { props: { params } }
// }
/* 
https://union.barstoolsports.com/stories/latest?page=0
https://union.barstoolsports.com/stories/[slug]
*/

export default function Page({ params }) {
    return (
        <div
            id="page"
            data-layout="vgrid"
            // style={{ padding: '44px 19px 44px 19px' }}
        >
            <h3 id="text">Any</h3>
            <div>I guess</div>
        </div>
    )
}
