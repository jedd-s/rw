import { Fragment } from 'react'

export function getServerSideProps({ params }) {
  return { props: { params } }
}

import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import routes from '../../routes'
// import { routes } from '../routes'

export default function Sidebar({ children }) {
  // const router = useRouter()
  // console.log(Router)

  useEffect(() => {
    function handle(event) {
      const { title, href } = event.target.dataset

      if (href) {
        // Router.push(href, href)
      }
    }
    if (typeof window != 'undefined') {
      let sidebarLinks = document.querySelectorAll('[data-sidebar-link]')

      sidebarLinks.forEach((el) => {
        // el.addEventListener('click', handle)
      })

      return () => {
        sidebarLinks.forEach((el) => {
          // el.removeEventListener('click', handle)
        })
      }
    }
  }, [])

  return (
    <>
      <div style={{ width: 'min(280px, 20vw)' }}>
        <Link href={'/'}>
          <h2>App Title</h2>
        </Link>
        {routes.map((r, i) => {
          return (
            <Fragment key={r.href}>
              <Link href={r.href}>
                <div
                  data-sidebar-link
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
      </div>
      {children}
    </>
  )
}
