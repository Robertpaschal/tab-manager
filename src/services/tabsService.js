const tabsService = {
    // Function to get all currently open tabs
    getAllTabs: (callback) => {
        chrome.tabs.query({}, (tabs) => {
            callback(tabs);
        });
    },

    // Close a specific tab by ID
    closeTab: (tabId) => {
        chrome.tabs.remove(tabId, () => {
            if (chrome.runtime.lastError) {
                console.log('Error closing tab: ', chrome.runtime.lastError);
            } else {
                console.log('Tab closed with ID: ', tabId);
            }
        });
    },

    // Close all tabs
    closeAllTabs: () => {
        chrome.tabs.query({}, (tabs) => {
            const tabIds = tabs.map((tab) => tab.id);
            chrome.tabs.remove(tabIds);
        });
    },

    groupTabs: (tabIds) => {
        if (tabIds.length === 0) {
            console.log('No tabs selected for grouping.');
            return;
        }
        chrome.tabs.group({ tabIds }, (groupId) => {
            console.log(`Tabs grouped under group ID: ${groupId}`);
        });
    },

    closeTabsFromDomain: (domain) => {
        chrome.tabs.query({}, (tabs) => {
            const tabsToClose = tabs.filter((tab) => {
                try {
                    const tabUrl = new URL(tab.url);
                    return tabUrl.hostname.includes(domain);
                } catch (error) {
                    return false;
                }
            });

            const tabIds = tabsToClose.map((tab) => tab.id);
            chrome.tabs.remove(tabIds, () => {
                console.log(`${tabIds.length} tabs closed from domain: ${domain}`);
            });
        });
    },

    setSelectedTabs: (tabIds) => {
        chrome.storage.local.set({ setSelectedTabs: tabIds });
    }
};

export default tabsService;