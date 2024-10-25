import { ReactNode, useCallback, useContext } from "react";
import { Stack } from "react-bootstrap";
import { IconButton, TextLink } from "../../components";
import api from "../../services/api";
import { routes } from "../../router";
import { SystemContext } from "../../contexts/SystemContext";
import "./styles.css";
import utils from "../../utils";

export interface LoggedLayoutProps {
    children?: ReactNode;
}

export default function LoggedLayout(props: LoggedLayoutProps) {
    //CONTEXTS
    const { toggleLightMode, lightMode, showAlert } = useContext(SystemContext);

    //EVENTS
    const handleOnClickLoggout = useCallback(async () => {
        try {
            await api.logout();
        } catch (err) {
            showAlert(utils.getMessageError(err));
        }
    }, [showAlert]);

    return (
        <Stack className="my-logged-layout-root d-flex overflow-hidden user-select-none">
            <div className="my-logged-layout-header bg-primary d-flex w-100">
                <div className="my-logged-layout-header-left d-flex gap-2 align-items-center h-100 ps-2">
                    <h5 className="mb-0 fw-bold text-dark">Ferramenta de Captura LSIIM</h5>
                </div>
                <div className="my-logged-layout-header-right d-flex p-1 justify-content-end gap-1">
                    <IconButton
                        onClick={toggleLightMode}
                        className="rounded-circle text-dark"
                        bootstrapIconName={lightMode === "light" ? "sun-fill" : "moon-fill"}
                        size="lg"
                        title="Light Mode"
                    />
                    <IconButton
                        onClickAsync={handleOnClickLoggout}
                        bootstrapIconName="arrow-right-square-fill"
                        size="lg"
                        className="rounded-circle text-dark"
                        title="Sair"
                    />
                </div>
            </div>
            <Stack className="my-logged-layout-body bg-body d-flex w-100 position-relative">
                <div className="my-logged-layout-body-links bg-primary-light d-flex w-100 gap-2 ps-2 pe-2 align-items-center border-bottom">
                    <TextLink to={routes.listBabys}>Bebês</TextLink>
                    <TextLink to={routes.listRecords}>Gravações</TextLink>
                </div>
                <div className="my-logged-layout-body-content bg-body d-flex w-100">{props.children}</div>
            </Stack>
        </Stack>
    );
}
