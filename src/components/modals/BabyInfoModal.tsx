import { Button, Col, Modal, ModalProps, Row, Spinner, Stack } from "react-bootstrap";
import { tBaby } from "../../interfaces";
import { useCallback } from "react";
import useBaby from "../../hooks/useBaby";

export interface BabyInfoModalProps extends ModalProps {
    baby?: tBaby | null;
    onClickDelete?: () => void;
    onClickEdit?: () => void;
}

export default function BabyInfoModal({ baby, onHide, onClickDelete, onClickEdit, ...rest }: BabyInfoModalProps) {
    //HOOKS
    const { deleteBaby, isDeleting } = useBaby();

    //EVENTS
    const handleOnClickDelete = useCallback(async () => {
        if (!baby) return;
        const canDelete = window.confirm("Tem certeza que deseja deletar o bebê?");
        if (!canDelete) return;

        try {
            await deleteBaby(baby.id_baby);
            alert("Bebê deletado");
            if (onHide) onHide();
        } catch (err: any) {
            alert(err?.message ?? "Erro ao deletar bebê");
        }
    }, [baby, onHide, deleteBaby]);

    return (
        <>
            <Modal {...rest} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <h5 className="m-0">Informações do bebê</h5>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm="7" className="mb-2">
                            <Stack className="d-flex w-100">
                                <small>Nome do bebê</small>
                                <span>{baby?.name}</span>
                            </Stack>
                        </Col>
                        <Col sm="5" className="mb-2">
                            <Stack className="d-flex w-100">
                                <small>Prematuro?</small>
                                <span>{baby?.is_prem ? "Sim" : "Não"}</span>
                            </Stack>
                        </Col>
                        <Col sm="7" className="mb-2">
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

                        <Col sm="5" className="mb-2">
                            <Stack className="d-flex w-100">
                                <small>Idade gestacional</small>
                                <span>{baby?.idade_gestacional} meses</span>
                            </Stack>
                        </Col>

                        <Col sm="12" className="mb-2">
                            <Stack className="d-flex w-100">
                                <small>Atipicidades</small>
                                <span>{baby?.atipicidades}</span>
                            </Stack>
                        </Col>

                        <Col sm="12" className="user-select-none mt-2">
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
                <Modal.Footer className="user-select-none">
                    <Button onClick={onHide} variant="outline-secondary" className="rounded-pill">
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
