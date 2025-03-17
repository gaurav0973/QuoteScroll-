const nextBtn = document.querySelector("#next-btn")
const tweetBtn = document.querySelector("#tweet-btn")
const quote = document.getElementById("quote-text")
const author = document.getElementById("author-text")
const copyToClipBtn = document.getElementById("copy-to-clip-btn")


const renderQuote = () => {
    fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random")
        .then(response => response.json())
        .then(data => {
            if (data.data) {
                const authorText = data.data.author
                const quoteText = data.data.content

                quote.innerText = `"${quoteText}"\n`
                author.innerText = ` - ${authorText}`
            }
        })
        .catch(error => {
            console.log("Error happened:", error)
        });
};

const tweetQuote = () => {
    const quoteText = quote.innerText
    const authorText = author.innerText
    const text = `${quoteText} \n${authorText}`
    const tweetUrl = `https://x.com/compose/post?text=${encodeURIComponent(text)}`;
    window.open(tweetUrl, "_blank")
};

const copyToClipboard = () => {
    const textToCopy = `${quote.innerText}\n${author.innerText}`;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            copyToClipBtn.innerText = "Copied! ✅";
            setTimeout(() => {
                copyToClipBtn.innerText = "Clipboard📓 ";
            }, 2000);
        })
        .catch(err => console.error("Failed to copy:", err));
};




nextBtn.addEventListener("click", renderQuote);
tweetBtn.addEventListener("click", tweetQuote);
copyToClipBtn.addEventListener("click", copyToClipboard);

renderQuote();
