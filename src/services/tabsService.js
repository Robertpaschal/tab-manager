const tabsService = {
    getAllTabs: (callback) => {
        chrome.tabs.query({}, (tabs) => {
            callback(tabs);
        });
    },

    closeTab: (tabId) => {
        chrome.tabs.remove(tabId);
    },

    closeAllTabs: () => {
        chrome.tabs.query({}, (tabs) => {
            const tabIds = tabs.map((tab) => tab.id);
            chrome.tabs.remove(tabIds);
        });
    },

    groupTabs: () => {
        chrome.tabs.query({}, (tabs) => {
            const tabIds = tabs.map((tab) => tab.id);
            chrome.tabs.group({ tabIds }, (groupId) => {
                console.log('Tabs grouped with ID: ', groupId);
            });
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
    }
};

export default tabsService;