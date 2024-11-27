import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useCallback, useContext } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { v4 } from "uuid";
import InputPassword from "../../inputs/inputPassword/InputPassword";
import { SystemContext } from "../../../contexts/SystemContext";
import utils from "../../../utils";

//TYPES
export type tCredentials = { email: string; password: string };

export interface FormLoginProps {
    initialValues: tCredentials;
    formId: string;
    onSubmit: (credentials: tCredentials) => Promise<void> | void;
}

export default function FormLogin(props: FormLoginProps) {
    //CONTEXTS
    const { showAlert } = useContext(SystemContext);

    //VARIABLES
    const { onSubmit } = props;

    //EVENTS
    const handleOnSubmit = useCallback(
        async (credentials: tCredentials, helpers: FormikHelpers<tCredentials>) => {
            try {
                helpers.setSubmitting(true);
                await onSubmit(credentials);
                helpers.resetForm();
            } catch (err) {
                showAlert(utils.getMessageError(err));
            } finally {
                helpers.setSubmitting(false);
            }
        },
        [onSubmit, showAlert]
    );

    return (
        <Formik
            validateOnChange={false}
            validationSchema={schemaLogin}
            onSubmit={handleOnSubmit}
            initialValues={props.initialValues}
        >
            {({ handleSubmit, setValues, values, errors }) => {
                return (
                    <Form id={props.formId} onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group as={Col} sm="12" controlId={v4()} className="mb-2">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    data-test="input-email"
                                    className="rounded-5"
                                    placeholder="Digite seu e-mail"
                                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                                    value={values.email}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="12" controlId={v4()}>
                                <Form.Label>Senha</Form.Label>
                                <InputPassword
                                    data-test="input-password"
                                    placeholder="Digite sua senha"
                                    onAccept={(password) => setValues({ ...values, password })}
                                    value={values.password}
                                    isInvalid={!!errors.password}
                                    error={errors.password}
                                />
                            </Form.Group>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
}

export const schemaLogin: yup.ObjectSchema<tCredentials> = yup.object({
    email: yup.string().email("Insira um e-mail válido.").required("Insira seu e-mail."),
    password: yup.string().required("Insira sua senha para acessar."),
});
