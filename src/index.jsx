import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { RolesProvider } from './Context/RolesContext';

// Ensure the root element is available
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <RolesProvider>
            <React.StrictMode >
                <App />
            </React.StrictMode >
        </RolesProvider>
    );
} else {
    console.error("Failed to find the root element");
}
