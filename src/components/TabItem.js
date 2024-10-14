import React from 'react';

const TabItem = ({ tab }) => {
    const handleCloseTab = () => {
        chrome.tabs.remove(tab.id, () => {
            if (chrome.runtime.lastError) {
                console.log('Error closing tab: ', chrome.runtime.lastError);
            } else {
                console.log('Tab closed: ', tab);
            }
        });
    };

    return (
        <div className='tab-item'>
            <h4>{tab.title}</h4>
            <p>{tab.url}</p>
            <button onClick={handleCloseTab}>Close Tab</button>
        </div>
    );
};

export default TabItem;