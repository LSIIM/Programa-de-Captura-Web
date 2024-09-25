import { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import "./styles.css";

export interface MovimentsButtonsProps {
    numberOfMoviments: number;
    movimentsDoned?: number[];
    onClick?: (mov: number) => {};
}

export default function MovimentsButtons({ numberOfMoviments, onClick, ...props }: MovimentsButtonsProps) {
    //STATES
    const [movimentSelected, setMovimentSelected] = useState(1);
    const [showMoviments, setShowMoviments] = useState(false);

    //VARIABLES
    const returnMoviments = useCallback((): number[] => {
        return Array.from({ length: numberOfMoviments }, (_, i) => i + 1);
    }, [numberOfMoviments]);

    //EVENTS
    const handleOnSelectMoviment = useCallback(
        (mov: number) => {
            if (onClick) onClick(mov);
            setMovimentSelected(mov);
        },
        [onClick]
    );

    return (
        <div className={`my-moviments-button-root d-flex gap-2 ${!showMoviments ? "closed" : ""}`}>
            <Button
                className={`my-open-moviments-button rounded-circle shadow-sm`}
                onClick={() => setShowMoviments((current) => !current)}
            >
                <i className="bi bi-chevron-double-up fs-6" />
            </Button>
            {returnMoviments().map((mov) => (
                <Button
                    onClick={() => handleOnSelectMoviment(mov)}
                    key={mov}
                    variant={
                        movimentSelected === mov
                            ? "primary"
                            : props.movimentsDoned?.includes(mov)
                            ? "success"
                            : "outline-primary"
                    }
                    className={`my-moviment-button ps-2 pe-2 p-1 rounded-pill shadow-sm`}
                    size="sm"
                >
                    Movimento {mov}
                </Button>
            ))}
        </div>
    );
}
