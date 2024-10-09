import { Button, Col, Modal, ModalProps, Row, Stack } from "react-bootstrap";
import { useCallback, useState } from "react";
import "./styles.css";
import { tStreamLabel } from "../../layouts/recording/LayoutRecordingBody";

export interface SelectCamsPSModalProps extends ModalProps {
    videoStreams: MediaStream[];
    onConfirm: (streams: tStreamLabel[]) => void;
}

export default function SelectCamsPSModal({ videoStreams, onHide, show, onConfirm, ...rest }: SelectCamsPSModalProps) {
    //STATES
    const [camsSelected, setCamsSelected] = useState<string[]>([]);

    //EVENTS
    const handleOnClickCam = useCallback((deviceId?: string) => {
        if (!deviceId) return;
        setCamsSelected((current) => {
            if (current.includes(deviceId)) return current.filter((id) => id !== deviceId);
            return [...current, deviceId];
        });
    }, []);

    const handleOnHide = useCallback(() => {
        setCamsSelected([]);
        if (onHide) onHide();
    }, [onHide]);

    const handleOnConfirm = useCallback(() => {
        if (camsSelected.length !== 2) return alert("Você deve escolher duas câmeras (Primária e Secundária).");

        const streams = camsSelected.map((camSelected) => videoStreams.find(({ id }) => id === camSelected));
        if (streams.some((stream) => stream === undefined)) return alert("Algo deu errado!");

        setCamsSelected([]);
        onConfirm(
            streams.map((stream, index) => ({
                stream: stream as MediaStream,
                label: index === 0 ? "Primária" : "Secundária",
            }))
        );
    }, [onConfirm, camsSelected, videoStreams]);

    return (
        <>
            <Modal show={show} {...rest} onHide={handleOnHide} centered size="xl">
                <Modal.Header closeButton>
                    <h5 className="m-0">Selecione as câmeras</h5>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm="12">
                            {camsSelected.length === 0 ? (
                                <h6 className="mb-3">
                                    Selecione a camêra <span className={"p-1 rounded bg-primary"}>Primária</span>
                                </h6>
                            ) : camsSelected.length === 1 ? (
                                <h6 className="mb-3">
                                    Selecione a camêra <span className={"p-1 rounded bg-secondary"}>Secundária</span>
                                </h6>
                            ) : (
                                <h6 className="mb-3">Confirme as camêras selecionadas.</h6>
                            )}
                        </Col>
                        {videoStreams.map((videoStream, index) => {
                            const className =
                                camsSelected[0] === videoStream.id
                                    ? "border-primary border-5 border"
                                    : camsSelected[1] === videoStream.id
                                    ? "border-secondary border-5 border"
                                    : "";

                            return (
                                <Col key={videoStream.id} className="mb-3">
                                    <Stack
                                        onClick={() => handleOnClickCam(videoStream.id)}
                                        className="d-flex w-100 align-items-center "
                                    >
                                        <div
                                            className={`my-wrapper-video ${className} rounded-4 bg-secondary position-relative`}
                                        >
                                            <video
                                                className="w-100 h-100"
                                                autoPlay
                                                playsInline
                                                ref={(video) => {
                                                    if (video) {
                                                        video.srcObject = videoStreams[index];
                                                    }
                                                }}
                                            />
                                            <div className="position-absolute top-0 start-0 ms-2 mt-1 text-center">
                                                {camsSelected[0] === videoStream.id ? (
                                                    <span className="fs-4 bg-primary rounded-3 ps-2 pe-2 shadow">
                                                        Primária
                                                    </span>
                                                ) : camsSelected[1] === videoStream.id ? (
                                                    <span className="fs-4 bg-secondary rounded-3 ps-2 pe-2 shadow">
                                                        Secundária
                                                    </span>
                                                ) : undefined}
                                            </div>
                                        </div>

                                        {videoStream.getVideoTracks()[0]?.label}
                                    </Stack>
                                </Col>
                            );
                        })}
                    </Row>
                </Modal.Body>
                <Modal.Footer className="user-select-none">
                    <Button onClick={handleOnHide} variant="outline-secondary" className="rounded-pill">
                        Fechar
                    </Button>
                    <Button onClick={handleOnConfirm} variant="primary" className="rounded-pill">
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
