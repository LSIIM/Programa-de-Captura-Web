import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, FormSelect, Offcanvas, OffcanvasProps, Spinner, Stack } from "react-bootstrap";
import { v4 } from "uuid";
import useBaby from "../../hooks/useBaby";
import { tBaby, tProject } from "../../interfaces";
import { useProject } from "../../hooks";
import { SystemContext } from "../../contexts/SystemContext";
import utils from "../../utils";

export interface OffcanvasRecordingFilterProps extends OffcanvasProps {
    onApply?: (props: { babyIdSelected: null | number; projectSelected: null | number }) => void;
}

export default function OffcanvasRecordingFilter({ onApply, ...rest }: OffcanvasRecordingFilterProps) {
    //CONTEXTS
    const { showAlert } = useContext(SystemContext);

    //HOOKS
    const {
        errorToRead: errorToReadBabys,
        cancelProcess: cancelBabyProcess,
        readBabys,
        isReading: isReadingBabys,
    } = useBaby();

    const {
        errorToRead: errorToReadProjects,
        cancelProcess: cancelProjectProcess,
        readProjects,
        isReading: isReadingProjects,
    } = useProject();

    //STATES
    const [babys, setBabys] = useState<tBaby[]>([]);
    const [babyIdSelected, setBabyIdSelected] = useState<number | null>(null);

    const [projects, setProjects] = useState<tProject[]>([]);
    const [projectIdSelected, setProjectIdSelected] = useState<number | null>(null);

    //EVENTS
    useEffect(() => {
        //Carregando bebês
        readBabys()
            .then((babys) => setBabys(babys))
            .catch((err) => showAlert(utils.getMessageError(err)));

        //Carregando projetos
        readProjects()
            .then((projects) => setProjects(projects))
            .catch((err) => showAlert(utils.getMessageError(err)));

        return () => {
            cancelBabyProcess();
            cancelProjectProcess();
        };
    }, [readBabys, cancelBabyProcess, readProjects, cancelProjectProcess, showAlert]);

    const handleOnChangeBabyIdSelected = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const possibleBabyId = Number(event.target.value);
        if (event.target.value === "" || isNaN(possibleBabyId)) return setBabyIdSelected(null);
        setBabyIdSelected(possibleBabyId);
    }, []);

    const handleOnChangeProjectIdSelected = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const possibleProjectId = Number(event.target.value);
        if (event.target.value === "" || isNaN(possibleProjectId)) return setProjectIdSelected(null);
        setProjectIdSelected(possibleProjectId);
    }, []);

    const handleOnApply = useCallback(() => {
        if (onApply) onApply({ babyIdSelected, projectSelected: projectIdSelected });
    }, [onApply, babyIdSelected, projectIdSelected]);

    return (
        <Offcanvas {...rest} placement="end">
            <Offcanvas.Header className="border-bottom bg-light">
                <h4 className="mb-0">Filtros de gravações</h4>
            </Offcanvas.Header>
            <Offcanvas.Body className="ps-0 pe-0 pb-0">
                <Stack className="d-flex h-100 gap-2">
                    <Stack className="d-flex h-100 ps-2 pe-2 gap-3">
                        <FormGroup controlId={v4()} className="position-relative">
                            <Form.Label className="d-flex align-items-center">
                                Por bebê {isReadingBabys && <Spinner size="sm" className="ms-2" animation="grow" />}
                            </Form.Label>
                            <FormSelect isInvalid={errorToReadBabys} onChange={handleOnChangeBabyIdSelected}>
                                <option value="">Todos</option>
                                {babys.map((baby) => (
                                    <option value={String(baby.id)} key={baby.id}>
                                        {baby.name}
                                    </option>
                                ))}
                            </FormSelect>
                            <Form.Control.Feedback type="invalid">Erro ao buscar bebês.</Form.Control.Feedback>
                        </FormGroup>
                        <FormGroup controlId={v4()} className="position-relative">
                            <Form.Label className="d-flex align-items-center">
                                Por projeto{" "}
                                {isReadingProjects && <Spinner size="sm" className="ms-2" animation="grow" />}
                            </Form.Label>
                            <FormSelect isInvalid={errorToReadProjects} onChange={handleOnChangeProjectIdSelected}>
                                <option value="">Todos</option>
                                {projects.map((project) => (
                                    <option value={String(project.id)} key={project.id}>
                                        {project.projectName}
                                    </option>
                                ))}
                            </FormSelect>
                            <Form.Control.Feedback type="invalid">Erro ao buscar projetos.</Form.Control.Feedback>
                        </FormGroup>
                    </Stack>
                    <div className="d-flex justify-content-end gap-2 border-top pt-2 ps-2 pe-2 pb-2">
                        <Button className="rounded-pill" variant="outline-secondary" onClick={rest.onHide}>
                            Fechar
                        </Button>
                        <Button className="rounded-pill" onClick={handleOnApply}>
                            Aplicar filtros
                        </Button>
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
