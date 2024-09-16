import { ReactNode } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import "./styles.css";
import { Placeholder, Stack } from "react-bootstrap";

export interface LayoutPlayingPlayerProps extends ReactPlayerProps {
    children?: ReactNode;
    loadingRecord?: boolean;
    loadingInfo?: boolean;
}

export default function LayoutPlayingPlayer({
    children,
    loadingRecord,
    loadingInfo,
    ...rest
}: LayoutPlayingPlayerProps) {
    return (
        <Stack className="d-flex w-100">
            <div className="my-layout-playing-player d-flex position-relative">
                {loadingRecord && (
                    <Placeholder className="my-layout-playing-player-placeholder opacity-50 position-absolute top-0 start-0" animation="glow">
                        <Placeholder className="w-100 h-100" />
                    </Placeholder>
                )}
                <ReactPlayer
                    controls
                    playing
                    className="react-player"
                    url="https://www.youtube.com/watch?v=IogPHjiS_HU"
                    width="100%"
                    height="100%"
                    {...rest}
                />
            </div>
            <Stack className="d-flex w-100 mt-2 overflow-hidden">
                {loadingInfo ? (
                    <Placeholder as="h5" sm="8" className="opacity-50" animation="glow">
                        <Placeholder className="w-100 h-100 rounded-4" />
                    </Placeholder>
                ) : (
                    children
                )}
            </Stack>
        </Stack>
    );
}
