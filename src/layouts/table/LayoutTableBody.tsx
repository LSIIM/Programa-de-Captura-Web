import { Col, Container, Placeholder } from "react-bootstrap";
import { ReactNode } from "react";
import "./styles.css";

export interface LayoutTableBodyProps {
    children?: ReactNode;
    isLoading?: boolean;
}

export default function LayoutTableBody(props: LayoutTableBodyProps) {
    return (
        <Container fluid className="my-layout-table-body d-flex ps-3 pe-3">
            {!props.isLoading ? (
                props.children
            ) : (
                <table className="w-100 my-table rounded-3">
                    <thead>
                        <tr>
                            <th>
                                <Placeholder as={Col} sm="7" animation="glow" className="opacity-50">
                                    <Placeholder className="w-100 rounded" />
                                </Placeholder>
                            </th>
                            <th>
                                <Placeholder as={Col} sm="7" animation="glow" className="opacity-50">
                                    <Placeholder className="w-100 rounded" />
                                </Placeholder>
                            </th>
                            <th>
                                <Placeholder as={Col} sm="7" animation="glow" className="opacity-50">
                                    <Placeholder className="w-100 rounded" />
                                </Placeholder>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                            <tr key={num}>
                                <td>
                                    <Placeholder as={Col} sm="10" animation="glow" className="opacity-50">
                                        <Placeholder className="w-100 rounded" />
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={Col} sm="10" animation="glow" className="opacity-50">
                                        <Placeholder className="w-100 rounded" />
                                    </Placeholder>
                                </td>
                                <td>
                                    <Placeholder as={Col} sm="10" animation="glow" className="opacity-50">
                                        <Placeholder className="w-100 rounded" />
                                    </Placeholder>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Container>
    );
}
