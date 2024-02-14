import { createContext, useContext, useEffect } from "react";
import PropTypes from 'prop-types'
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) =>
{
    const [darkMode, setDarkMode] = useLocalStorageState(window.matchMedia('(prefers-color-scheme: dark)').matches, 'dark-mode')


    useEffect(() =>
    {
        if (darkMode)
        {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        }
        else
        {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }


    }, [darkMode])

    const toggleDarkMode = () =>
    {
        setDarkMode(cur => !cur)
    }

    return (
        <DarkModeContext.Provider value={{
            darkMode,
            toggleDarkMode
        }}>
            {children}
        </DarkModeContext.Provider>
    )
}

const useDarkMode = () =>
{
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    return { darkMode, toggleDarkMode }
}

DarkModeProvider.propTypes = {
    children: PropTypes.node
}
export { DarkModeProvider, useDarkMode };