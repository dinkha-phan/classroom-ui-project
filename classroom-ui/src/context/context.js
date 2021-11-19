import { createContext } from "react";
import { useState , useContext} from "react";

const AddContext = createContext();

export function useLocalContext() {
    return useContext(AddContext);
}

export function ConxtextProvider({ children }) {
    const [createClassDialog, setCreateClassDialog] = useState(false);


    const value = {
        createClassDialog, setCreateClassDialog
    }

    return (
        <AddContext.Provider value={value}>
            {children}
        </AddContext.Provider>
    )
}