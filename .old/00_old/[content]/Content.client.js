import { Fragment } from 'react'

export function getServerSideProps({ params }) {
  return { props: { params } }
}

// import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import routes from '../../routes'
// import { routes } from '../../routes'
// const ns = ['one', 'two', 'three', 'four', 'five']
// const nt = ['first', 'second', 'third', 'fourth', 'fifth']

// export const routes = ns.map((n, i) => ({
//   title: n.charAt(0).toUpperCase() + n.slice(1),
//   href: `/${n}`,
//   routes: nt.map((n2, i) => ({
//     title: n2.charAt(0).toUpperCase() + n2.slice(1),
//     href: `/${n}/${n2}`,
//   })),
// }))

export default function Content({ children }) {
  // const router = useRouter()
  // console.log(typeof window != 'undefined' && window.location.pathname)

  const route =
    typeof window != 'undefined'
      ? routes.find(
          (x) => x.href === '/' + window.location.pathname.split('/')[1]
        ) || {}
      : {}

  const [mount, setMount] = React.useState(false)

  React[typeof window != 'undefined' ? 'useLayoutEffect' : 'useEffect'](() => {
    if (!mount) {
      setMount(true)
    }
  }, [])

  return (
    <>
      <div id='content'>
        {mount && route?.routes && (
          <>
            <h2>{route.title}</h2>
            {route?.routes.map((r, i) => {
              return (
                <Fragment key={r.href}>
                  <Link href={r.href}>
                    <div
                      data-detail-link
                      data-title={`${r.title}`}
                      data-href={r.href}
                      style={{
                        pointerEvents: 'auto',
                        minHeight: 44,
                        display: 'flex',
                      }}
                    >
                      <div style={{ pointerEvents: 'none' }}>{r.title}</div>
                    </div>
                  </Link>
                </Fragment>
              )
            })}
            {children}
          </>
        )}
      </div>
      {/* {} */}
    </>
  )
}
