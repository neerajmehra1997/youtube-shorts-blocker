let shortsKeywords = [
    'ytd-reel-shelf-renderer', // Shorts shelf on the homepage and elsewhere
    'ytm-shorts-lockup-view-model-v2', // Shorts in YouTube Music
    'a[href*="/shorts/"]', // Any link to a Shorts video
    'ytd-reel-player-renderer', // Shorts video player
    'a[title="Shorts"]' // Sidebar Shorts link
]

function removeShorts() {
    const selector = shortsKeywords.join(', ');
    document.querySelectorAll(
        selector
    ).forEach(el => el.remove());

    // If user is on the Shorts dedicated page, redirect them to home
    if (window.location.pathname.startsWith("/shorts")) {
        console.log("Redirecting from Shorts page to Home...");
        window.location.href = "https://www.youtube.com/";
    }
}

function removeDivsContainingShorts() {
    const shortsSections = document.querySelectorAll('ytd-rich-shelf-renderer');
    shortsSections.forEach((section) => {
        const heading = section.querySelector('span, h2, yt-formatted-string'); // Grab text from common heading elements

        if (heading && heading.textContent.trim().toLowerCase() == 'shorts') {
            console.log("Removed shorts sections")
            section.remove();
        }
    })
}

// Run once when the page first loads
removeShorts();
removeDivsContainingShorts();

// Keep watching for dynamically loaded content
const observer = new MutationObserver(() => {
    removeDivsContainingShorts();
    removeShorts();
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});
