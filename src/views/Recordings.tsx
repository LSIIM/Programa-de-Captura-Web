import { useCallback, useContext, useEffect, useState } from "react";
import { CardRecording, OffcanvasRecordingFilter } from "../components";
import LayoutGridList from "../layouts/gridList";
import { Button } from "react-bootstrap";
import { tRecording } from "../interfaces";
import { useRecording } from "../hooks";
import { useNavigate } from "react-router-dom";
import { routes } from "../router";
import { SystemContext } from "../contexts/SystemContext";

export default function Recordings() {
    //CONTEXTS
    const { showAlert } = useContext(SystemContext);

    //HOOKS
    const { readRecordings, isReading, cancelProcess } = useRecording();
    const navigate = useNavigate();

    //STATES
    const [recordings, setRecordings] = useState<tRecording[]>([]);
    const [showOffcanvasFilters, setShowOffcanvasFilter] = useState(false);

    //EVENTS
    useEffect(() => {
        readRecordings()
            .then((recordings) => setRecordings(recordings))
            .catch((errMsg) => showAlert(errMsg));
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
                <LayoutGridList.Body isLoading={isReading}>
                    {recordings.map((record) => (
                        <CardRecording key={record.id} recording={record} video={record.videos[0]} />
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