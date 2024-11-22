import { Button } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import "./styles.css";

export interface ControlRecordinButtonProps {
    isRecording: boolean;
    isReadyToUpload: boolean;
    isUploaded: boolean;
    onClickInit?: () => void;
    onClickDone?: () => void;
    onClickRemake?: () => void;
    onClickUpload?: () => Promise<void> | void;
}

export default function ControlRecordingButton(props: ControlRecordinButtonProps) {
    //STATES
    const [isUploading, setIsUploading] = useState(false);
    const [timer, setTimer] = useState(0);

    //VARIAVEIS
    const { isRecording, onClickInit, onClickDone, onClickRemake, isReadyToUpload, onClickUpload } = props;

    const returnTimerFormated = useCallback((timer: number) => {
        const minutes = Math.floor(timer / 60) % 60;
        const seconds = timer % 60;

        const formatNumber = (num: number) => String(num).padStart(2, "0");

        return `${formatNumber(minutes)}:${formatNumber(seconds)}`;
    }, []);

    const returnIconText = useCallback(() => {
        switch (true) {
            case !isRecording && !isReadyToUpload:
                return "play-fill";
            case isRecording && !isReadyToUpload:
                return "stop-fill";
            default:
                return "arrow-repeat";
        }
    }, [isRecording, isReadyToUpload]);

    //EVENTS
    useEffect(() => {
        if (!isRecording) return setTimer(0);
        const setTimeoutId = setTimeout(() => setTimer((current) => current + 1), 1000);
        return () => window.clearTimeout(setTimeoutId);
    }, [timer, isRecording]);

    const handleOnClick = useCallback(() => {
        switch (true) {
            case !isRecording && !isReadyToUpload:
                if (onClickInit) return onClickInit();
                break;
            case !isRecording && isReadyToUpload:
                if (onClickRemake) return onClickRemake();
                break;
            default:
                if (onClickDone) return onClickDone();
                break;
        }
    }, [isReadyToUpload, isRecording, onClickDone, onClickInit, onClickRemake]);

    const handleOnClickUploadVideo = useCallback(async () => {
        try {
            setIsUploading(true);
            if (onClickUpload) await onClickUpload();
        } catch (err) {
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    }, [onClickUpload]);

    return (
        <div className="d-flex gap-2">
            <Button
                variant={props.isReadyToUpload ? "secondary" : "primary"}
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
                disabled={!isReadyToUpload && isUploading}
                onClick={isReadyToUpload && !isUploading ? handleOnClickUploadVideo : undefined}
                variant="primary"
                title="Enviar"
                className={`my-control-recording-button d-flex ${
                    props.isReadyToUpload ? "" : "d-none"
                } fs-5 rounded-pill align-items-center justify-content-center`}
            >
                <i className={`bi ${props.isUploaded?"bi-check":"bi-cloud-arrow-up-fill"}`} />
            </Button>
        </div>
    );
}
