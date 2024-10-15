import React, { useEffect, useState } from 'react';
import TabList from './components/TabList';
import TabControls from './components/TabControls';
import tabsService from './services/tabsService';

const App = () => {
    const [tabs, setTabs] = useState([]);
    useEffect(() => {
        // Fetch all tabs on initial load
        tabsService.getAllTabs(setTabs);
    }, []);

    return (
        <div className='App'>
            <h1>Tab Manager Extension</h1>
            <TabControls />
            <TabList tabs={tabs} />
        </div>
    );
};

export default App;