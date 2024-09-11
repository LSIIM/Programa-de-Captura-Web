import { ReactNode } from "react";
import "./styles.css";

export interface LayoutPlayingRootProps {
    children?: ReactNode;
}

export default function LayoutPlayingRoot(props: LayoutPlayingRootProps) {
    return (
        <div className="my-layout-playing-root d-flex w-100 justify-content-center">
            <div className="my-layout-playing-grid my-max-width">{props.children}</div>
        </div>
    );
}
