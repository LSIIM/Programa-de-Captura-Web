import { ReactNode } from "react";
import "./styles.css";
import { Stack } from "react-bootstrap";

export interface DefaultLayoutProps {
    children?: ReactNode;
}

export default function DefaultLayout(props: DefaultLayoutProps) {
    return (
        <Stack className="my-default-layout-root d-flex user-select-none">
            <div className="my-default-layout-header d-flex w-100 align-items-center justify-content-center bg-primary">
                <h5 className="fw-bold m-0 text-dark">Ferramenta de Captura LSIIM</h5>
            </div>
            <div className="my-default-layout-body d-flex w-100 bg-body">{props.children}</div>
        </Stack>
    );
}
