export function timestampParsor(timestamp, mode){
    console.log(timestamp);

    const date = new Date(+timestamp);
    return date.toLocaleDateString()
}