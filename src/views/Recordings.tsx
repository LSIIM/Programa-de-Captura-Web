import { useCallback, useContext, useEffect, useState } from "react";
import { CardRecording, OffcanvasRecordingFilter } from "../components";
import LayoutGridList from "../layouts/gridList";
import { Button } from "react-bootstrap";
import { tRecording } from "../interfaces";
import { useRecording } from "../hooks";
import { useNavigate } from "react-router-dom";
import { routes } from "../router";
import { SystemContext } from "../contexts/SystemContext";
import utils from "../utils";

export default function Recordings() {
    //CONTEXTS
    const { showAlert } = useContext(SystemContext);

    //HOOKS
    const { readRecordings, isReading, cancelProcess, errorToRead } = useRecording();
    const navigate = useNavigate();

    //STATES
    const [recordings, setRecordings] = useState<tRecording[]>([]);
    const [showOffcanvasFilters, setShowOffcanvasFilter] = useState(false);

    //EVENTS
    useEffect(() => {
        readRecordings()
            .then((recordings) => setRecordings(recordings))
            .catch((err) => showAlert(utils.getMessageError(err)));
        return () => cancelProcess();
    }, [readRecordings, cancelProcess, showAlert]);

    const handleOnApply = useCallback(() => {
        //TODO: Modificar os filtros
        setShowOffcanvasFilter(false);
    }, []);

    const handleOnClickCreate = useCallback(() => navigate(routes.createRecord), [navigate]);

    return (
        <>
            <LayoutGridList.Root>
                <LayoutGridList.Header>
                    <LayoutGridList.Filters>
                        <Button className="rounded-pill" variant="primary" onClick={() => setShowOffcanvasFilter(true)}>
                            <i className="bi bi-filter-circle-fill me-2" />
                            Filtros
                        </Button>
                    </LayoutGridList.Filters>
                    <LayoutGridList.Button className="rounded-pill" onClick={handleOnClickCreate}>
                        Gravar
                    </LayoutGridList.Button>
                </LayoutGridList.Header>
                <LayoutGridList.Body isLoading={isReading || errorToRead}>
                    {recordings.length < 1 && !errorToRead && !isReading && (
                        <h5 className="text-secondary position-absolute text-center w-100">
                            --- Nenhuma gravação encontrada ---
                        </h5>
                    )}
                    {recordings.map((record) => (
                        <CardRecording key={record.id} recording={record} video={record.recordingsVideos[0]} />
                    ))}
                </LayoutGridList.Body>
            </LayoutGridList.Root>

            <OffcanvasRecordingFilter
                onApply={handleOnApply}
                show={showOffcanvasFilters}
                onHide={() => setShowOffcanvasFilter(false)}
            />
        </>
    );
}
