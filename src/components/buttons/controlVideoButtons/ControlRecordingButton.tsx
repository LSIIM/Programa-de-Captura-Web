import { Button } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import "./styles.css";

export interface ControlRecordinButtonProps {
    isRecording: boolean;
    isSave: boolean;
    onClickInit?: () => void;
    onClickDone?: () => void;
    onClickRemake?: () => void;
}

export default function ControlRecordingButton(props: ControlRecordinButtonProps) {
    //STATES
    const [timer, setTimer] = useState(0);

    //VARIAVEIS
    const { isRecording, onClickInit, onClickDone, onClickRemake, isSave } = props;

    const returnTimerFormated = useCallback((timer: number) => {
        const minutes = Math.floor(timer / 60) % 60;
        const seconds = timer % 60;

        const formatNumber = (num: number) => String(num).padStart(2, "0");

        return `${formatNumber(minutes)}:${formatNumber(seconds)}`;
    }, []);

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
        if (!isRecording) return setTimer(0);
        const setTimeoutId = setTimeout(() => setTimer((current) => current + 1), 1000);
        return () => window.clearTimeout(setTimeoutId);
    }, [timer, isRecording]);

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
        <div className="d-flex gap-2">
            <Button
                onClick={handleOnClick}
                className={`my-control-recording-button ${
                    isRecording ? "recording" : ""
                } d-flex align-items-center justify-content-center fs-5 rounded-pill`}
            >
                <i className={`bi bi-${returnIconText()}`} />
                <div className={`my-control-recording-button-timer ${isRecording ? "recording" : ""}`}>
                    {returnTimerFormated(timer)}
                </div>
            </Button>
        </div>
    );
}
