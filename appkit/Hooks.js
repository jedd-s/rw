import React from 'react'

const isBrowser = typeof window != 'undefined'

const useLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect

export { useLayoutEffect }
