import { Button, Col, Modal, ModalProps, Row, Stack } from "react-bootstrap";
import { tBaby } from "../../../interfaces";
import { useCallback, useContext, useState } from "react";
import ManageBabyModal from "../ManageBabyModal/ManageBabyModal";
import { BabyContext } from "../../../contexts/BabyContext";

export interface BabyInfoModalProps extends ModalProps {
    baby?: tBaby | null;
}

export default function BabyInfoModal({ baby, onHide, ...rest }: BabyInfoModalProps) {
    //CONTEXT
    const { deleteBaby, readBabys } = useContext(BabyContext);

    //STATES
    const [showEditModal, setShowEditModal] = useState(false);

    //EVENTS
    const handleOnDelete = useCallback(async () => {
        if (!baby) return;
        try {
            const wantDelete = window.confirm(
                "Deseja mesmo deletar este bebê? Todos seus dados e vídeos serão perdidos."
            );
            if (!wantDelete) return;

            await deleteBaby(baby.id_baby);
            alert("Bebê deletado!");
            if (onHide) onHide();
            //Atualiza os bebês se tudo der certo (Um erro ao buscar os bebes não deve ser lidado no catch do delete)
            readBabys().catch((errMsg) => alert(errMsg));
        } catch (errMsg) {
            alert(errMsg);
        }
    }, [readBabys, baby, onHide]);

    return (
        <>
            <Modal {...rest} show={baby !== undefined && baby !== null} onHide={onHide}>
                <Modal.Header closeButton>
                    <h5 className="m-0">Informações do bebê</h5>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm="12" className="mb-2">
                            <Stack className="d-flex w-100">
                                <small>Nome do bebê</small>
                                <span>{baby?.name}</span>
                            </Stack>
                        </Col>
                        <Col sm="6" className="mb-2">
                            <Stack className="d-flex w-100">
                                <small>Data de nascimento</small>
                                <span>
                                    {new Date(
                                        baby?.birth_year ?? 0,
                                        baby?.birth_month ?? 0,
                                        baby?.birth_day ?? 0
                                    ).toLocaleDateString("pt-Br")}
                                </span>
                            </Stack>
                        </Col>
                        <Col sm="6" className="mb-2">
                            <Stack className="d-flex w-100">
                                <small>Prematuro?</small>
                                <span>{baby?.is_prem ? "Sim" : "Não"}</span>
                            </Stack>
                        </Col>
                        <Col sm="12" className="user-select-none mt-2">
                            <div className="d-flex gap-3 justify-content-center">
                                <span role="button" className="text-primary" onClick={() => setShowEditModal(true)}>
                                    <i className="bi bi-pencil-square" /> Editar
                                </span>
                                <span role="button" className="text-danger" onClick={handleOnDelete}>
                                    <i className="bi bi-trash3-fill" /> Deletar
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="user-select-none">
                    <Button onClick={onHide} variant="outline-secondary" className="rounded-pill">
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            {baby && (
                <ManageBabyModal
                    onHide={() => setShowEditModal(false)}
                    show={showEditModal}
                    babyId={baby.id_baby}
                    initialValues={{
                        name: baby.name,
                        birth_day: baby.birth_day,
                        birth_month: baby.birth_month,
                        birth_year: baby.birth_year,
                        is_prem: baby.is_prem,
                    }}
                />
            )}
        </>
    );
}
