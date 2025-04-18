import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import TopBar from '../../components/TopBar'
import RightBar from '../../components/RightBar'
import Map from "../../components/Map"
import Filters from '../../components/Filters'

const ClientPanel = () => {
    const [filterProperties, setFilterProperties] = useState([]);

    // Function to handle property updates
    const handleUpdateProperties = (data) => {
        setFilterProperties(data);
    };

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
    )
}

export default ClientPanel
