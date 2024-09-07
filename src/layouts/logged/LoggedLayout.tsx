import { ReactNode, useCallback, useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { IconButton, LinkButton } from "../../components";
import myStorage, { tLightMode } from "../../services/localstorage";
import { routes } from "../../router";
import "./styles.css";

const ATTRIBUTE_THEME = "data-bs-theme";

export interface LoggedLayoutProps {
    children?: ReactNode;
}

export default function LoggedLayout(props: LoggedLayoutProps) {
    //STATES
    const [lightMode, setLightMode] = useState<tLightMode>();

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

    const handleOnToggleLightMode = useCallback(() => {
        const currentMode = myStorage.userPreferences.getLightMode();
        const newMode: tLightMode = currentMode === "dark" ? "light" : "dark";

        //Modifica visualmente o tema e salva nas preferencias de usuário
        document.documentElement.setAttribute(ATTRIBUTE_THEME, newMode);
        myStorage.userPreferences.setLightMode(newMode);
        setLightMode(newMode);
    }, []);

    return (
        <Stack className="my-logged-layout-root d-flex overflow-hidden">
            <div className="my-logged-layout-header d-flex w-100">
                <div className="my-logged-layout-header-left d-flex gap-2 align-items-center h-100 ps-2">
                    <LinkButton to={routes.listBabys}>Bebês</LinkButton>
                    <LinkButton to={routes.listRecords}>Gravações</LinkButton>
                </div>
                <div className="my-logged-layout-header-right d-flex p-1 justify-content-end">
                    <IconButton
                        onClick={handleOnToggleLightMode}
                        className="d-flex h-100 align-items-center justify-content-center rounded-circle w-100 text-dark-emphasis"
                        bootstrapIconName={lightMode === "light" ? "sun-fill" : "moon-fill"}
                        size="lg"
                    />
                </div>
            </div>
            <div className="my-logged-layout-body d-flex w-100">{props.children}</div>
        </Stack>
    );
}
