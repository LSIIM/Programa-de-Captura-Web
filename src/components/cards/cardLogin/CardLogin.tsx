import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { ReactNode } from "react";
import "./styles.css";

export interface CardLoginProps {
    children?: ReactNode;
    formId: string;
    loading?: boolean;
}

export default function CardLogin(props: CardLoginProps) {
    return (
        <Card className="my-card-login-root shadow">
            <Card.Body>
                <Row>
                    <Col sm="12" className="text-center">
                        <h5 className="text-dark fw-bold">LSIIM</h5>
                    </Col>
                    <Col sm="12">{props.children}</Col>
                    <Col sm="12" className="text-end">
                        <Button form={props.formId} type="submit">
                            Entrar {props.loading ? <Spinner size="sm" className="ms-2" animation="grow" /> : ""}
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
