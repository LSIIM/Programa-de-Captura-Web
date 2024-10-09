import { Button } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import "./styles.css";

export interface ControlVideoButtonsProps {
    isRecording: boolean;
    isSave: boolean;
    onClickInit?: () => void;
    onClickDone?: () => void;
    onClickRemake?: () => void;
}

export default function ControlVideoButtons(props: ControlVideoButtonsProps) {
    //STATES
    const [timeRecording, setTimeRecording] = useState(0);

    //VARIAVEIS
    const { isRecording, onClickInit, onClickDone, onClickRemake, isSave } = props;

    const returnIconText = useCallback(() => {
        switch (true) {
            case !isRecording && !isSave:
                return "play-fill";
            case isRecording && !isSave:
                return "stop-fill";
            default:
                return "arrow-repeat";
        }
    }, [isRecording, isSave]);

    //EVENTS
    useEffect(() => {
        if (!isRecording) return;
        const id = window.setTimeout(() => setTimeRecording((current) => current + 1), 1000);

        return () => window.clearTimeout(id);
    }, [isRecording, timeRecording]);

    const handleOnClick = useCallback(() => {
        switch (true) {
            case !isRecording && !isSave:
                if (onClickInit) return onClickInit();
                break;
            case !isRecording && isSave:
                if (onClickRemake) return onClickRemake();
                break;
            default:
                if (onClickDone) return onClickDone();
                break;
        }
    }, [isSave, isRecording, onClickDone, onClickInit, onClickRemake]);

    return (
        <div className="my-control-video-buttons-root d-flex gap-2">
            <Button
                onClick={handleOnClick}
                className="my-control-video-button d-flex align-items-center justify-content-center fs-5 rounded-circle"
            >
                <i className={`bi bi-${returnIconText()}`} />
            </Button>
        </div>
    );
}
