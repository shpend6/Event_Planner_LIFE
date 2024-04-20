/*import {useState, createContext, useContext} from "react";

// Create a context to manage the state of the switch
const SwitchContext = createContext();
// Provider component that wraps around the components needing access to the switch state
export const SwitchProvider = ({children}) => {
    // Define state for dark mode and a function to update it
    const [isDarkMode, setIsDarkMode] = useState(false);

    return(
        // Provide the state and updater function to the components within this context
        <SwitchContext.SwitchProvider value={{isDarkMode, setIsDarkMode}}>
            {/* Render the children components }
            {children}
        </SwitchContext.SwitchProvider>
    )
}
// Custom hook to consume the switch context and toggle dark mode
export const useToggle = () => useContext(SwitchContext.SwitchProvider);*/
