import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
import RightBar from '../../components/RightBar';
import Map from "../../components/Map";
import Filters from '../../components/Filters';

const AgentPanel = () => {
    const [filterProperties, setFilterProperties] = useState([]);

    // Function to handle property updates
    const handleUpdateProperties = (data) => {
        setFilterProperties(data);
    };

    useEffect(() => {
        // Hide the global scrollbar when the component is mounted
        document.body.style.overflow = 'hidden';

        return () => {
            // Restore the default scrollbar behavior when the component is unmounted
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="custom-container">
            {/* Sidebar */}
            <div className="custom-sidebar">
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="custom-main-content">
                <TopBar
                    properties={filterProperties}
                    updateProperties={handleUpdateProperties}
                />
                <Map
                    properties={filterProperties}
                    updateProperties={handleUpdateProperties}
                />
            </div>
        </div>
    );
};

export default AgentPanel;
