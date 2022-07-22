import React from 'react'
import { useLayoutEffect } from './Hooks'
import Next from './next'

let prevHref = null

let nextHref = null

const hrefToId = (href) => href.replace(/\//g, ':')
const idToHref = (id) => href.replace(/:/g, '/')

function NextLink({ children, href, soft, hard, asHref }) {
    const AppRouterContext = React.useContext(Next.AppRouterContext)
    const activeHref = React.useContext(Next.PathnameContext)

    const ref = React.useRef(null)

    // const [isPending, startTransition] = React.useTransition()

    // const isActive = activeHref == href

    const id = hrefToId(href)
    const activeId = hrefToId(activeHref)

    useLayoutEffect(() => {
        if (__SERVER__) return

        const target = ref.current

        if (activeHref == href) {
            nextHref = null
            if (target != null) {
                target.style.transitionDuration = `300ms`
                target.style.backgroundColor = `rgba(30,100,201,1)`
            }
        } else {
            if (target != null) {
                target.style.transitionDuration = `300ms`
                target.style.backgroundColor = `rgba(10,10,10,1)`
            }
        }
        // const
        const navigate = (e) => {
            e.preventDefault()

            if (activeHref != href && nextHref != href) {
                prevHref = activeHref
                nextHref = href
                // if (activeHref != href) {
                target.style.transitionDuration = `0ms`
                target.style.backgroundColor = `rgba(30,100,201,.1)`
                // }
                // React.startTransition(() => {
                //     AppRouterContext.push(href, asHref)
                // })

                // startTransition(() => {
                // })

                AppRouterContext.push(href, asHref)
            }

            if (hard === true) {
                // AppRouterContext.softPush(href)
            } else {
                // AppRouterContext.push(href)
            }
        }
        // if (typeof window == 'undefined' || target == null) return

        const opts = { passive: false }

        target.addEventListener('click', navigate, opts)

        return () => {
            target.removeEventListener('click', navigate, opts)
        }
    })

    return (
        <div
            ref={ref}
            data-pointerevents="box-only"
            id={id}
            tabIndex="1"
            style={{
                touchAction: 'pan-y',
                minHeight: 44,
                transitionProperty: 'background-color',
                transitionTimingFunction: 'ease',
                transitionDuration: '300ms',
                color:
                    activeHref == href
                        ? `rgba(3,3,8,1)`
                        : `rgba(230,230,240,1)`,
                // backgroundColor:
                //   activeHref == href ? `rgba(30,100,201,1)` : `rgba(10,10,10,1)`,

                display: 'flex',
                padding: '0px 16px',
            }}
        >
            {children}
        </div>
    )
}

export default function NextClientContext() {
    // const segments = useRouter()
    // const AppTreeContext = React.useContext(Next.AppTreeContext)
    // const LayoutSegments = React.useContext(Next.LayoutSegmentsContext)
    // const PathnameContext = React.useContext(Next.PathnameContext)
    // const QueryContext = React.useContext(Next.QueryContext)
    // const AppRouterContext = React.useContext(Next.AppRouterContext)
    // const ParamsContext = React.useContext(Next.ParamsContext)
    // const FullAppTreeContext = React.useContext(Next.FullAppTreeContext)
    // const HeadersContext = React.useContext(Next.HeadersContext)
    // const PreviewDataContext = React.useContext(Next.PreviewDataContext)
    // const CookiesContext = React.useContext(Next.CookiesContext)

    // console.log({
    //   AppTreeContext,
    //   LayoutSegments,
    //   PathnameContext,
    //   QueryContext,
    //   AppRouterContext,
    //   ParamsContext,
    //   FullAppTreeContext,
    //   HeadersContext,
    //   PreviewDataContext,
    //   CookiesContext,
    // })

    return (
        <>
            {/* <div>{'NextClientContext'}</div> */}

            <NextLink asHref="/" href="/">
                Root
            </NextLink>
            <NextLink asHref="/(content)/[content]" href="/one">
                One
            </NextLink>
            <NextLink
                asHref="/(content)/[content]/(detail)/[...detail]"
                href="/one/blue"
            >
                OneBlue
            </NextLink>
            <NextLink
                asHref="/(content)/[content]/(detail)/[...detail]"
                href="/one/blue/fish"
            >
                OneBlueFish
            </NextLink>
            <NextLink asHref="/(content)/[content]" href="/two">
                Two
            </NextLink>
            <NextLink
                asHref="/(content)/[content]/(detail)/[...detail]"
                href="/two/red"
            >
                TwoRed
            </NextLink>
            <NextLink
                asHref="/(content)/[content]/(detail)/[...detail]"
                href="/two/red/toads"
            >
                TwoRedToads
            </NextLink>
        </>
    )
}
