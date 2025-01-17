import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

/*
  TODO: Fix JSDocs
  TODO: Write Tests
*/

/**
 * @param {string} key - key to store in local storage with
 * @param {any} initialValue - initial value to store in the local storage
 * @return [value, function(): void, function(): void]
 */
export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, () => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.error(`Error getting ${key} from localstorage: ${error}`);
    }
  });

  const setValue = <T,>(value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting setting ${key} in localstorage: ${error}`);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing ${key} from localstorage: ${error}`);
    }
  };

  return [storedValue, setValue, removeValue];
};
