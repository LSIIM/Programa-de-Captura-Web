import { ReactNode } from "react";
import "./styles.css";

export interface LayoutGridListHeaderProps {
    children?: ReactNode;
}

export default function LayoutGridListHeader(props: LayoutGridListHeaderProps) {
    return (
        <div className="my-layout-grid-list-header gap-2 d-flex justify-content-between mt-3 ps-3 pe-3 mb-2">
            {props.children}
        </div>
    );
}
