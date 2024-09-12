import { Stack } from "react-bootstrap";
import { ReactNode } from "react";
import "./styles.css";

export interface LayoutPlayingPlayerContainerProps {
    children?: ReactNode;
}

export default function LayoutPlayingPlayerContainer(props: LayoutPlayingPlayerContainerProps) {
    return <Stack className="my-layout-playing-player-container d-flex">{props.children}</Stack>;
}
