import { Stack } from "react-bootstrap";
import { ReactNode } from "react";
import "./styles.css";

export interface LayoutGridListRootProps {
    children?: ReactNode;
}

export default function LayoutGridListRoot(props: LayoutGridListRootProps) {
    return (
        <div className="my-layout-grid-list-root d-flex w-100 justify-content-center">
            <Stack className="my-max-width w-100 d-flex h-auto">{props.children}</Stack>
        </div>
    );
}
