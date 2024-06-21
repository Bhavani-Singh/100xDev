import { useState } from "react";


function useLocalStorage(key, defaultValue) {
    const [ storedValue, setStoredValue ] = useState(() => {
        try {
            const value = window.localStorage.getItem(key);

            if(value) {
                return JSON.parse(value);
            }
            else {
                window.localStorage.setItem(key, JSON.stringify(defaultValue));
            }
        }
        catch(error) {
            return defaultValue;
        }
    });

    function setValue(newValue) {
        try {
            window.localStorage.setItem(key, JSON.stringify(newValue));
        }
        catch(error) {
            console.log(error);
        }
        setStoredValue(newValue);
    }

    return [storedValue, setValue];
}

export default useLocalStorage;