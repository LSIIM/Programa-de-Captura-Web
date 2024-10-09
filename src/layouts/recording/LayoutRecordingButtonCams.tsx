import { useCallback, useState } from "react";
import { Button, ButtonProps, Col, Spinner } from "react-bootstrap";
import { useVideoDevice } from "../../hooks";

export interface LayoutRecordingButtonCamsProps extends ButtonProps {
    onFindStreams?: (streams: MediaStream[]) => void;
    onCanFindStreams?: () => boolean;
}

export default function LayoutRecordingButtonCams({
    onFindStreams,
    onCanFindStreams,
    ...rest
}: LayoutRecordingButtonCamsProps) {
    //HOOKS
    const { getVideoStreams } = useVideoDevice();

    //STATES
    const [isFindingStreams, setIsFindingStreams] = useState(false);

    //EVENTS
    const handleFindStreams = useCallback(async () => {
        if (onCanFindStreams && !onCanFindStreams()) return;
        try {
            setIsFindingStreams(true);
            const streams = await getVideoStreams();
            if (onFindStreams) onFindStreams(streams);
        } catch (err) {
            console.error(err);
        } finally {
            setIsFindingStreams(false);
        }
    }, [getVideoStreams, onFindStreams, onCanFindStreams]);

    return (
        <Col className="d-flex align-items-end mb-2">
            <Button className="rounded-pill" onClick={handleFindStreams} {...rest}>
                {isFindingStreams ? (
                    <Spinner className="me-2" size="sm" animation="grow" />
                ) : (
                    <i className="bi bi-camera-fill me-2" />
                )}
                Escolher câmeras
            </Button>
        </Col>
    );
}
