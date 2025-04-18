import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const RolesContext = createContext({
    roles: [],
    refreshRoles: () => { },
    loading: false,
});

export const RolesProvider = ({ children }) => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const res = await axios.get("https://apis.geoestate.ai/api/Roles/GetRoles");
            setRoles(res.data);
        } catch (err) {
            console.error("Failed to fetch roles: ", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <RolesContext.Provider value={{ roles, refreshRoles: fetchRoles, loading }}>
            {children}
        </RolesContext.Provider>
    );
};

