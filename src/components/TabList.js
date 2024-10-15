import React, { useState } from 'react';
import TabItem from './TabItem';
import tabsService from '../services/tabsService';

const TabList = ({ tabs }) => {
    const [selectedTabs, setSelectedTabs] = useState([]);

    const handleSelectTab = (tabId, isSelected) => {
        setSelectedTabs(prevState => {
            if (isSelected) {
                return [...prevState, tabId];
            } else {
                return prevState.filter(id => id !== tabId);
            }
        });
    };

    return ( 
        <div className='tab-list'>
            {tabs.length === 0 ? (
                <p>No tabs available</p>
            ): (
                tabs.map((tab) => (
                <TabItem key={tab.id} tab={tab} onSelect={handleSelectTab} />
                ))
            )}
            <button onClick={() => tabsService.groupTabs(selectedTabs)}>Group Selected Tabs</button>
        </div>
    );
};

export default TabList;
