import React from 'react';
import TabItem from './TabItem';

const TabList = ({ tabs }) => {
    return ( 
        <div className='tab-list'>
            {tabs.length === 0 ? (
                <p>No tabs available</p>
            ): (
                tabs.map((tab) => <TabItem key={tab.id} tab={tab} />)
            )}
        </div>
    );
};

export default TabList;
