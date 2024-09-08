import { Button, ButtonProps } from "react-bootstrap";

export interface LayoutTableButtonProps extends ButtonProps {}

export default function LayoutTableButton(props: LayoutTableButtonProps) {
    return (
        <div className="my-layout-table-button">
            <Button className="shadow" as="button" {...props} />
        </div>
    );
}
