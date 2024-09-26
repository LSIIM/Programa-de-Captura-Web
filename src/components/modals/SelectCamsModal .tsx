import { useCallback, useEffect, useState } from "react";
import { Button, Col, Modal, ModalProps, Row, Stack } from "react-bootstrap";
import "./styles.css";

let myStream: MediaStream | undefined;
export interface SelectCamsModalProps extends ModalProps {}

export default function SelectCamsModal({ onHide, show, ...rest }: SelectCamsModalProps) {
    //STATES
    const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
    const [videoStreams, setVideoStreams] = useState<MediaStream[]>([]);

    //VARIABLES
    const accessPermition = useCallback(async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((device) => device.kind === "videoinput");
            setCameras(videoDevices);

            const streams = await Promise.all(
                videoDevices.map((device) =>
                    navigator.mediaDevices.getUserMedia({ video: { deviceId: device.deviceId } })
                )
            );
            setVideoStreams(streams);
        } catch (err) {
            console.error(err);
        }
    }, []);

    //EVENTS
    useEffect(() => {
        if (show && videoStreams.length < 1) accessPermition();
        if (!show && videoStreams.length > 0) {
            videoStreams.forEach((stream) => {
                stream.getTracks().forEach((track) => {
                    track.stop();
                    myStream?.removeTrack(track);
                });
            });
            setVideoStreams([]);
        }
    }, [show, videoStreams, accessPermition]);

    return (
        <>
            <Modal show={show} {...rest} onHide={onHide} centered size="xl">
                <Modal.Header closeButton>
                    <h5 className="m-0">Selecione as câmeras</h5>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {cameras.map((camera, index) => (
                            <Col key={camera.deviceId}>
                                <Stack>
                                    <video
                                        autoPlay
                                        playsInline
                                        ref={(video) => {
                                            if (video) {
                                                video.srcObject = videoStreams[index];
                                            }
                                        }}
                                        className="my-select-cams-modal-video rounded-4 bg-secondary"
                                    />
                                    {camera.label}
                                </Stack>
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
                <Modal.Footer className="user-select-none">
                    <Button onClick={onHide} variant="outline-secondary" className="rounded-pill">
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
