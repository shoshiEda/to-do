export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    calcTime
}

function calcTime(time){
    const timeDifference = Date.now()-time
    const yearsDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30*12));
    if(yearsDifference>0) return new Date(date).toLocaleString()
    const monthsDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    if(monthsDifference===1) return `1 month ago`
    if(monthsDifference>0) return `${monthsDifference} months ago`
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    if(daysDifference===1) return `1 day ago`
    if(daysDifference>0) return `${daysDifference} days ago`
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60))
    if(hoursDifference===1) return `1 hour ago`
    if(hoursDifference>0) return `${hoursDifference} hours ago`
    const minutesDifference = Math.floor(timeDifference / (1000 * 60 ))
    if(minutesDifference===1) return `1 minute ago`
    if(minutesDifference>0) return `${minutesDifference} minutes ago`
    if(minutesDifference===0) return `just now`

}


function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}