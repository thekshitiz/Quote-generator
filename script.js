// DOM Elements
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

// Show loading spinner
function showLoadingSpinner() {
    loader.hidden = false
    quoteContainer.hidden = true
}

// Hide loading spinner
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false
        loader.hidden = true
    }
}

// Show New Quote
async function newQuote() {
    showLoadingSpinner()
    try {
        // Using The Quotes Hub API
        const response = await fetch('https://thequoteshub.com/api/')
        const data = await response.json()

        // Check if Author field is blank and replace with 'Unknown'
        if (!data.author) {
            authorText.textContent = 'Unknown'
        } else {
            authorText.textContent = data.author
        }

        // Reduce font size for long quotes
        if (data.text.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }

        quoteText.textContent = data.text

        // If there are tags, we could use them (optional feature)
        if (data.tags && data.tags.length > 0) {
            console.log('Quote tags:', data.tags)
        }

        removeLoadingSpinner()
    } catch (error) {
        console.log('Error fetching quote:', error)
        quoteText.textContent = 'Oops! Something went wrong. Please try again.'
        authorText.textContent = 'Error'
        removeLoadingSpinner()
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
newQuote()
