import { Button, Modal, ModalProps, Spinner } from "react-bootstrap";
import FormBaby, { tNewBaby } from "../../forms/formBaby/FormBaby";
import { useCallback, useContext } from "react";
import { BabyContext } from "../../../contexts/BabyContext";
import { tBaby, tPartialEntity } from "../../../interfaces";

const FORM_BABY_ID = "form-register-baby";

export interface ManageBabyModalProps extends ModalProps {
    babyId?: number;
    initialValues: tNewBaby;
}

export default function ManageBabyModal({ onHide, initialValues, babyId, ...props }: ManageBabyModalProps) {
    //CONTEXTS
    const { createBaby, updateBaby, readBabys, creatingBaby, updatingBaby } = useContext(BabyContext);

    //EVENTOS
    const handleOnEdit = useCallback(
        async (baby: tNewBaby & tPartialEntity<tBaby, "id_baby">) => {
            try {
                await updateBaby(baby);
                alert("Bebê editado com sucesso.");
                if (onHide) onHide();
                //Atualiza os bebês caso der tudo certo (Um erro ao buscar não deve parar o reset do Form)
                readBabys().catch((errMsg) => alert(errMsg));
            } catch (errMsg) {
                throw errMsg; //Necessário para o Form não resetar
            }
        },
        [updateBaby, readBabys, onHide]
    );

    const handleOnCreate = useCallback(
        async (baby: tNewBaby) => {
            try {
                await createBaby(baby);
                alert("Bebê cadastrado com sucesso.");
                //Atualiza os bebês caso der tudo certo (Um erro ao buscar não deve parar o reset do Form)
                readBabys().catch((errMsg) => alert(errMsg));
            } catch (errMsg) {
                throw errMsg;
            }
        },
        [createBaby, readBabys]
    );

    const handleOnSubmit = useCallback(
        (baby: tNewBaby) => {
            if (babyId !== undefined) return handleOnEdit({ id_baby: babyId, ...baby });
            handleOnCreate(baby);
        },
        [handleOnEdit, handleOnCreate, babyId]
    );

    return (
        <Modal {...props} onHide={onHide}>
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
                    <span className="me-2">{babyId !== undefined ? "Editar" : "Cadastrar"}</span>
                    {(updatingBaby || creatingBaby) && <Spinner animation="grow" size="sm" />}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
