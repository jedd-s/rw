import { Fragment } from 'react'

export function getServerSideProps({ params }) {
  return { props: { params } }
}

// import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import routes from '../../../routes'
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

const subroutes = routes.map((r) => r?.routes || []).flat()

export default function Detail({ children }) {
  // const router = useRouter()

  const route =
    typeof window != 'undefined'
      ? subroutes.find((x) => x.href === window.location.pathname) || {}
      : {}

  // const [mount, setMount] = useState(false)

  useEffect(() => {
    function handle(event) {
      const { title, href } = event.target.dataset

      if (href) {
        // Router.push(href, href)
      }
    }
    if (typeof window != 'undefined') {
      let links = document.querySelectorAll('[data-detail-link]')

      links.forEach((el) => {
        // el.addEventListener('click', handle)
      })

      return () => {
        links.forEach((el) => {
          // el.removeEventListener('click', handle)
        })
      }
    }
  }, [])
  return (
    <>
      <div>
        {route?.title && (
          <>
            <h2>{route.title}</h2>
            <div>Some content</div>
          </>
        )}
        {children}
      </div>
    </>
  )
}
