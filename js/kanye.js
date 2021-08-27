const loadQuotes = () => {
    fetch('https://api.kanye.rest/')
    .then(response => response.json())
    .then(data => displayQoutes(data))
}

const displayQoutes = quotes => {
    const quoteElement = document.getElementById('quote');
    quoteElement.innerText = quotes.quote;
}