import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useCallback } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { v4 } from "uuid";
import { Baby, PartialEntity } from "../../../interfaces";
import InputBirthBaby from "../../inputs/inputBirthBaby/InputBirthBaby";

//TYPES
export type tNewBaby = PartialEntity<Baby, "birth_day" | "birth_month" | "birth_year" | "is_prem" | "name">;

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
                                    name="name"
                                    onChange={handleChange}
                                    value={values.name}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="5" lg="4" controlId={v4()}>
                                <Form.Label>Prematuro?</Form.Label>
                                <Form.Select
                                    name="is_prem"
                                    onChange={(e) =>
                                        setValues({ ...values, is_prem: e.target.value === "Sim" ? true : false })
                                    }
                                    value={values.is_prem ? "Sim" : "Não"}
                                    isInvalid={!!errors.is_prem}
                                >
                                    {["Sim", "Não"].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.is_prem}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} sm="12" lg="4" controlId={v4()}>
                                <Form.Label>Data de nascimento?</Form.Label>
                                <InputBirthBaby
                                    day={values.birth_day}
                                    month={values.birth_month}
                                    year={values.birth_year}
                                    onAccept={(birth_day, birth_month, birth_year) =>
                                        setValues({ ...values, birth_day, birth_month, birth_year })
                                    }
                                />
                                <Form.Control.Feedback type="invalid">{errors.is_prem}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
}

export const schemaNewBaby: yup.ObjectSchema<tNewBaby> = yup.object({
    birth_day: yup.number().required("Este campo é requerido."),
    birth_month: yup.number().required("Este campo é requerido."),
    birth_year: yup.number().required("Este campo é requerido."),
    is_prem: yup.boolean().required("Este campo é requerido."),
    name: yup.string().required("Este campo é requerido."),
});
