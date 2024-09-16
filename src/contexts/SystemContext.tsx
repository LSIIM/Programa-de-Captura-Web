import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import myStorage from "../services/localstorage";

//CONST
const ATTRIBUTE_THEME = "data-bs-theme";

//TYPES
export type tLightMode = "light" | "dark";
export interface SystemProviderProps {
    children?: ReactNode;
}

//CONTEXT PROPS
interface SystemContextProps {
    lightMode: tLightMode;
    useToggleLightMode: () => void;
}

//CONTEXT
export const SystemContext = createContext<SystemContextProps>({ lightMode: "light", useToggleLightMode: () => {} });

export default function SystemProvider(props: SystemProviderProps) {
    //STATES
    const [lightMode, setLightMode] = useState<tLightMode>(myStorage.userPreferences.getLightMode());

    //EVENTS
    const handleOnLightMode = useCallback(() => {
        const currentMode = myStorage.userPreferences.getLightMode();
        document.documentElement.setAttribute(ATTRIBUTE_THEME, currentMode);
        setLightMode(currentMode);
    }, []);

    useEffect(() => {
        handleOnLightMode();
        return () => {};
    }, [handleOnLightMode]);

    const useToggleLightMode = useCallback(() => {
        const currentMode = myStorage.userPreferences.getLightMode();
        const newMode: tLightMode = currentMode === "dark" ? "light" : "dark";

        //Modifica visualmente o tema e salva nas preferencias de usuário
        document.documentElement.setAttribute(ATTRIBUTE_THEME, newMode);
        myStorage.userPreferences.setLightMode(newMode);
        setLightMode(newMode);
    }, []);

    return <SystemContext.Provider value={{ lightMode, useToggleLightMode }}>{props.children}</SystemContext.Provider>;
}
