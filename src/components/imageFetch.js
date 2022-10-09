export function imageFetch(query) {
    const UrlBase = 'https://pixabay.com/api/';
    const ApiKey = '29417060-6945200ead3992d525ee3c3b8';
    const defaultpage = 1;
    const otherParameters = `image_type=photo&orientation=horizontal&per_page=12`;

    return fetch(
        `${UrlBase}?q=${query}&page=${defaultpage}&key=${ApiKey}&${otherParameters}`
    )
}