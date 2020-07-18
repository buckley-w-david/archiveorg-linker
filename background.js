browser.browserAction.onClicked.addListener(() => {
    browser.tabs.executeScript({file: "/content_scripts/archivify.js"})
});
