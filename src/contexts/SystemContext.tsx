import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import myStorage from "../services/localstorage";
import { v4 } from "uuid";
import { Alert } from "../components";

//CONST
const ATTRIBUTE_THEME = "data-bs-theme";

//TYPES
export type tAlert = { dateTime: Date; message: string; id: string; hide: () => void; show: boolean };

export type tLightMode = "light" | "dark";
export interface SystemProviderProps {
    children?: ReactNode;
}

//CONTEXT PROPS
interface SystemContextProps {
    lightMode: tLightMode;
    toggleLightMode: () => void;
    alerts: tAlert[];
    showAlert: (message: string) => void;
}

//CONTEXT
export const SystemContext = createContext<SystemContextProps>({
    lightMode: "light",
    toggleLightMode: () => {},
    alerts: [],
    showAlert: () => {},
});

export default function SystemProvider(props: SystemProviderProps) {
    //STATES
    const [lightMode, setLightMode] = useState<tLightMode>(myStorage.userPreferences.getLightMode());
    const [alerts, setAlerts] = useState<tAlert[]>([]);

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

    const onRemoveAlert = useCallback((id: string) => {
        setTimeout(() => setAlerts((current) => current.filter((alert) => alert.id !== id)), 200);
    }, []);

    const onHideAlert = useCallback(
        (id: string) => {
            setAlerts((current) => current.map((alert) => (alert.id === id ? { ...alert, show: false } : alert)));
            setTimeout(() => onRemoveAlert(id), 200);
        },
        [onRemoveAlert]
    );

    const showAlert = useCallback(
        (message: string) => {
            const id = v4();
            const dateTime = new Date();
            setAlerts((current) => {
                const newAlert: tAlert = { show: true, id, dateTime, message, hide: () => onHideAlert(id) };

                //Verifica se a message já está sendo mostrada => mostra a nova e remove antiga
                if (current.some((alert) => alert.message === message))
                    return [...current.filter((alert) => alert.message !== message), newAlert];
                //Adiciona o novo alerta
                return [...current, newAlert];
            });
        },
        [onHideAlert]
    );

    const toggleLightMode = useCallback(() => {
        const currentMode = myStorage.userPreferences.getLightMode();
        const newMode: tLightMode = currentMode === "dark" ? "light" : "dark";

        //Modifica visualmente o tema e salva nas preferencias de usuário
        document.documentElement.setAttribute(ATTRIBUTE_THEME, newMode);
        myStorage.userPreferences.setLightMode(newMode);
        setLightMode(newMode);
    }, []);

    return (
        <SystemContext.Provider value={{ lightMode, toggleLightMode, alerts, showAlert }}>
            <div className="z-2">
                <Alert />
            </div>
            <div className="z-1">{props.children}</div>
        </SystemContext.Provider>
    );
}
