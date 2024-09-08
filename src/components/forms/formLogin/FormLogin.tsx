import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useCallback } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { v4 } from "uuid";
import InputPassword from "../../inputs/inputPassword/InputPassword";

//TYPES
export type tCredentials = { password: string };
export interface FormLoginProps {
    initialValues: tCredentials;
    formId: string;
    onSubmit: (credentials: tCredentials) => Promise<void> | void;
}

export default function FormLogin(props: FormLoginProps) {
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
                //TODO: Mostrar feedback visual do erro
                console.error(err);
            } finally {
                helpers.setSubmitting(false);
            }
        },
        [onSubmit]
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
                            <Form.Group as={Col} sm="12" controlId={v4()}>
                                <Form.Label />
                                <InputPassword
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
    password: yup.string().required("Insira sua senha para entar."),
});
