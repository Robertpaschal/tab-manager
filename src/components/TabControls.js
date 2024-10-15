import React, { useState} from 'react';
import tabsService from '../services/tabsService';

const TabControls = () => {
    const [domain, setDomain] = useState('');

    const handleCloseAll = () => {
        tabsService.closeAllTabs();
    };

    const handleGroupTabs = () => {
        tabsService.groupTabs();
    };

    const handleCloseDomainTabs = () => {
        if (domain) {
            tabsService.closeTabsFromDomain(domain);
        } else {
            alert('Please enter a domain');
        }
    };

    return (
        <div className='tab-controls'>
            <button onClick={handleCloseAll}>Close All Tabs</button>
            <button onClick={handleGroupTabs}>Group Tabs</button>
            <input
            type='text'
            placeholder='Enter domain'
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            ></input>
            <button onClick={handleCloseDomainTabs}>Close Tabs from Domain</button>
        </div>
    );
};

export default TabControls;
