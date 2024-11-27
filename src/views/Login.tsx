import { Col, Container, Row } from "react-bootstrap";
import { CardLogin, FormLogin } from "../components";
import { useCallback, useState } from "react";
import { tCredentials } from "../components/forms/formLogin/FormLogin";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { routes } from "../router";

const FORM_LOGIN_ID = "login-form";

export default function Login() {
    //HOOKS
    const navigate = useNavigate();

    //STATES
    const [logging, setLogging] = useState(false);

    //EVENTS
    const handleOnSubmit = useCallback(
        async (credentials: tCredentials) => {
            try {
                setLogging(true);
                await api.login(credentials);
                navigate(routes.listBabys);
            } catch (err) {
                console.error(err);
            } finally {
                setLogging(false);
            }
        },
        [navigate]
    );

    return (
        <Container fluid className="h-100">
            <Row className="h-100 align-items-center">
                <Col sm="12" className="d-flex justify-content-center pb-4 pt-4">
                    <CardLogin formId={FORM_LOGIN_ID} loading={logging}>
                        <FormLogin
                            onSubmit={handleOnSubmit}
                            formId={FORM_LOGIN_ID}
                            initialValues={{ email: "", password: "" }}
                        />
                    </CardLogin>
                </Col>
            </Row>
        </Container>
    );
}
