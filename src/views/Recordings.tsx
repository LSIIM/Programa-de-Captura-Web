import { useCallback, useContext, useEffect, useState } from "react";
import { CardRecording, InfiniteScroll, OffcanvasRecordingFilter } from "../components";
import LayoutGridList from "../layouts/gridList";
import { Button } from "react-bootstrap";
import { tRecording } from "../interfaces";
import { useRecording } from "../hooks";
import { useNavigate } from "react-router-dom";
import { routes } from "../router";
import { SystemContext } from "../contexts/SystemContext";
import { LIMIT_PATIENT_PER_RECORDING } from "../hooks/useRecording";

export default function Recordings() {
    //CONTEXTS
    const { showAlert } = useContext(SystemContext);

    //HOOKS
    const { readRecordings, isReading, cancelProcess, errorToRead } = useRecording();
    const navigate = useNavigate();

    //STATES
    const [recordings, setRecordings] = useState<tRecording[]>([]);
    const [showOffcanvasFilters, setShowOffcanvasFilter] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);

    //EVENTS
    const paginateRecordings = useCallback(
        async (page?: number): Promise<number> => {
            try {
                const recordings = await readRecordings({ page, limit: LIMIT_PATIENT_PER_RECORDING, where: {} });

                setRecordings((current) => [...current, ...recordings]);
                return recordings.length;
            } catch (err) {
                showAlert("Houve um erro ao carregar os videos.");
                return 0;
            }
        },
        [readRecordings, showAlert]
    );

    useEffect(() => {
        paginateRecordings().then(() => setCurrentPage((current) => current + 1));

        return () => cancelProcess();
    }, [cancelProcess, paginateRecordings]);

    const handleOnApply = useCallback(() => {
        //TODO: Modificar os filtros
        setShowOffcanvasFilter(false);
    }, []);

    const handleOnClickCreate = useCallback(() => navigate(routes.createRecord), [navigate]);

    return (
        <>
            <InfiniteScroll
                onScrollEnd={paginateRecordings}
                page={currentPage}
                setPage={setCurrentPage}
                loading={isReading && currentPage !== 0}
            >
                <LayoutGridList.Root>
                    <LayoutGridList.Header>
                        <LayoutGridList.Filters>
                            <Button
                                className="rounded-pill"
                                variant="primary"
                                onClick={() => setShowOffcanvasFilter(true)}
                            >
                                <i className="bi bi-filter-circle-fill me-2" />
                                Filtros
                            </Button>
                        </LayoutGridList.Filters>
                        <LayoutGridList.Button className="rounded-pill" onClick={handleOnClickCreate}>
                            Gravar
                        </LayoutGridList.Button>
                    </LayoutGridList.Header>
                    <LayoutGridList.Body isLoading={(isReading && currentPage === 0) || errorToRead}>
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
            </InfiniteScroll>

            <OffcanvasRecordingFilter
                onApply={handleOnApply}
                show={showOffcanvasFilters}
                onHide={() => setShowOffcanvasFilter(false)}
            />
        </>
    );
}
