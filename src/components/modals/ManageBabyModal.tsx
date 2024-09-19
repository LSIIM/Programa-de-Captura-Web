import { Button, Modal, ModalProps, Spinner } from "react-bootstrap";
import FormBaby, { tNewBaby } from "../forms/formBaby/FormBaby";
import { useCallback } from "react";
import { tBaby, tPartialEntity } from "../../interfaces";
import useBaby from "../../hooks/useBaby";

const FORM_BABY_ID = "form-register-baby";

export interface ManageBabyModalProps extends ModalProps {
    babyId?: number;
    initialValues: tNewBaby;
    onSuccess?: () => void;
}

export default function ManageBabyModal({ onHide, onSuccess, initialValues, babyId, ...props }: ManageBabyModalProps) {
    //HOOKS
    const { createBaby, updateBaby, isCreating, isUpdating } = useBaby();

    //EVENTOS
    const handleOnEdit = useCallback(
        async (baby: tNewBaby & tPartialEntity<tBaby, "id_baby">) => {
            try {
                await updateBaby(baby);
                alert("Bebê editado com sucesso.");
                if (onSuccess) onSuccess();
            } catch (errMsg) {
                throw errMsg; //Necessário para o Form não resetar
            }
        },
        [updateBaby, onSuccess]
    );

    const handleOnCreate = useCallback(
        async (baby: tNewBaby) => {
            try {
                await createBaby(baby);
                alert("Bebê cadastrado com sucesso.");
                if (onSuccess) onSuccess();
            } catch (errMsg) {
                throw errMsg; //Necessário para o form não resetar
            }
        },
        [createBaby, onSuccess]
    );

    const handleOnSubmit = useCallback(
        async (baby: tNewBaby) => {
            try {
                if (babyId !== undefined) await handleOnEdit({ id_baby: babyId, ...baby });
                else await handleOnCreate(baby);
            } catch (err) {
                throw err; //Necessário para o FORM não resetar.
            }
        },
        [handleOnEdit, handleOnCreate, babyId]
    );

    return (
        <Modal {...props} onHide={onHide} centered>
            <Modal.Header closeButton>
                <h5 className="m-0">{babyId !== undefined ? "Editar Bebê" : "Cadastrar Bebê"}</h5>
            </Modal.Header>
            <Modal.Body>
                <FormBaby formId={FORM_BABY_ID} initialValues={initialValues} onSubmit={handleOnSubmit} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} variant="outline-secondary" className="rounded-pill">
                    Cancelar
                </Button>
                <Button type="submit" form={FORM_BABY_ID} className="rounded-pill">
                    <span>{babyId !== undefined ? "Editar" : "Cadastrar"}</span>
                    {(isUpdating || isCreating) && <Spinner className="ms-2" animation="grow" size="sm" />}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
