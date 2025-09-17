function removeShorts() {
    document.querySelectorAll(
        'ytd-reel-shelf-renderer, ' +
        'ytm-shorts-lockup-view-model-v2, ' +
        'a[href*="/shorts/"], ' +
        'ytd-reel-player-renderer'
    ).forEach(el => el.remove());

    // 2. If user is on the Shorts dedicated page, redirect them to home
    if (window.location.pathname.startsWith("/shorts/*")) {
        console.log("Redirecting from Shorts page to Home...");
        window.location.href = "https://www.youtube.com/";
    }
}

// Run once when the page first loads
removeShorts();

// Keep watching for dynamically loaded content
const observer = new MutationObserver(removeShorts);
observer.observe(document.body, {
    childList: true,
    subtree: true
});
