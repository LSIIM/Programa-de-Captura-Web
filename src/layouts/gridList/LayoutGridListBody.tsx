import { Container, Placeholder, Stack } from "react-bootstrap";
import { ReactNode } from "react";
import "./styles.css";

export interface LayoutGridListBodyProps {
    children?: ReactNode;
    isLoading?: boolean;
}

export default function LayoutGridListBody(props: LayoutGridListBodyProps) {
    return (
        <Container fluid className="my-layout-grid-list-body w-100 ps-3 pe-3 pb-5">
            {!props.isLoading ? (
                props.children
            ) : (
                <>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <Stack className="d-flex w-100" key={num}>
                            <Placeholder animation="glow" className="my-layout-grid-list-placeholder opacity-50">
                                <Placeholder className="w-100 h-100 rounded-4" />
                            </Placeholder>
                            <Stack className="w-100 d-flex ps-2 pe-2 mt-2">
                                <Placeholder as={"h5"} animation="glow" className="col-9 opacity-50">
                                    <Placeholder className="w-100 rounded" />
                                </Placeholder>
                                <Placeholder animation="glow" className="col-7 opacity-50">
                                    <Placeholder className="w-100 rounded" />
                                </Placeholder>
                                <Placeholder animation="glow" className="col-5 opacity-50">
                                    <Placeholder className="w-100 rounded" />
                                </Placeholder>
                            </Stack>
                        </Stack>
                    ))}
                </>
            )}
        </Container>
    );
}
