// Function to get all currently open tabs
function getAllTabs(callback) {
    chrome.tabs.query({}, (tabs) => {
        callback(tabs);
    });
}

// Close all tabs
function closeAllTabs() {
    chrome.tabs.query({}, (tabs) => {
        const tabIds = tabs.map(tab => tab.id);
        chrome.tabs.remove(tabIds);
    });
}

// Function to close a specific tab by ID
function closeTab(tabId) {
    chrome.tabs.remove(tabId, () => {
        if (chrome.runtime.lastError) {
            console.log('Error closing tab: ', chrome.runtime.lastError);
        } else {
            console.log('Tab closed with ID: ', tabId);
        }
    });
}

// Function to close all tabs from a specific domain
function closeTabsFromDomain(domain) {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            try {
                const tabUrl = new URL(tab.url);
                if (tabUrl.hostname.includes(domain)) {
                    closeTab(tab.id);
                }
            } catch (error) {
                console.log('Error parsing tab URL: ', error);
            }
        });
    });
}

// Group all tabs into a single tab group
function groupAllTabs() {
    chrome.tabs.query({}, (tabs) => {
        const tabIds = tabs.map(tab => tab.id);
        chrome.tabs.group({ tabIds }, (groupId) => {
            console.log(`All tabs grouped under group ID: ${groupId}`);
        });
    });
}

let contextMenusCreated = false;

if (!contextMenusCreated) {
// Create context menu items for closing and grouping tabs
chrome.contextMenus.create({
    id: "close_all_tabs",
    title: "Close All Tabs",
    contexts: ["all"]
});

chrome.contextMenus.create({
    id: "group_all_tabs",
    title: "Group All Tabs",
    contexts: ["all"]
});

contextMenusCreated = true;
}

// Handle context menu click events
chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "close_all_tabs") {
        closeAllTabs();
    } else if (info.menuItemId === "group_all_tabs") {
        groupAllTabs();
    }
});

// Listener for messages from popup or other scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getAllTabs') {
        getAllTabs((tabs) => {
            sendResponse({ tabs });
        });
    } else if (message.action === 'closeTabsFromDomain') {
        closeTabsFromDomain(message.domain);
        sendResponse({ status: 'Closing tabs from ' + message.domain });
    } else if (message.action === "closeAllTabs") {
        closeAllTabs();
    } else if (message.action === "groupAllTabs") {
        groupAllTabs();
    }
    
    sendResponse({ status: "success" });
    return true; // Return true to indicate an async response
});

// Listener for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        console.log('Tab updated: ', tab.url);
    }
});

// Logs when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    console.log('Tab Manager Extension installed.');
});

// Initialize listeners on Chrome extension startup
chrome.runtime.onStartup.addListener(() => {
    console.log('Tab Manager extension started.');
});
