import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [storyIndex, setStoryIndex] = useState(0)
    return (
        <Context.Provider value={{ navigate, storyIndex, setStoryIndex }}>
            {children}
        </Context.Provider>
    )
}

