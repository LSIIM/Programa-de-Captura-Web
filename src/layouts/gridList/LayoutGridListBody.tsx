import { Container } from "react-bootstrap";
import { ReactNode } from "react";
import "./styles.css";

export interface LayoutGridListBodyProps {
    children?: ReactNode;
    isLoading?: boolean;
}

export default function LayoutGridListBody(props: LayoutGridListBodyProps) {
    return (
        <Container fluid className="my-layout-grid-list-body w-100 ps-3 pe-3 pb-5">
            {!props.isLoading ? props.children : <div></div>}
        </Container>
    );
}
