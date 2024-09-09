import { Button, Modal, ModalProps } from "react-bootstrap";
import FormBaby, { tNewBaby } from "../../forms/formBaby/FormBaby";
import { useCallback } from "react";

const FORM_BABY_ID = "form-register-baby";

export interface RegisterBabyModalProps extends ModalProps {}

export default function RegisterBabyModal(props: RegisterBabyModalProps) {
    //EVENTOS
    const handleOnSubmitNewBaby = useCallback(async (newBaby: tNewBaby) => {
        try {
            //TODO: Salvar no banco de dado os dados do novo bebê
            console.log(newBaby);
        } catch (err) {
            //TODO: Mostrar Feedback visual de erro.
            console.error(err);
        }
    }, []);

    return (
        <Modal {...props}>
            <Modal.Header>
                <h5 className="m-0">Cadastrar Bebê</h5>
            </Modal.Header>
            <Modal.Body>
                <FormBaby
                    formId={FORM_BABY_ID}
                    initialValues={{ name: "", birth_day: 20, birth_month: 2, birth_year: 2015, is_prem: true }}
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
