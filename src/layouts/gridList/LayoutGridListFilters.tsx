import { ReactNode } from "react";
import "./styles.css";

export interface LayoutGridListFiltersProps {
    children?: ReactNode;
}

export default function LayoutGridListFilters(props: LayoutGridListFiltersProps) {
    return <div className="my-layout-grid-list-filters">{props.children}</div>;
}
