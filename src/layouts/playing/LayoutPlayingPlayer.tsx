import { ReactNode } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { Placeholder, Stack } from "react-bootstrap";
import "./styles.css";
import { tVideo } from "../../interfaces";

export interface LayoutPlayingPlayerProps extends ReactPlayerProps {
    children?: ReactNode;
    loadingVideo?: boolean;
    loadingInfo?: boolean;
    video?: tVideo;
}

export default function LayoutPlayingPlayer({
    children,
    loadingVideo,
    loadingInfo,
    video,
    ...rest
}: LayoutPlayingPlayerProps) {
    return (
        <Stack className="d-flex w-100">
            <div className="my-layout-playing-player d-flex position-relative">
                {(loadingVideo || !video) && (
                    <Placeholder
                        className="my-layout-playing-player-placeholder opacity-50 position-absolute top-0 start-0"
                        animation="glow"
                    >
                        <Placeholder className="w-100 h-100" />
                    </Placeholder>
                )}
                <ReactPlayer
                    controls
                    playing
                    className="react-player"
                    url={video?.url}
                    width="100%"
                    height="100%"
                    {...rest}
                />
            </div>
            <Stack className="my-layout-playing-player-info d-flex mt-2 overflow-hidden">
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
