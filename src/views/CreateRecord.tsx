import { Col, Form, FormGroup, FormSelect } from "react-bootstrap";
import { v4 } from "uuid";
import { useBaby, useProject } from "../hooks";
import { useCallback, useContext, useEffect, useState } from "react";
import { tPatient, tProject } from "../interfaces";
import { LayoutRecording } from "../layouts";
import { SelectCamsModal } from "../components";
import { tStreamLabel } from "../layouts/recording/LayoutRecordingBody";
import { SystemContext } from "../contexts/SystemContext";

export default function CreateRecord() {
    //CONTEXTS
    const { showAlert } = useContext(SystemContext);

    //HOOKS
    const { readBabys, cancelProcess: cancelBabyProcess } = useBaby();
    const { readProjects, cancelProcess: cancelProjectProcess } = useProject();

    //STATES
    const [patients, setPatients] = useState<tPatient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<tPatient | null>(null);

    const [projects, setProjects] = useState<tProject[]>([]);
    const [selectedProject, setSelectedProject] = useState<tProject | null>(null);

    const [streams, setStreams] = useState<MediaStream[]>([]);
    const [selectedStreamsLabel, setSelectedStreamsLabel] = useState<tStreamLabel[]>([]);

    const [showSelectCamsModal, setShowSelectCamsModal] = useState(false);

    //EVENTS
    const stopStreams = useCallback(() => {
        if (streams.length < 1) return;
        streams.forEach((stream) => {
            stream.getTracks().forEach((track) => {
                track.stop();
                stream?.removeTrack(track);
            });
        });
    }, [streams]);

    useEffect(() => {
        readBabys()
            .then((babys) => setPatients(babys))
            .catch((err) => console.error(err));

        readProjects()
            .then((projects) => setProjects(projects))
            .catch((err) => console.error(err));

        return () => {
            cancelBabyProcess();
            cancelProjectProcess();
            stopStreams();
        };
    }, [cancelBabyProcess, readBabys, readProjects, cancelProjectProcess, stopStreams]);

    const handleOnCanFindStreams = useCallback(() => {
        if (selectedProject && selectedPatient) return true;
        showAlert("Antes de escolher as câmeras selecione um bebê e um projeto.");
        return false;
    }, [selectedProject, selectedPatient, showAlert]);

    const handleOnFindStreams = useCallback((streams: MediaStream[]) => {
        setStreams(streams);
        setShowSelectCamsModal(true);
    }, []);

    const handleOnHideSelectCamsModal = useCallback(() => {
        setShowSelectCamsModal(false);
        stopStreams();
    }, [stopStreams]);

    const handleOnChangeSelectBaby = useCallback(
        (_babyId: string) => {
            const babyId = Number(_babyId);
            const selectedBaby = patients.find((baby) => baby.id === babyId);
            setSelectedPatient(selectedBaby ?? null);
        },
        [patients]
    );
    const handleOnChangeSelectProject = useCallback(
        (_projectId: string) => {
            const projectId = Number(_projectId);
            const selectedProject = projects.find((project) => project.id === projectId);
            setSelectedProject(selectedProject ?? null);
            setStreams([]);
            setSelectedStreamsLabel([]);
        },
        [projects]
    );

    return (
        <>
            <LayoutRecording.Root>
                <LayoutRecording.Header>
                    <FormGroup
                        sm="6"
                        md="4"
                        lg="3"
                        xl="2"
                        as={Col}
                        controlId={v4()}
                        className="mb-2"
                        data-test="form-group"
                    >
                        <Form.Label>Paciente</Form.Label>
                        <FormSelect
                            className="rounded-pill"
                            value={selectedPatient?.id ?? ""}
                            onChange={(e) => handleOnChangeSelectBaby(e.target.value)}
                        >
                            <option value="">--- Selecionar paciente ---</option>
                            {patients.map((baby) => (
                                <option key={baby.id} value={baby.id}>
                                    {baby.name}
                                </option>
                            ))}
                        </FormSelect>
                    </FormGroup>

                    <FormGroup
                        as={Col}
                        sm="6"
                        md="4"
                        lg="3"
                        xl="2"
                        controlId={v4()}
                        className="mb-2"
                        data-test="form-group"
                    >
                        <Form.Label>Projeto</Form.Label>
                        <FormSelect
                            className="rounded-pill"
                            value={selectedProject?.id ?? ""}
                            onChange={(e) => handleOnChangeSelectProject(e.target.value)}
                        >
                            <option value="">--- Selecionar projeto ---</option>
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.projectName}
                                </option>
                            ))}
                        </FormSelect>
                    </FormGroup>
                    <LayoutRecording.ButtonCams
                        onCanFindStreams={handleOnCanFindStreams}
                        onFindStreams={handleOnFindStreams}
                    />
                </LayoutRecording.Header>
                {selectedProject && selectedPatient && (
                    <LayoutRecording.Body
                        patient={selectedPatient}
                        project={selectedProject}
                        streamsLabel={selectedStreamsLabel}
                        moviments={selectedProject?.movesInfo ?? []}
                    />
                )}
            </LayoutRecording.Root>

            {selectedProject && (
                <SelectCamsModal
                    project={selectedProject}
                    show={showSelectCamsModal}
                    onHide={handleOnHideSelectCamsModal}
                    videoStreams={streams}
                    onConfirm={(selected) => {
                        setSelectedStreamsLabel(selected);
                        setShowSelectCamsModal(false);
                    }}
                />
            )}
        </>
    );
}
