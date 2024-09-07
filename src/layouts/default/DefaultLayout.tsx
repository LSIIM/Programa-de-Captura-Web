import { ReactNode } from "react";
import "./styles.css";
import { Stack } from "react-bootstrap";

export interface DefaultLayoutProps {
    children?: ReactNode;
}

export default function DefaultLayout(props: DefaultLayoutProps) {
    return (
        <Stack className="my-default-layout-root d-flex">
            <div className="my-default-layout-header d-flex w-100"></div>
            {props.children}
        </Stack>
    );
}
