import { ListGroup, Stack } from "react-bootstrap";
import { tRecording, tVideo } from "../../../interfaces";
import { useCallback } from "react";
import MenuButton from "../../buttons/menuButton/MenuButton";
import { routes } from "../../../router";
import "./styles.css";

export interface CardRecordingProps {
    recording: tRecording;
    video?: tVideo;
}

export default function CardRecording({ recording, video }: CardRecordingProps) {
    //EVENTS
    const handleOnClickPlay = useCallback(() => {
        window.location.href = routes.playingRecord.replace(":id", recording.id.toString());
    }, [recording]);

    const handleOnClickPlayProcessedVideo = useCallback(() => {
        window.location.href = routes.playingRecord.replace(":id", recording.id.toString());
    }, [recording]);

    const handleOnClickProcess = useCallback(() => {}, []);

    return (
        <>
            <Stack className="my-card-record rounded-4 d-flex gap-2 w-100">
                <video
                    role="button"
                    onClick={handleOnClickPlay}
                    muted
                    playsInline
                    controls={false}
                    className="my-card-record-thumbnail rounded-4"
                    preload="metadata"
                >
                    <source src={video?.url} type="video/mp4" />
                </video>
                <Stack className="d-flex ps-2 pe-2 w-100">
                    <div className="my-card-record-div-baby-name d-flex w-100 align-items-center">
                        <span className="fw-bold text-truncate w-100">{recording.babyInfo.name}</span>
                        <MenuButton className="rounded-circle" bootstrapIconName="three-dots-vertical">
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
            </Stack>
        </>
    );
}
