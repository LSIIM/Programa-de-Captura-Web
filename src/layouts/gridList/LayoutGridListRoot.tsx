import { Stack } from "react-bootstrap";
import { ReactNode } from "react";
import "./styles.css";

export interface LayoutGridListRootProps {
    children?: ReactNode;
}

export default function LayoutGridListRoot(props: LayoutGridListRootProps) {
    return <Stack className="my-layout-grid-list-root d-flex w-100">{props.children}</Stack>;
}
