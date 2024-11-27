import { Button, Modal, ModalProps, Spinner } from "react-bootstrap";
import FormPatient, { tNewPatient } from "../forms/formBaby/FormPatient";
import { useCallback, useContext } from "react";
import { tPatient, tPartialEntity } from "../../interfaces";
import usePatients from "../../hooks/usePatients";
import { SystemContext } from "../../contexts/SystemContext";

const FORM_BABY_ID = "form-register-baby";

export interface ManagePatientModalProps extends ModalProps {
    babyId?: number;
    initialValues: tNewPatient;
    onSuccess?: () => void;
}

export default function ManagePatientModal({
    onHide,
    onSuccess,
    initialValues,
    babyId,
    ...props
}: ManagePatientModalProps) {
    //CONTEXT
    const { showAlert } = useContext(SystemContext);

    //HOOKS
    const { createBaby, updateBaby, isCreating, isUpdating } = usePatients();

    //EVENTOS
    const handleOnEdit = useCallback(
        async ({ id: id_baby, ...data }: tNewPatient & tPartialEntity<tPatient, "id">) => {
            try {
                await updateBaby(id_baby, data);
                showAlert("Paciente editado com sucesso.");
                if (onSuccess) onSuccess();
            } catch (err) {
                throw err; //Necessário para o Form não resetar
            }
        },
        [updateBaby, onSuccess, showAlert]
    );

    const handleOnCreate = useCallback(
        async (patient: tNewPatient) => {
            try {
                await createBaby(patient);
                showAlert("Paciente cadastrado com sucesso.");
                if (onSuccess) onSuccess();
            } catch (err) {
                throw err; //Necessário para o form não resetar
            }
        },
        [createBaby, onSuccess, showAlert]
    );

    const handleOnSubmit = useCallback(
        async (baby: tNewPatient) => {
            try {
                if (babyId !== undefined) await handleOnEdit({ id: babyId, ...baby });
                else await handleOnCreate(baby);
            } catch (err) {
                throw err; //Necessário para o FORM não resetar.
            }
        },
        [handleOnEdit, handleOnCreate, babyId]
    );

    return (
        <Modal {...props} onHide={onHide} centered data-test="modal-manage">
            <Modal.Header closeButton>
                <h5 className="m-0">{babyId !== undefined ? "Editar Paciente" : "Cadastrar Paciente"}</h5>
            </Modal.Header>
            <Modal.Body>
                <FormPatient formId={FORM_BABY_ID} initialValues={initialValues} onSubmit={handleOnSubmit} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} variant="outline-secondary" className="rounded-pill" data-test="btn-cancel">
                    Cancelar
                </Button>
                <Button type="submit" form={FORM_BABY_ID} className="rounded-pill" data-test="btn-submit">
                    <span>{babyId !== undefined ? "Editar" : "Cadastrar"}</span>
                    {(isUpdating || isCreating) && <Spinner className="ms-2" animation="grow" size="sm" />}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
