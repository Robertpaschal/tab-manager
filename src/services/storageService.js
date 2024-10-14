const storageService = {
    get: (key, callback) => {
        chrome.storage.local.get([key], (result) => {
            callback(result[key]);
        });
    },

    set: (key, value, callback) => {
        chrome.storage.local.set({ [key]: value }, () => {
            if (callback) callback();
        });
    },

    remove: (key, callback) => {
        chrome.storage.local.remove([key], () => {
            if (callback) callback();
        });
    }
};

export default storageService;