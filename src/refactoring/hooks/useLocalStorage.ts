export const useLocalStorage = () => {
    const getLocalStorage = (key: string) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    };

    const setLocalStorage = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    return {
        getLocalStorage,
        setLocalStorage,
    };
};
