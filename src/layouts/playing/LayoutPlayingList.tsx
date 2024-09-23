import { Stack } from "react-bootstrap";
import { ReactNode } from "react";
import "./styles.css";

export interface LayoutPlayingListProps {
    children?: ReactNode;
}

export default function LayoutPlayingList(props: LayoutPlayingListProps) {
    return <Stack className="my-layout-playing-list d-flex w-100 gap-3 pb-5">{props.children}</Stack>;
}
