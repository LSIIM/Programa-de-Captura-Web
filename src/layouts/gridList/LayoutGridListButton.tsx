import { Button, ButtonProps } from "react-bootstrap";
import "./styles.css";

export interface LayoutGridListButtonProps extends ButtonProps {}

export default function LayoutGridListButton(props: LayoutGridListButtonProps) {
    return (
        <div className="my-layout-grid-list-button">
            <Button className="shadow" as="button" {...props} />
        </div>
    );
}
