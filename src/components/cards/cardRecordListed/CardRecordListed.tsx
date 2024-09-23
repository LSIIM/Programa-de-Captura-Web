import { ListGroup, Stack } from "react-bootstrap";
import { tRecording } from "../../../interfaces";
import { useCallback, useState } from "react";
import MenuButton from "../../buttons/menuButton/MenuButton";
import { routes } from "../../../router";
import "./styles.css";
import { v4 } from "uuid";

export interface CardRecordListedProps {
    record: tRecording;
    isPlaying?: boolean;
}

export default function CardRecordListed({ record, isPlaying }: CardRecordListedProps) {
    //STATES
    const [MENU_BUTTON_ID] = useState(v4());

    //EVENTS
    const handleOnClickPlay = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const menuButton = document.getElementById(MENU_BUTTON_ID);
            if (!menuButton || menuButton.contains(e.target as Node)) return;

            window.location.href = routes.playingRecord.replace(":id", record.id_recording.toString());
        },
        [record, MENU_BUTTON_ID]
    );

    const handleOnClickPlayProcessedVideo = useCallback(() => {
        window.location.href = routes.playingRecord.replace(":id", record.id_recording.toString());
    }, [record]);

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
                <img
                    className="my-card-record-listed-thumbnail rounded-4"
                    alt="thumbnail"
                    src="https://img.freepik.com/fotos-gratis/uma-pintura-digital-de-uma-montanha-com-uma-arvore-colorida-em-primeiro-plano_1340-25699.jpg"
                />
                <Stack className="my-card-record-listed-info d-flex">
                    <div className=" d-flex w-100 align-items-center">
                        <span className="fw-bold text-truncate w-100">Nome do bebê</span>
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
                    <small className="text-truncate">Nome do projeto</small>
                    <small className="text-truncate">Movimento X</small>
                </Stack>
            </div>
        </>
    );
}
