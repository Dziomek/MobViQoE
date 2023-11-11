import Cookies from "js-cookie"

export function setCookieBeforeInstruction() {
    Cookies.set('history', JSON.stringify({ 'currentRoute': 'instruction' }), { expires: 1 })
}

export function setCookieBeforeSurvey() {
    Cookies.set('history', JSON.stringify({ 'currentRoute': 'survey' }), { expires: 1 })
}

export function setCookieBeforeSession(index, excludedIndexes) {
    Cookies.set('history', JSON.stringify({
        currentRoute: 'session',
        videoIndex: index,
        excludedIndexes: excludedIndexes
    }), { expires: 1 })
}

