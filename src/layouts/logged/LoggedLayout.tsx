import { ReactNode, useCallback, useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { IconButton, LinkButton } from "../../components";
import myStorage, { tLightMode } from "../../services/localstorage";
import "./styles.css";
import api from "../../services/api";
import { routes } from "../../router";

const ATTRIBUTE_THEME = "data-bs-theme";

export interface LoggedLayoutProps {
    children?: ReactNode;
}

export default function LoggedLayout(props: LoggedLayoutProps) {
    //STATES
    const [lightMode, setLightMode] = useState<tLightMode>("light");

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

    const handleOnClickLoggout = useCallback(async () => {
        try {
            await api.logout();
        } catch (err) {
            //TODO: Mostrar feedback visual
            console.error(err);
        }
    }, []);

    return (
        <Stack className="my-logged-layout-root d-flex overflow-hidden">
            <div className="my-logged-layout-header d-flex w-100">
                <div className="my-logged-layout-header-left d-flex gap-2 align-items-center h-100 ps-2">
                    <h5 className="mb-0 fw-bold text-dark-emphasis">Ferramenta de Captura LSIIM</h5>
                </div>
                <div className="my-logged-layout-header-right d-flex p-1 justify-content-end gap-1">
                    <IconButton
                        onClick={handleOnToggleLightMode}
                        className="rounded-circle text-dark-emphasis"
                        bootstrapIconName={lightMode === "light" ? "sun-fill" : "moon-fill"}
                        size="lg"
                        title="Light Mode"
                    />
                    <IconButton
                        onClickAsync={handleOnClickLoggout}
                        bootstrapIconName="arrow-right-square-fill"
                        size="lg"
                        className="rounded-circle text-dark-emphasis"
                        title="Sair"
                    />
                </div>
            </div>
            <Stack className="my-logged-layout-body d-flex w-100 position-relative">
                <div className="my-logged-layout-body-links d-flex sticky-top w-100 gap-2 ps-2 pe-2 align-items-center border-bottom">
                    <LinkButton to={routes.listBabys}>Bebês</LinkButton>
                    <LinkButton to={routes.listRecords}>Gravações</LinkButton>
                </div>
                <div className="my-logged-layout-body-content d-flex w-100 h-100">{props.children}</div>
            </Stack>
        </Stack>
    );
}
