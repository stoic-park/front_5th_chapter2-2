// FIXME: useCart 훅처럼 사용할 수 있게, 값을 가져오고 셋 할수 있도록 수정
// useState, useEffect 사용했을 때와 차이점은?
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
