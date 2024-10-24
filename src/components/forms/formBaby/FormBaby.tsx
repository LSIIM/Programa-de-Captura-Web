import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useCallback } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { v4 } from "uuid";
import { tBaby, tPartialEntity } from "../../../interfaces";
import { InputDate } from "../..";

//TYPES
export type tNewBaby = tPartialEntity<tBaby, "birthDate" | "isPremature" | "name" | "atipicidade" | "gestationalAge">;

export interface FormBabyProps {
    initialValues: tNewBaby;
    formId: string;
    onSubmit: (newBaby: tNewBaby) => Promise<void> | void;
}

export default function FormBaby(props: FormBabyProps) {
    //VARIABLES
    const { onSubmit } = props;

    //EVENTS
    const handleOnSubmit = useCallback(
        async (newBaby: tNewBaby, helpers: FormikHelpers<tNewBaby>) => {
            try {
                helpers.setSubmitting(true);
                await onSubmit(newBaby);
                helpers.resetForm();
            } catch (err) {
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
            validationSchema={schemaNewBaby}
            onSubmit={handleOnSubmit}
            initialValues={props.initialValues}
        >
            {({ handleSubmit, setValues, values, errors, handleChange }) => {
                return (
                    <Form id={props.formId} onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group className="mb-2" as={Col} sm="7" lg="8" controlId={v4()}>
                                <Form.Label>Nome do bebê</Form.Label>
                                <Form.Control
                                    className="rounded-pill"
                                    name="name"
                                    required
                                    onChange={handleChange}
                                    value={values.name}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="5" lg="4" controlId={v4()} className="mb-2">
                                <Form.Label>Prematuro?</Form.Label>
                                <Form.Select
                                    className="rounded-pill"
                                    name="is_prem"
                                    onChange={(e) =>
                                        setValues({ ...values, isPremature: e.target.value === "Sim" ? true : false })
                                    }
                                    value={values.isPremature ? "Sim" : "Não"}
                                    isInvalid={!!errors.isPremature}
                                >
                                    {["Sim", "Não"].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.isPremature}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="7" controlId={v4()} className="mb-2">
                                <Form.Label>Data de nascimento?</Form.Label>
                                <InputDate
                                    className={"rounded-pill"}
                                    dateValue={values.birthDate}
                                    onAccept={(birthDate) => setValues({ ...values, birthDate })}
                                    type="date"
                                />
                                <Form.Control.Feedback type="invalid">{errors.isPremature}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="5" controlId={v4()} className="mb-2">
                                <Form.Label>Idade gestacional</Form.Label>
                                <Form.Control
                                    className="rounded-pill"
                                    type="number"
                                    required
                                    min={0}
                                    value={values.gestationalAge}
                                    isInvalid={!!errors.gestationalAge}
                                    onChange={(e) => setValues({ ...values, gestationalAge: Number(e.target.value) })}
                                />
                                <Form.Control.Feedback type="invalid">{errors.gestationalAge}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="12" controlId={v4()}>
                                <Form.Label>Atipicidades</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    className="rounded-4"
                                    required
                                    rows={3}
                                    value={values.atipicidade}
                                    isInvalid={!!errors.atipicidade}
                                    onChange={(e) => setValues({ ...values, atipicidade: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">{errors.atipicidade}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
}

export const schemaNewBaby: yup.ObjectSchema<tNewBaby> = yup.object({
    birthDate: yup.date().required("Este campo é requerido."),
    isPremature: yup.boolean().required("Este campo é requerido."),
    name: yup.string().required("Este campo é requerido."),
    gestationalAge: yup.number().integer().required("Este campo é requerido.").min(1, "Coloque um valor válido."),
    atipicidade: yup.string().required("Este campo é requerido."),
});
