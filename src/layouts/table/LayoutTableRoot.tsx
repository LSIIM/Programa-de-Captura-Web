import { Stack } from "react-bootstrap";
import { ReactNode } from "react";
import "./styles.css";

export interface LayoutTableRootProps {
    children?: ReactNode;
}

export default function LayoutTableRoot(props: LayoutTableRootProps) {
    return <Stack className="my-layout-table-root d-flex w-100">{props.children}</Stack>;
}