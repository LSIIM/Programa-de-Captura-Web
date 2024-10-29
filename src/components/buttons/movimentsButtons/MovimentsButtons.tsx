import { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { tMov } from "../../../interfaces";
import "./styles.css";

export interface MovimentsButtonsProps {
    moviments: tMov[];
    donedMovimentsIds?: number[];
    currentMovimentId?: number;
    setCurrentMovimentId?: (id: number) => void;
}

export default function MovimentsButtons({
    moviments,
    setCurrentMovimentId,
    currentMovimentId,
    ...props
}: MovimentsButtonsProps) {
    //STATES
    const [showMoviments, setShowMoviments] = useState(false);

    //EVENTS
    const handleOnSelectMoviment = useCallback(
        (mov: number) => {
            if (setCurrentMovimentId) setCurrentMovimentId(mov);
        },
        [setCurrentMovimentId]
    );

    return (
        <div className={`my-moviments-button-root d-flex gap-2 p-1 ${!showMoviments ? "closed" : ""}`}>
            <Button
                className={`my-open-moviments-button rounded-circle shadow-sm`}
                onClick={() => setShowMoviments((current) => !current)}
            >
                <i className="bi bi-chevron-double-up fs-6" />
            </Button>
            {moviments.map((mov) => (
                <Button
                    onClick={() => handleOnSelectMoviment(mov.id)}
                    key={mov.id}
                    variant={
                        currentMovimentId === mov.id
                            ? props.donedMovimentsIds?.includes(mov.id)
                                ? "primary-dark"
                                : "secondary-dark"
                            : props.donedMovimentsIds?.includes(mov.id)
                            ? "primary"
                            : "secondary"
                    }
                    className={`my-moviment-button ps-2 pe-2 p-1 rounded-pill shadow-sm`}
                    size="sm"
                >
                    {mov.description}
                </Button>
            ))}
        </div>
    );
}
