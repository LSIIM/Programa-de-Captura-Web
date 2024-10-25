import { Placeholder, Stack } from "react-bootstrap";
import { ReactNode } from "react";
import "./styles.css";

export interface LayoutPlayingPlaylistProps {
    children?: ReactNode;
    isLoading?: boolean;
    title?: string;
    subtitle?: string;
}

export default function LayoutPlayingPlaylist(props: LayoutPlayingPlaylistProps) {
    return (
        <Stack className="my-layout-playing-playlist d-flex gap-3 rounded-4 border bg-body">
            {props.isLoading ? (
                <Placeholder animation="glow" className="h-100 w-100 opacity-50">
                    <Placeholder className="w-100 h-100 rounded-4" />
                </Placeholder>
            ) : (
                <Stack className="w-100 d-flex h-100">
                    <Stack className="d-flex w-100 p-3 bg-secondary">
                        <h5 className="mb-0">{props.title}</h5>
                        <small>{props.subtitle}</small>
                    </Stack>
                    <Stack className="my-layout-playing-playlist-body d-flex h-100 w-100">
                        {props.children}
                    </Stack>
                </Stack>
            )}
        </Stack>
    );
}
