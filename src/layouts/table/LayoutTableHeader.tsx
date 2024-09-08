import { ReactNode } from "react";
import "./styles.css";

export interface LayoutTableHeaderProps {
    children?: ReactNode;
}

export default function LayoutTableHeader(props: LayoutTableHeaderProps) {
    return (
        <div className="my-layout-table-header gap-2 d-flex justify-content-between mt-3 ps-3 pe-3">
            {props.children}
        </div>
    );
}
