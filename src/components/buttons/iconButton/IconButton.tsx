import { Button, ButtonProps } from "react-bootstrap";
import "./styles.css";

export interface IconButtonProps extends ButtonProps {
    bootstrapIconName: string;
    text?: string;
}

export default function IconButton({ bootstrapIconName, text, ...rest }: IconButtonProps) {
    return (
        <Button {...rest} className={"my-icon-button p-1 " + rest.className}>
            {text}
            <i className={`bi bi-${bootstrapIconName} ${rest.size === "lg" ? "fs-5" : "fs-6"}`} />
        </Button>
    );
}
