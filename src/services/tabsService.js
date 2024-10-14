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
    }
};

export default tabsService;