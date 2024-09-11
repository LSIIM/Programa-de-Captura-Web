import { Button, Modal, ModalProps } from "react-bootstrap";
import FormBaby, { tNewBaby } from "../../forms/formBaby/FormBaby";
import { useCallback } from "react";
import { useBaby } from "../../../hooks";

const FORM_BABY_ID = "form-register-baby";

export interface RegisterBabyModalProps extends ModalProps {
    onSuccessEdit?: () => void;
}

export default function RegisterBabyModal({ onSuccessEdit, ...props }: RegisterBabyModalProps) {
    //HOOKS
    const { handleOnCreateBaby } = useBaby({ enableRead: false });

    //EVENTOS
    const handleOnSubmitNewBaby = useCallback(
        (newBaby: tNewBaby) => {
            handleOnCreateBaby(newBaby).then(() => {
                //TODO: trocar console.log por um alerta
                alert("Bebê adicionado com sucesso.");
                if (onSuccessEdit) onSuccessEdit();
            });
        },
        [handleOnCreateBaby, onSuccessEdit]
    );

    return (
        <Modal {...props}>
            <Modal.Header>
                <h5 className="m-0">Cadastrar Bebê</h5>
            </Modal.Header>
            <Modal.Body>
                <FormBaby
                    formId={FORM_BABY_ID}
                    initialValues={{ name: "", birth_day: 20, birth_month: 2, birth_year: 2015, is_prem: false }}
                    onSubmit={handleOnSubmitNewBaby}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="outline-secondary" className="rounded-pill">
                    Cancelar
                </Button>
                <Button type="submit" form={FORM_BABY_ID} className="rounded-pill">
                    Cadastrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
