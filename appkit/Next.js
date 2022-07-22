import {
  LayoutSegmentsContext,
  ParamsContext,
  PathnameContext,
  QueryContext,
} from 'next/dist/client/components/hooks-client-context'
import {
  HeadersContext,
  PreviewDataContext,
  CookiesContext,
} from 'next/dist/client/components/hooks-server-context'
import {
  AppRouterContext,
  AppTreeContext,
  FullAppTreeContext,
} from 'next/dist/shared/lib/app-router-context'

const Next = {
  /* shared router context */
  AppRouterContext,
  AppTreeContext,
  FullAppTreeContext,
  /* client context */
  LayoutSegmentsContext,
  ParamsContext,
  PathnameContext,
  QueryContext,
  /* server context */
  HeadersContext,
  PreviewDataContext,
  CookiesContext,
}

export default Next
