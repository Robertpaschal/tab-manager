import React from 'react';
import tabsService from '../services/tabService';

const tabControls = () => {
    const handleCloseAll = () => {
        tabsService.closeAllTabs();
    };

    const handleGroupTabs = () => {
        tabsService,groupTabs();
    };

    return (
        <div className='tab-controls'>
            <button onClick={handleCloseAll}>Close All Tabs</button>
            <button onClick={handleGroupTabs}>Group Tabs</button>
        </div>
    );
};

export default tabControls;
