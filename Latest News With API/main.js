const apiKey = "f6444a5b2bf5464dbfff6db0313a240d";
const pageSize = 10;

function fetchNews() {
    const url = `https://newsapi.org/v2/everything?q=technology&pageSize=${pageSize}&apiKey=${apiKey}`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        newsArticle(data.articles);
    })
    .catch((error) => console.log(error))
}

function newsArticle(articles) {
    const newsList = document.querySelector(".news-list");
    articles.forEach(article => {
        const listItem = document.createElement("li");
        const truncatedTitle = truncateString(article.title, 5)
        listItem.innerHTML = `
            <div class="info">
                <div class="author"><span>Author: </span>${article.author || "Unknown"}</div>
                <div class="published-at">${new Date(article.publishedAt).toDateString()}</div>
            </div>
            <img src="${article.urlToImage}" alt="${article.title || "NO Title"}">
            <a href="${article.url}" title="${article.title}" target="_blank">${truncatedTitle || "NO Title"}</a>
            <p class="description">${article.description || "NO Descripion"}</p>
            <div class="source"><span>[Source]</span>${article.source.name || "NO Sourse"}</div>
        `
        newsList.appendChild(listItem)
    })
}

function truncateString(str, numWords) {
    let words = str.split(" ");
    if (words.length <= numWords) {
        return str;
    } else {
        return words.slice(0,numWords).join(" ") + "..."
    }
}

window.onload = fetchNews;