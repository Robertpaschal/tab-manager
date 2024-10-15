import tabsService from '../services/tabsService';

let contextMenusCreated = false;

if (!contextMenusCreated) {
    chrome.contextMenus.create({
        id: "close_all_tabs",
        title: "Close All Tabs",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        id: "group_selected_tabs",
        title: "Group Selected Tabs",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        id: "close_tabs_from_domain",
        title: "Close Tabs from Domain...",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        id: "get_all_tabs",
        title: "Get All Open Tabs",
        contexts: ["all"]
    });

    contextMenusCreated = true;
}

// Handle context menu click events
chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "close_all_tabs") {
        tabsService.closeAllTabs();
    } else if (info.menuItemId === "group_selected_tabs") {
        chrome.storage.local.get(['selectedTabIds'], (result) => {
            const tabIds = result.selectedTabIds || [];
            tabsService.groupTabs(tabIds); // Call groupTabs with selected IDs
        });
    } else if (info.menuItemId === "close_tabs_from_domain") {
        const domain = prompt("Enter the domain to close tabs (e.g., example.com):");
        if (domain) {
            tabsService.closeTabsFromDomain(domain);
        }
    } else if (info.menuItemId === "get_all_tabs") {
        tabsService.getAllTabs((tabs) => {
            console.log('Currently open tabs:', tabs);

            const tabTitles = tabs.map(tab => tab.title).join('\n');
            chrome.notifications.create({
                type: 'basic',
                title: 'Currently Open Tabs',
                message: tabTitles,
                priority: 2
            });
        });
    }
});

// Listener for messages from popup or other scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getAllTabs') {
        tabsService.actiongetAllTabs((tabs) => {
            sendResponse({ tabs });
        });
    } else if (message.action === 'closeTabsFromDomain') {
        tabsService.closeTabsFromDomain(message.domain);
        sendResponse({ status: 'Closing tabs from ' + message.domain });
    } else if (message.action === "closeAllTabs") {
        tabsService.closeAllTabs();
        sendResponse({ status: "All tabs closed" });
    } else if (message.action === "groupAllTabs") {
        const tabIds = message.tabIds || [];
        tabsService.groupTabs(tabIds);
        sendResponse({ status: "Grouped tabs." });
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
