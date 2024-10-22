import { ReactNode } from "react";
import { Col, Row } from "react-bootstrap";

export interface LayoutRecordingHeaderProps {
    children?: ReactNode;
}

export default function LayoutRecordingHeader(props: LayoutRecordingHeaderProps) {
    return (
        <Col sm="12" className="z-2">
            <Row className="w-100 m-0">{props.children}</Row>
        </Col>
    );
}
