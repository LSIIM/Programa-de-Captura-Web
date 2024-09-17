import { ListGroup, Stack } from "react-bootstrap";
import { tRecording } from "../../../interfaces";
import { useCallback } from "react";
import MenuButton from "../../buttons/menuButton/MenuButton";
import { routes } from "../../../router";
import "./styles.css";

export interface CardRecordProps {
    record: tRecording;
}

export default function CardRecord({ record }: CardRecordProps) {
    //EVENTS
    const handleOnClickPlay = useCallback(() => {
        window.location.href = routes.playingRecord.replace(":id", record.id_recording.toString());
    }, [record]);

    const handleOnClickPlayProcessedVideo = useCallback(() => {
        window.location.href = routes.playingRecord.replace(":id", record.id_recording.toString());
    }, [record]);

    const handleOnClickProcess = useCallback(() => {}, []);

    return (
        <>
            <Stack className="my-card-record rounded-4 d-flex gap-2 w-100">
                <img
                    role="button"
                    onClick={handleOnClickPlay}
                    className="my-card-record-thumbnail rounded-4"
                    alt="thumbnail"
                    src="https://img.freepik.com/fotos-gratis/uma-pintura-digital-de-uma-montanha-com-uma-arvore-colorida-em-primeiro-plano_1340-25699.jpg"
                />
                <Stack className="d-flex ps-2 pe-2 w-100">
                    <div className="my-card-record-div-baby-name d-flex w-100 align-items-center">
                        <span className="fw-bold text-truncate w-100">Nome do bebê</span>
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
                    <small className="text-truncate">Nome do projeto</small>
                    <small className="text-truncate">Movimento X</small>
                </Stack>
            </Stack>
        </>
    );
}
