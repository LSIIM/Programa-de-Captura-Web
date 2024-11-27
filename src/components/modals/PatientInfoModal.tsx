import { Button, Col, Modal, ModalProps, Row, Spinner, Stack } from "react-bootstrap";
import { tPatient } from "../../interfaces";
import { useCallback, useContext } from "react";
import usePatients from "../../hooks/usePatients";
import { SystemContext } from "../../contexts/SystemContext";
import utils from "../../utils";

export interface PatientInfoModalProps extends ModalProps {
    patient?: tPatient | null;
    onClickDelete?: () => void;
    onClickEdit?: () => void;
}

export default function PatientInfoModal({
    patient,
    onHide,
    onClickDelete,
    onClickEdit,
    ...rest
}: PatientInfoModalProps) {
    //CONTEXTS
    const { showAlert } = useContext(SystemContext);

    //HOOKS
    const { deleteBaby, isDeleting } = usePatients();

    //EVENTS
    const handleOnClickDelete = useCallback(async () => {
        if (!patient) return;

        const canDelete = window.confirm("Tem certeza que deseja deletar o paciente?");
        if (!canDelete) return;

        try {
            await deleteBaby(patient.id);
            showAlert("Paciente deletado.");
            if (onHide) onHide();
        } catch (err) {
            showAlert(utils.getMessageError(err));
        }
    }, [patient, onHide, deleteBaby, showAlert]);

    return (
        <>
            <Modal {...rest} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <h5 className="m-0">Informações do paciente</h5>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm="7" className="mb-2">
                            <Stack className="d-flex w-100">
                                <small>Nome do paciente</small>
                                <span>{patient?.name}</span>
                            </Stack>
                        </Col>
                        <Col sm="5" className="mb-2">
                            <Stack className="d-flex w-100">
                                <small>Prematuro?</small>
                                <span>{patient?.isPremature ? "Sim" : "Não"}</span>
                            </Stack>
                        </Col>
                        <Col sm="7" className="mb-2">
                            <Stack className="d-flex w-100">
                                <small>Data de nascimento</small>
                                <span>{patient?.birthDate?.toLocaleDateString("pt-Br")}</span>
                            </Stack>
                        </Col>

                        <Col sm="5" className="mb-2">
                            <Stack className="d-flex w-100">
                                <small>Idade gestacional</small>
                                <span>{patient?.gestationalAge} meses</span>
                            </Stack>
                        </Col>

                        <Col sm="12" className="mb-2">
                            <Stack className="d-flex w-100">
                                <small>Atipicidades</small>
                                <span>{patient?.atipicidades}</span>
                            </Stack>
                        </Col>

                        <Col sm="12" className="mt-2">
                            <div className="d-flex gap-3 justify-content-center">
                                <span role="button" className="text-primary" onClick={onClickEdit}>
                                    <i className="bi bi-pencil-square" /> Editar
                                </span>
                                <span role="button" className="text-danger" onClick={handleOnClickDelete}>
                                    <i className="bi bi-trash3-fill" /> Deletar
                                    {isDeleting && <Spinner size="sm" className="ms-2" animation="grow" />}
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant="outline-secondary" className="rounded-pill">
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
