// import Sidebar from './Sidebar.client'

import NextServer from 'next/server'
// import NextStreaming from 'next/streaming'
// // import NextClient from 'next/client'
// // import NextData from 'next/data'
// import NextRouter from 'next/router'
// import NextFutureImage from 'next/future/image'

// import Next_ from 'next/'
// import TestClient from '../appkit/TestClient.client.js'
import rootcss from './root.css'

import NextClientContext from 'appkit/NextClientContext.client'
// import WkDevTool from 'appkit/WkDevTool.client.js'

const css = ``

import { jsx } from 'react/jsx-runtime'

// import NextServer from 'next/server'

const styles = {
    html: {
        // fontFamily: '-apple-system,system-ui,sans-serif',
        // fontSynthesis: 'none',
        // fontSize: '17.5px',
        // lineHeight: '28px',
        // backgroundColor: 'red',
        '--resizing': ' 0',
        '--hydrated': ' 1',
        '--topoffset': ' -44px',
        '--topinset': ' calc((var(--topoffset) * -1) - .51px)',
        '--htmlheight': ' calc(100vh + var(--topinset) + 10px)',
        position: 'relative',
        touchAction: 'none',
        height: 'var(--htmlheight)',
        minHeight: 'var(--htmlheight)',

        top: 'calc(var(--topoffset) + 0px)',
        overflow: 'hidden',
        // overscrollBehaviorY: 'none',
        minWidth: '100vw',
        maxWidth: '100vw !important',
        background: 'rgba(0,0,0,0)',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    body: {
        zIndex: '2147483647 !important',
        display: 'contents !important',
        background: 'rgba(0,0,0,0)',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    root: {
        // zIndex: '2147483647 !important',
        '--inset': '2px',
        '--rootheight': 'calc(100vh + 2px)',
        '--rootwidth': 'calc(100vw + 2px)',
        display: 'block',
        top: '-1px',

        // zIndex: -1,
        left: '-1px',
        // overflow: 'hidden',
        position: 'fixed',
        // contain: 'strict',
        // position: 'absolute',

        // overflow: 'hidden',
        // contain: 'layout',
        // zIndex:""
        // height: '100vh',
        border: '1px solid rgba(0,0,0,0)',

        // paddingTop: '10px',
        backgroundColor: `rgba(0,0,0,0)`,
        width: 'var(--rootwidth)',
        minWidth: 'var(--rootwidth)',
        height: 'var(--rootheight)',
        minHeight: 'var(--rootheight)',
        transformOrigin: '0% 100%',
        transform: 'translate3d(0px,0px,1px)',
        // contain: 'layout paint size',
        // zIndex: 2000000000,
        // boxShadow: 'inset 0px 0px 2px 2px red',
    },
    scrollview: {
        // isolation: 'isolate',
        // borderBottom: '100px solid rgba(0,0,200,1)',
        // boxSizing: 'padding-box !important',
        // background: `rgba(0,0,0,0)`,
        background: `rgba(0,0,0,0)`,
        //marginBottom: '-144px',
        // contain: 'strict',
        '--inset': '39px',
        // '--scrollheight': 'calc(var(--htmlheight) - var(--inset))',
        '--scrollheight': '100vh',
        // scrollPaddingBottom: '100px',
        // scrollSnapType: 'y proximity',

        position: 'fixed',
        // position: 'absolute',
        paddingTop: 'var(--topcontentinset)',
        // overscrollBehaviorY: 'auto',
        // scrollBehavior: 'smooth',

        // top: '-1px',
        // height: '100vh',
        width: '100vw',
        maxWidth: '100%',
        // width:'100vw',
        minHeight: 'var(--scrollheight)',
        maxHeight: 'var(--scrollheight)',
        //minHeight: 'var(--scrollheight)',
        transform: `translateZ(1px)`,

        top: '0px',
        // top: 'calc(var(--topoffset) + var(--inset))',
        left: '0px',
        display: 'grid',

        // flexDirection: 'column',
        // display: 'flex',
        overflowY: 'scroll !important',
        overflowX: 'hidden !important',
        touchAction: 'pan-y',
    },
}
import React from 'react'
import Next from 'appkit/next'
import EventsClient from 'components/EventsClient.client'
import { debug } from 'lib/log'

function Loading(props) {
    debu('APP_LOADING', props)
    return <section id="APP_LOADING">{props.children}</section>
}

export default function Root(props) {
    const { children } = props

    const headers = React.useContext(Next.HeadersContext)
    const ua = NextServer.userAgentFromString(headers['user-agent'])
    const cookies = React.useContext(Next.CookiesContext)

    // console.log(cookies)
    // NextServer.
    /*
  console.log('[Root]', {
    NextRouter,
    props,
    NextServer,
    NextStreaming,
    userAgent: NextServer.userAgent({ headers: new Headers() }),
    ua: NextServer.userAgentFromString(''),
    NextClient,
    NextData, 
  })
  */
    debug('APP_LAYOUT', children.props)

    return (
        <html
            id="html"
            data-browser={
                ua?.browser?.name?.toLocaleLowerCase().replace(/\s/g, '') +
                (ua?.browser?.version ?? '')
            }
            data-engine={
                ua?.engine?.name?.toLocaleLowerCase().replace(/\s/g, '') +
                (ua?.engine?.version ?? '')
            }
            data-os={
                ua.os?.name?.toLocaleLowerCase().replace(/\s/g, '') +
                (ua?.os?.version ?? '')
            }
            data-pointerevents="box-only"
            style={styles.html}
        >
            <head>
                <title>{`App`}</title>

                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="shortcut icon"
                    type="image/x-icon"
                    href="/favicon.ico"
                />
                {/* <link
        rel='preload'
        href='/fonts/sfsymbols3.woff2'
        as='font'
        type='font/woff2'
        crossOrigin='anonymous'
      /> */}
                {/* <meta name="theme-color" content={'rgb(8,8,8)'} /> */}

                <meta name="applicable-device" content="pc,mobile" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-touch-fullscreen" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-title" content="RW" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />

                <link
                    rel="icon"
                    type="image/png"
                    sizes="48x48"
                    href="/pwa/favicon-48x48.png"
                />
                <link
                    rel="mask-icon"
                    color="#000000"
                    href="/pwa/safari-pinned-tab.svg"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/pwa/apple-touch-icon.png"
                />
                <link
                    href="/pwa/apple-splash-1125x2436.png"
                    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/pwa/apple-splash-750x1334.png"
                    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/pwa/apple-splash-1242x2208.png"
                    media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/pwa/apple-splash-1242x2688.png"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/pwa/apple-splash-640x1136.png"
                    media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/pwa/apple-splash-1536x2048.png"
                    media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/pwa/apple-splash-1668x2226.png"
                    media="(device-width: 834px) and (device-height: 1113px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/pwa/apple-splash-2048x2732.png"
                    media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
                    rel="apple-touch-startup-image"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, viewport-fit=cover"
                    // content='width=device-width, initial-scale=1, viewport-fit=cover'
                />

                <style
                    id="stylesheet"
                    dangerouslySetInnerHTML={{
                        __html: css,
                    }}
                />
            </head>
            <body id="body" style={styles.body} data-pointerevents="none">
                {/* <EventsClient> */}
                {jsx(
                    'main',
                    {
                        id: 'navigationsplitview',
                        children: [
                            jsx(
                                'article',
                                {
                                    id: 'navigationsidebar',
                                    'data-navigationcolumn': 'sidebar',
                                    children: [
                                        jsx(
                                            'div',
                                            {
                                                'data-navigationbackground':
                                                    'sidebar',
                                            },
                                            'navigationbackground',
                                        ),
                                        jsx(
                                            'header',
                                            {
                                                'data-navigationbar': 'sidebar',
                                                children: [
                                                    jsx(
                                                        'h3',
                                                        {
                                                            'data-navigationtitle':
                                                                'sidebar',
                                                            children:
                                                                'Sidebar Title',
                                                        },
                                                        'navigationtitle',
                                                    ),
                                                ],
                                            },
                                            'navigationbar',
                                        ),
                                        jsx(
                                            'section',
                                            {
                                                'data-navigationbody':
                                                    'sidebar',
                                                children: (
                                                    <>
                                                        <NextClientContext />
                                                    </>
                                                ),
                                            },
                                            'navigationbody',
                                        ),
                                    ],
                                },
                                'navigationsidebar',
                            ),
                            jsx(
                                'article',
                                {
                                    id: 'navigationcontent',
                                    'data-navigationcolumn': 'content',
                                    children: [
                                        jsx(
                                            'div',
                                            {
                                                'data-navigationbackground':
                                                    'content',
                                            },
                                            'navigationbackground',
                                        ),
                                        jsx(
                                            'header',
                                            {
                                                'data-navigationbar': 'content',
                                                children: [
                                                    jsx(
                                                        'h3',
                                                        {
                                                            'data-navigationtitle':
                                                                'content',
                                                            children:
                                                                'Content Title',
                                                        },
                                                        'navigationtitle',
                                                    ),
                                                ],
                                            },
                                            'navigationbar',
                                        ),
                                        jsx(
                                            'section',
                                            {
                                                'data-navigationbody':
                                                    'content',
                                                children: (
                                                    <>
                                                        <h5>Body Content</h5>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                backgroundColor: `rgba(140,40,45,1)`,
                                                                backdropFilter:
                                                                    'blur(20px)',
                                                                WebkitBackdropFilter:
                                                                    'blur(20px)',
                                                                borderRadius: 10,
                                                                position:
                                                                    'relative',
                                                                top: '60px',
                                                                left: '0px',
                                                                zIndex: 999999999,
                                                                minHeight:
                                                                    '50px',
                                                                margin: 10,
                                                                padding: 10,
                                                                minWidth:
                                                                    '50px',
                                                            }}
                                                        >
                                                            <h5>{`Hiiii`}</h5>
                                                            <div>
                                                                {children}
                                                            </div>
                                                        </div>
                                                    </>
                                                ),
                                            },
                                            'navigationbody',
                                        ),
                                    ],
                                },
                                'navigationcontent',
                            ),
                            jsx(
                                'article',
                                {
                                    id: 'navigationdetail',
                                    'data-navigationcolumn': 'detail',
                                    children: [
                                        jsx(
                                            'div',
                                            {
                                                'data-navigationbackground':
                                                    'detail',
                                            },
                                            'navigationbackground',
                                        ),
                                        jsx(
                                            'header',
                                            {
                                                'data-navigationbar': 'detail',
                                                children: [
                                                    jsx(
                                                        'h3',
                                                        {
                                                            'data-navigationtitle':
                                                                'detail',
                                                            children:
                                                                'Detail Title',
                                                        },
                                                        'navigationtitle',
                                                    ),
                                                ],
                                            },
                                            'navigationbar',
                                        ),
                                        jsx(
                                            'section',
                                            {
                                                'data-navigationbody': 'detail',
                                                children: (
                                                    <>
                                                        <h5>Body Content</h5>
                                                        <ul>
                                                            <li>Uno</li>
                                                            <li>Dos</li>
                                                            <li>Tres</li>
                                                        </ul>
                                                    </>
                                                ),
                                            },
                                            'navigationbody',
                                        ),
                                    ],
                                },
                                'navigationdetail',
                            ),
                        ],
                    },
                    'navigationsplitview',
                )}
                {/* </EventsClient> */}
            </body>
        </html>
    )
}

// export async function getServerSideProps({
//   headers,
//   cookies,
//   layoutSegments,
//   searchParams,
//   pathname,
//   params,
// }) {
//   // console.log(args)
//   return {
//     props: {
//       ua: NextServer.userAgentFromString(headers['user-agent']),
//       searchParams,
//       // params,
//       // data: {
//       //   title: 'Title',
//       // },
//     },
//   }
// }
