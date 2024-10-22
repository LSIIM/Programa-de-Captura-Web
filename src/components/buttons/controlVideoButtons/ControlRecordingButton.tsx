import { Button } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import "./styles.css";

export interface ControlRecordinButtonProps {
    isAllDone: boolean;
    isRecording: boolean;
    isSave: boolean;
    onClickInit?: () => void;
    onClickDone?: () => void;
    onClickRemake?: () => void;
    onClickSaveAll?: () => Promise<void> | void;
}

export default function ControlRecordingButton(props: ControlRecordinButtonProps) {
    //STATES
    const [isSavingAll, setIsSavingAll] = useState(false);
    const [timer, setTimer] = useState(0);

    //VARIAVEIS
    const { isRecording, onClickInit, onClickDone, onClickRemake, isSave, onClickSaveAll } = props;

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

    const handleOnClickSaveAll = useCallback(async () => {
        try {
            setIsSavingAll(true);
            if (onClickSaveAll) await onClickSaveAll();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSavingAll(false);
        }
    }, [onClickSaveAll]);

    return (
        <div className="d-flex gap-2">
            <Button
                variant={props.isSave ? "secondary" : "primary"}
                title="Play/Pause"
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
            <Button
                disabled={isSavingAll}
                onClick={!isSavingAll ? handleOnClickSaveAll : undefined}
                variant="primary"
                title="Enviar"
                className={`my-control-recording-button d-flex ${
                    props.isAllDone ? "" : "d-none"
                } fs-5 rounded-pill align-items-center justify-content-center`}
            >
                <i className="bi bi-cloud-arrow-up-fill" />
            </Button>
        </div>
    );
}
