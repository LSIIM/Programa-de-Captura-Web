import { Button, ButtonProps, Spinner } from "react-bootstrap";
import { forwardRef, useCallback, useState } from "react";
import "./styles.css";

export interface IconButtonProps extends ButtonProps {
    bootstrapIconName: string;
    text?: string;
    onClickAsync?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

type Ref = HTMLButtonElement;
const IconButton = forwardRef<Ref, IconButtonProps>(
    ({ bootstrapIconName, text, onClickAsync, onClick, ...rest }: IconButtonProps, ref) => {
        //STATES
        const [loading, setLoading] = useState(false);

        //EVENTS
        const handleOnClick = useCallback(
            async (e: React.MouseEvent<HTMLButtonElement>) => {
                if (onClickAsync) {
                    setLoading(true);
                    onClickAsync(e).finally(() => setLoading(false));
                } else if (onClick) onClick(e);
            },
            [onClickAsync, onClick]
        );

        return (
            <Button
                {...rest}
                ref={ref}
                onClick={handleOnClick}
                variant="transparent"
                className={rest.className + " my-icon-button p-1 d-flex align-items-center justify-content-center"}
            >
                {loading ? (
                    <Spinner size="sm" animation="grow" />
                ) : (
                    <span>
                        {text}
                        <i className={`bi bi-${bootstrapIconName} ${rest.size === "lg" ? "fs-5" : "fs-6"}`} />
                    </span>
                )}
            </Button>
        );
    }
);

export default IconButton;
