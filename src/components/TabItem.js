import React, { useState } from 'react';

const TabItem = ({ tab }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleCloseTab = () => {
        chrome.tabs.remove(tab.id, () => {
            if (chrome.runtime.lastError) {
                console.log('Error closing tab: ', chrome.runtime.lastError);
            } else {
                console.log('Tab closed: ', tab);
            }
        });
    };

    const handleSelect = () => {
        setIsSelected(!isSelected);
        onselect(tab.id, !isSelected);
    };

    return (
        <div className='tab-item'>
            <input type='checkbox' checked={isSelected} onChange={handleSelect} />
            <h4>{tab.title}</h4>
            <p>{tab.url}</p>
            <button onClick={handleCloseTab}>Close Tab</button>
        </div>
    );
};

export default TabItem;