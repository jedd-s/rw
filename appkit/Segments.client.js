// import {
//   useRouter,
//   useSelectedLayoutSegment,
// } from 'next/dist/client/components/hooks-client'

import React from 'react'
import Next from './next'

export default function Segments() {
  // const segments = useRouter()
  const AppTreeContext = React.useContext(Next.AppTreeContext)
  const LayoutSegments = React.useContext(Next.LayoutSegmentsContext)
  const PathnameContext = React.useContext(Next.PathnameContext)
  const QueryContext = React.useContext(Next.QueryContext)
  const AppRouterContext = React.useContext(Next.AppRouterContext)
  const ParamsContext = React.useContext(Next.ParamsContext)
  const FullAppTreeContext = React.useContext(Next.FullAppTreeContext)

  console.log({
    AppTreeContext,
    LayoutSegments,
    PathnameContext,
    QueryContext,
    AppRouterContext,
    ParamsContext,
    FullAppTreeContext,
    HeadersContext,
    PreviewDataContext,
    CookiesContext,
  })
  return <span id='segements'>{'Segements'}</span>
}
