function formatedDate(created_at){
    const options = {
        year: 'numeric',
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }
    const date = new Date(created_at)
    const fDate = date.toLocaleDateString("en-UK", options)
    return fDate
}

export default formatedDate
