import { Button, Col, Container, Form, FormGroup, FormSelect, Row } from "react-bootstrap";
import { v4 } from "uuid";
import { useBaby, useProject } from "../hooks";
import { useEffect, useState } from "react";
import { tBaby, tProject } from "../interfaces";
import { MovimentsButtons } from "../components";

export default function CreateRecord() {
    //HOOKS
    const { readBabys, cancelProcess: cancelBabyProcess } = useBaby();
    const { readProjects, cancelProcess: cancelProjectProcess } = useProject();

    //STATES
    const [babys, setBabys] = useState<tBaby[]>([]);
    const [projects, setProjects] = useState<tProject[]>([]);

    //EVENTS
    useEffect(() => {
        readBabys()
            .then((babys) => setBabys(babys))
            .catch((err) => console.error(err));

        readProjects()
            .then((projects) => setProjects(projects))
            .catch((err) => console.error(err));

        return () => {
            cancelBabyProcess();
            cancelProjectProcess();
        };
    }, [cancelBabyProcess, readBabys, readProjects, cancelProjectProcess]);

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
                    <Button className="rounded-pill">
                        <i className="bi bi-camera-fill me-2" />
                        Escolher câmeras
                    </Button>
                </Col>

                <Col sm="12" className="border-top mt-2 pt-2">
                    <MovimentsButtons numberOfMoviments={4} />
                </Col>
            </Row>
        </Container>
    );
}
