import { Button, Col, Modal, ModalProps, Row, Stack } from "react-bootstrap";
import { useCallback, useState } from "react";
import "./styles.css";

export interface SelectCamsModalProps extends ModalProps {
    videoStreams: MediaStream[];
}

const PRIMARY_CONFIG = { text: "primária", bgColor: "bg-primary", className: "primary" };
const SECONDARY_CONFIG = { text: "secundária", bgColor: "bg-secondary", className: "secondary" };
const DEFAULT_CONFIG = { text: "", bgColor: "", className: "" };

export default function SelectCamsModal({ videoStreams, onHide, show, ...rest }: SelectCamsModalProps) {
    //STATES
    const [camsSelected, setCamsSelected] = useState<string[]>([]);

    //VARIABLES
    const configs = useCallback(() => {
        switch (camsSelected.length) {
            case 0:
                return PRIMARY_CONFIG;
            case 1:
                return SECONDARY_CONFIG;
            default:
                return DEFAULT_CONFIG;
        }
    }, [camsSelected]);

    const configCurrentCam = useCallback(
        (deviceId?: string) => {
            switch (true) {
                case deviceId === camsSelected[0]:
                    return PRIMARY_CONFIG;
                case deviceId === camsSelected[1]:
                    return SECONDARY_CONFIG;
                default:
                    return { text: "", bgColor: "", className: "" };
            }
        },
        [camsSelected]
    );

    const { text, bgColor } = configs();

    //EVENTS
    const handleOnClickCam = useCallback((deviceId?: string) => {
        if (!deviceId) return;
        setCamsSelected((current) => {
            if (current.includes(deviceId)) return current.filter((id) => id !== deviceId);
            return [...current, deviceId];
        });
    }, []);

    return (
        <>
            <Modal show={show} {...rest} onHide={onHide} centered size="xl">
                <Modal.Header closeButton>
                    <h5 className="m-0">Selecione as câmeras</h5>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm="12" className="mb-4">
                            <h6 className={camsSelected.length > 1 ? "opacity-0" : ""}>
                                Selecionando a câmera <span className={"p-1 rounded " + bgColor}>{text}</span>
                            </h6>
                        </Col>
                        {videoStreams.map((videoStream, index) => {
                            const deviceId = videoStream.getVideoTracks()[0]?.getSettings().deviceId;
                            const { className } = configCurrentCam(deviceId);

                            return (
                                <Col key={videoStream.id} className="mb-3">
                                    <Stack
                                        onClick={() => handleOnClickCam(deviceId)}
                                        className="d-flex w-100 align-items-center "
                                    >
                                        <div
                                            className={`my-wrapper-video ${className} rounded-4 bg-secondary`}
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
                                        </div>

                                        {videoStream.getVideoTracks()[0]?.label}
                                    </Stack>
                                </Col>
                            );
                        })}
                    </Row>
                </Modal.Body>
                <Modal.Footer className="user-select-none">
                    <Button onClick={onHide} variant="outline-secondary" className="rounded-pill">
                        Fechar
                    </Button>
                    <Button onClick={onHide} variant="primary" className="rounded-pill">
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
