import React from 'react'

const queryQueue = []
const mutationQueue = []

let frameScheduled = false
function scheduleFrame() {
    if (frameScheduled) {
        return
    }
    frameScheduled = true
    requestAnimationFrame(() => {
        while (queryQueue.length || mutationQueue.length) {
            while (mutationQueue.length) {
                mutationQueue.shift()()
            }
            while (queryQueue.length) {
                queryQueue.shift()()
            }
        }
        frameScheduled = false
    })
}

export function read(fn) {
    queryQueue.push(fn)
    scheduleFrame()
}

export function write(fn) {
    mutationQueue.push(fn)
    scheduleFrame()
}

const getServerSnapshot = () => true

export function useMediaQuery(query) {
    const [subscribe, getSnapshot] = useMemo(() => {
        if (typeof window == 'undefined') return getServerSnapshot
        const mql = window.matchMedia(query)
        const subscribe = (notify) => {
            mql.addEventListener('change', notify)
            return () => {
                mql.removeEventListener('change', notify)
            }
        }
        const getSnapshot = () => mql.matches
        return [subscribe, getSnapshot]
    }, [query])
    return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
