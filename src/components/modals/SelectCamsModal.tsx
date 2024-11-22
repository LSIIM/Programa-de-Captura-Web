import { Button, Col, Modal, ModalProps, Row, Stack } from "react-bootstrap";
import { useCallback, useContext, useState } from "react";
import { tStreamLabel } from "../../layouts/recording/LayoutRecordingBody";
import { SystemContext } from "../../contexts/SystemContext";
import { tProject, tProjectVideoType } from "../../interfaces";
import "./styles.css";

export interface SelectCamsModalProps extends ModalProps {
    project: tProject;
    videoStreams: MediaStream[];
    onConfirm: (streams: tStreamLabel[]) => void;
}

export default function SelectCamsModal({
    videoStreams,
    onHide,
    show,
    onConfirm,
    project,
    ...rest
}: SelectCamsModalProps) {
    //CONTEXTS
    const { showAlert } = useContext(SystemContext);

    //STATES
    const [streamsSelected, setStreamsSelected] = useState<
        { stream: MediaStream; projectVideoType: tProjectVideoType }[]
    >([]);

    //VARIABLES
    const projectVideoTypeToSelect = project.projectsVideoTypes[streamsSelected.length];

    //EVENTS
    const handleOnClickStream = useCallback(
        (streamSelected?: MediaStream) => {
            if (!streamSelected || !projectVideoTypeToSelect) return;
            setStreamsSelected((current) => {
                if (current.some(({ stream }) => stream.id === streamSelected.id))
                    return current.filter(({ stream }) => stream.id !== streamSelected.id);
                return [...current, { stream: streamSelected, projectVideoType: projectVideoTypeToSelect }];
            });
        },
        [projectVideoTypeToSelect]
    );

    const handleOnHide = useCallback(() => {
        setStreamsSelected([]);
        if (onHide) onHide();
    }, [onHide]);

    const handleOnConfirm = useCallback(() => {
        const streamsToSelect = project.projectsVideoTypes.length;
        if (streamsSelected.length !== streamsToSelect)
            return showAlert(`Você deve escolher ${streamsToSelect} câmeras.`);

        onConfirm(streamsSelected.map((streamSelected) => streamSelected));
        setStreamsSelected([]);
    }, [onConfirm, streamsSelected, showAlert, project]);

    return (
        <>
            <Modal show={show} {...rest} onHide={handleOnHide} centered size="xl">
                <Modal.Header closeButton>
                    <h5 className="m-0">Selecione as câmeras</h5>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm="12">
                            {projectVideoTypeToSelect ? (
                                <>
                                    <h6 className="mb-3">
                                        Selecione a camêra{" "}
                                        <span className={"p-1 rounded bg-dark"}>
                                            {projectVideoTypeToSelect.typeName}
                                        </span>
                                    </h6>
                                    <div className="lh-1 rounded bg-light p-2 border border-info w-auto mb-3">
                                        Informação da câmera (Isto é estático não está vindo)
                                    </div>
                                </>
                            ) : (
                                <h6 className="mb-3">Confirme as camêras selecionadas.</h6>
                            )}
                        </Col>
                        {videoStreams.map((videoStream, index) => {
                            const typeName = streamsSelected.find(({ stream }) => stream.id === videoStream.id)
                                ?.projectVideoType.typeName;

                            return (
                                <Col key={videoStream.id} className="mb-3">
                                    <Stack
                                        onClick={() => handleOnClickStream(videoStream)}
                                        className="d-flex w-100 align-items-center "
                                    >
                                        <div className={`my-wrapper-video rounded-4 bg-secondary position-relative`}>
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
                                                {typeName && (
                                                    <span className="fs-4 bg-black text-white rounded-3 ps-2 pe-2 shadow bg-opacity-75">
                                                        {typeName}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {videoStream.getVideoTracks()[0]?.label}
                                    </Stack>
                                </Col>
                            );
                        })}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
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
