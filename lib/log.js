const DEBUG = false

export function log(...args) {
    return console.log(...args)
}
export function warn(...args) {
    return console.warn(...args)
}

export function info(...args) {
    return console.info(...args)
}
export function error(...args) {
    return console.error(...args)
}
export function assert(...args) {
    return console.assert(...args)
}
export function debug(key, ...args) {
    if (DEBUG) {
        log(key, ...args)
    }
}
