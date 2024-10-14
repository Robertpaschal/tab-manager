import React, { useEffect, useState } from 'react';
import TabList from './components/TabList';
import tabControls from './components/TabControls';
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
            <tabControls />
            <TabList tabs={tabs} />
        </div>
    );
};

export default App;