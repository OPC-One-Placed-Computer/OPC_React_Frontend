function getImageUrl(name) {
    return new URL(`https://onepc.online/${name}`, import.meta.url).href
}
export default getImageUrl;