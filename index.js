const apiBaseUrl = 'https://api.api-ninjas.com/v1/quotes';
const apiKey = '304fPx6Lx0Q2y4pQCqam7cvxQCHzXFOkq6vQVpKK';

// Fetch a random quote
async function getQuote() {
    try {
        const response = await fetch(apiBaseUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey
            }
        });
        const data = await response.json();
        if (data.length > 0) {
            const quote = data[0];
            document.getElementById('quote-text').innerText = quote.quote;
            document.getElementById('quote-author').innerText = `— ${quote.author}`;
        } else {
            document.getElementById('quote-text').innerText = 'No quote available.';
            document.getElementById('quote-author').innerText = '';
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        document.getElementById('quote-text').innerText = 'Error loading quote.';
        document.getElementById('quote-author').innerText = '';
    }
}

// Search quotes by author
async function searchByAuthor(author) {
    try {
        const response = await fetch(`${apiBaseUrl}?author=${encodeURIComponent(author)}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching quotes by author:', error);
        return [];
    }
}

// Event listeners
document.getElementById('new-quote-button').addEventListener('click', getQuote);

document.getElementById('search-button').addEventListener('click', async () => {
    const author = document.getElementById('search-input').value.trim();
    const results = await searchByAuthor(author);
    
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    if (results.length > 0) {
        results.forEach(quote => {
            const li = document.createElement('li');
            li.innerText = `"${quote.quote}" — ${quote.author}`;
            resultsList.appendChild(li);
        });
    } else {
        resultsList.innerHTML = '<li>No quotes found</li>';
    }
});

// Initialize with a quote
getQuote();
