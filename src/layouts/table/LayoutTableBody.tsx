import { Container } from "react-bootstrap";
import { ReactNode } from "react";
import "./styles.css";

export interface LayoutTableBodyProps {
    children?: ReactNode;
}

export default function LayoutTableBody(props: LayoutTableBodyProps) {
    return (
        <Container fluid className="my-layout-table-body w-100 d-flex ps-3 pe-3 mb-5">
            {props.children}
        </Container>
    );
}
