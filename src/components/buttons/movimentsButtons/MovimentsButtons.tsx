import { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { tMovs } from "../../../interfaces";
import "./styles.css";

export interface MovimentsButtonsProps {
    moviments: tMovs[];
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
                    onClick={() => handleOnSelectMoviment(mov.id_mov)}
                    key={mov.id_mov}
                    variant={
                        currentMovimentId === mov.id_mov
                            ? props.donedMovimentsIds?.includes(mov.id_mov)
                                ? "success-dark"
                                : "primary-dark"
                            : props.donedMovimentsIds?.includes(mov.id_mov)
                            ? "success"
                            : "primary"
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
