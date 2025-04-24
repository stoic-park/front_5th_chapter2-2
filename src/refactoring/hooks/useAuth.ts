import { useState } from 'react';

export const useAuth = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    return { isAdmin, setIsAdmin };
};
