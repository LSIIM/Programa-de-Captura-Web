import { Button, Col, Container, Form, FormGroup, FormSelect, Row } from "react-bootstrap";
import { v4 } from "uuid";
import { useBaby, useProject } from "../hooks";
import { useCallback, useEffect, useState } from "react";
import { tBaby, tProject } from "../interfaces";
import { MovimentsButtons, SelectCamsModal } from "../components";

export default function CreateRecord() {
    //HOOKS
    const { readBabys, cancelProcess: cancelBabyProcess } = useBaby();
    const { readProjects, cancelProcess: cancelProjectProcess } = useProject();

    //STATES
    const [babys, setBabys] = useState<tBaby[]>([]);
    const [projects, setProjects] = useState<tProject[]>([]);

    const [videoStreams, setVideoStreams] = useState<MediaStream[]>([]);
    const [hasRecordPermission, setHasRecordPermission] = useState(false);

    const [camsSelected, setCamsSelected] = useState<string[]>([]);
    const [showSelectCamsModal, setShowSelectCamsModal] = useState(false);

    //EVENTS
    const removeStreams = useCallback(() => {
        videoStreams.forEach((stream) => {
            stream.getTracks().forEach((track) => {
                track.stop();
                stream?.removeTrack(track);
            });
        });
    }, [videoStreams]);

    const askForPermition = useCallback(async () => {
        try {
            const userMedia = await navigator.mediaDevices.getUserMedia({ video: true });
            userMedia.getVideoTracks().map((track) => track.stop());
            setHasRecordPermission(true);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        readBabys()
            .then((babys) => setBabys(babys))
            .catch((err) => console.error(err));

        readProjects()
            .then((projects) => setProjects(projects))
            .catch((err) => console.error(err));

        askForPermition();

        return () => {
            cancelBabyProcess();
            cancelProjectProcess();
            removeStreams();
        };
    }, [cancelBabyProcess, readBabys, readProjects, cancelProjectProcess, removeStreams, askForPermition]);

    const findStreams = useCallback(async () => {
        if (!hasRecordPermission) return alert("Você deve permitir o acesso às câmeras.");

        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((device) => device.kind === "videoinput");
            const streams = await Promise.all(
                videoDevices.map(({ deviceId }) => navigator.mediaDevices.getUserMedia({ video: { deviceId } }))
            );
            setVideoStreams(streams);
        } catch (err) {
            alert("Aconteceu um erro ao buscar suas câmeras.");
        }
    }, [hasRecordPermission]);

    const handleOnClickSelectCams = useCallback(() => {
        findStreams().then(() => setShowSelectCamsModal(true));
    }, [findStreams]);

    const handleOnHideSelectCamsModal = useCallback(() => {
        removeStreams();
        setShowSelectCamsModal(false);
    }, [removeStreams]);

    return (
        <Container fluid className="h-100 pt-3">
            <Row>
                <FormGroup sm="6" md="4" lg="3" xl="2" as={Col} controlId={v4()} className="mb-2">
                    <Form.Label>Bebê</Form.Label>
                    <FormSelect className="rounded-pill">
                        <option value="">--- Selecionar bebê ---</option>
                        {babys.map((baby) => (
                            <option key={baby.id_baby} value={baby.id_baby}>
                                {baby.name}
                            </option>
                        ))}
                    </FormSelect>
                </FormGroup>

                <FormGroup as={Col} sm="6" md="4" lg="3" xl="2" controlId={v4()} className="mb-2">
                    <Form.Label>Projeto</Form.Label>
                    <FormSelect className="rounded-pill">
                        <option value="">--- Selecionar projeto ---</option>
                        {projects.map((project) => (
                            <option key={project.id_proj} value={project.id_proj}>
                                {project.name_proj}
                            </option>
                        ))}
                    </FormSelect>
                </FormGroup>

                <Col className="d-flex align-items-end mb-2">
                    <Button className="rounded-pill" onClick={handleOnClickSelectCams}>
                        <i className="bi bi-camera-fill me-2" />
                        Escolher câmeras
                    </Button>
                </Col>

                <Col sm="12" className="border-top mt-2 pt-2">
                    <MovimentsButtons numberOfMoviments={4} />
                </Col>
            </Row>

            <SelectCamsModal
                show={showSelectCamsModal}
                onHide={handleOnHideSelectCamsModal}
                videoStreams={videoStreams}
            />
        </Container>
    );
}
