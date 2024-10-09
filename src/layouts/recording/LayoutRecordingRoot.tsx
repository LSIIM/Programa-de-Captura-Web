import { ReactNode } from "react";
import { Container, Row } from "react-bootstrap";

export interface LayoutRecordingRootProps {
    children?: ReactNode;
}

export default function LayoutRecordingRoot(props: LayoutRecordingRootProps) {
    return (
        <Container fluid className="h-100">
            <Row className="h-100 mt-3">{props.children}</Row>
        </Container>
    );
}
