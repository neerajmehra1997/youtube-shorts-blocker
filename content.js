const YOUTUBE = 'https://www.youtube.com/';
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
        window.location.href = YOUTUBE;
    }
}

function removeDivsContainingShorts() {
    const shortsSections = document.querySelectorAll('ytd-rich-shelf-renderer');
    shortsSections.forEach((section) => {
        const heading = section.querySelector('span, h2, yt-formatted-string'); // Grab text from common heading elements

        if (heading && heading.textContent.trim().toLowerCase() === 'shorts') {
            console.log("Removed shorts sections")
            section.remove();
        }
    })
}
function removeShortsIcon() {
    const shortsSpans = document.querySelectorAll('span');
    shortsSpans.forEach((span) => {
        if (span.textContent.trim().toLowerCase() === 'shorts') {
            let parent = span.closest('ytd-item-section-renderer, ytd-guide-entry-renderer, ytd-guide-section-renderer, ytd-guide-collapsible-entry-renderer');

            if (parent) {
                parent.remove();
                console.log('Removed Shorts section:', parent);
            } else {
                span.remove();
                console.log('Removed Shorts span:', span);
            }
        }
    })
}

// Run once when the page first loads
removeShorts();
removeShortsIcon()
removeDivsContainingShorts();

// Keep watching for dynamically loaded content
const observer = new MutationObserver(() => {
    removeDivsContainingShorts();
    removeShorts();
    removeShortsIcon()
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});
