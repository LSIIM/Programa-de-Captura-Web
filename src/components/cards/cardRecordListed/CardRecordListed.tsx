import { ListGroup, Stack } from "react-bootstrap";
import { tRecording, tVideo } from "../../../interfaces";
import { useCallback, useContext, useState } from "react";
import MenuButton from "../../buttons/menuButton/MenuButton";
import { routes } from "../../../router";
import { v4 } from "uuid";
import "./styles.css";
import { SystemContext } from "../../../contexts/SystemContext";

export interface CardRecordListedProps {
    recording: tRecording;
    isPlaying?: boolean;
    video?: tVideo;
    onPlaySpecificVideo?: (video: tVideo) => void;
}

export default function CardRecordListed({ recording, isPlaying, video, onPlaySpecificVideo }: CardRecordListedProps) {
    //CONTEXTS
    const { showAlert } = useContext(SystemContext);

    //STATES
    const [MENU_BUTTON_ID] = useState(v4());

    //EVENTS
    const handleOnClickPlay = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!video) return showAlert("O vídeo não foi encontrado!");
            if (onPlaySpecificVideo) return onPlaySpecificVideo(video);

            const menuButton = document.getElementById(MENU_BUTTON_ID);
            if (!menuButton || menuButton.contains(e.target as Node)) return;

            window.location.href = routes.playingRecord.replace(":id", recording.id.toString());
        },
        [recording, MENU_BUTTON_ID, onPlaySpecificVideo, video, showAlert]
    );

    const handleOnClickPlayProcessedVideo = useCallback(() => {
        window.location.href = routes.playingRecord.replace(":id", recording.id.toString());
    }, [recording]);

    const handleOnClickProcess = useCallback(() => {}, []);

    return (
        <>
            <div
                onClick={handleOnClickPlay}
                role="button"
                className={`my-card-record-listed position-relative d-flex gap-2 w-100 ${isPlaying ? "bg-body" : ""}`}
            >
                {isPlaying && (
                    <div className="d-flex position-absolute align-items-center h-100 start-0 top-0 ms-1">
                        <i className="bi bi-play-fill " />
                    </div>
                )}
                <video
                    role="button"
                    muted
                    playsInline
                    controls={false}
                    className="my-card-record-listed-thumbnail rounded-4"
                    preload="metadata"
                >
                    <source src={video?.url} type="video/mp4" />
                </video>
                <Stack className="my-card-record-listed-info d-flex">
                    <div className=" d-flex w-100 align-items-center">
                        <span className="fw-bold text-truncate w-100">{recording.babyInfo.name}</span>
                        <MenuButton
                            className="rounded-circle"
                            bootstrapIconName="three-dots-vertical"
                            id={MENU_BUTTON_ID}
                        >
                            <ListGroup className="small my-menu-list">
                                <ListGroup.Item onClick={handleOnClickPlay}>
                                    <i className="bi bi-play-circle" />
                                    Reproduzir
                                </ListGroup.Item>
                                <ListGroup.Item onClick={handleOnClickPlayProcessedVideo}>
                                    <i className="bi bi-play-circle-fill" />
                                    Reproduzir processado
                                </ListGroup.Item>
                                <ListGroup.Item onClick={handleOnClickProcess}>
                                    <i className="bi bi-sliders" />
                                    Processar
                                </ListGroup.Item>
                            </ListGroup>
                        </MenuButton>
                    </div>
                    <small className="text-truncate text-capitalize">{recording.project.projectName}</small>
                    <small className="text-truncate text-capitalize">
                        {recording.moveInfo?.description ?? "<Nenhum Movimento>"}
                    </small>
                </Stack>
            </div>
        </>
    );
}
