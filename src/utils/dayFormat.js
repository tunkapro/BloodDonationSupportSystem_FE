export function formatDate(date) {
    if (!(date instanceof Date)) return "format date error";

    const yyyy = String(date.getFullYear());
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;


}

export function stringifyLocalDate(date) {
    return JSON.stringify(formatDate(date));
    
}