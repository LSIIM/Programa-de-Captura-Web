import { useCallback, useContext, useEffect, useState } from "react";
import LayoutPlaying from "../layouts/playing";
import { useRecording } from "../hooks";
import { CardRecordListed, InfiniteScroll } from "../components";
import { tRecording, tVideo } from "../interfaces";
import { useParams } from "react-router-dom";
import { SystemContext } from "../contexts/SystemContext";
import utils from "../utils";
import { LIMIT_PATIENT_PER_RECORDING } from "../hooks/useRecording";

export default function PlayingRecord() {
    //CONTEXTS
    const { showAlert } = useContext(SystemContext);

    //HOOKS
    const { readRecordings, isReading, isFinding, getRecording, errorToGet, errorToRead, cancelProcess } =
        useRecording();
    const { id: currentRecordingId } = useParams();

    //STATES
    const [otherRecordings, setOtherRecordings] = useState<tRecording[]>([]);
    const [currentRecording, setCurrentRecording] = useState<tRecording | null>(null);
    const [suggestedVideos, setSuggestedVideos] = useState<tVideo[]>([]);
    const [currentVideo, setCurrentVideo] = useState<tVideo | null>();

    const [videoReadyToPlay, setVideoReadyToPlay] = useState(false);

    const [search, setSearch] = useState<string | undefined>(undefined);

    const [currentPage, setCurrentPage] = useState(0);

    //EVENTS
    const paginateOtherRecordings = useCallback(
        async (page?: number): Promise<number> => {
            try {
                const otherRecordings = await readRecordings({ page, limit: LIMIT_PATIENT_PER_RECORDING, where: {} });

                setOtherRecordings((current) => [...current, ...otherRecordings]);
                return otherRecordings.length;
            } catch (err) {
                showAlert("Houve um erro ao carregar os videos.");
                return 0;
            }
        },
        [readRecordings, showAlert]
    );

    useEffect(() => {
        if (currentRecordingId === undefined || isNaN(Number(currentRecordingId))) return;

        //Buscado current recording
        getRecording(Number(currentRecordingId))
            .then((recording) => {
                setCurrentRecording(recording);
                setSuggestedVideos(recording.recordingsVideos);
                setCurrentVideo(recording.recordingsVideos[0]);
            })
            .catch((err) => showAlert(utils.getMessageError(err)));

        paginateOtherRecordings().then(() => setCurrentPage((current) => current + 1));
        return () => cancelProcess();
    }, [paginateOtherRecordings, cancelProcess, readRecordings, currentRecordingId, getRecording, showAlert]);

    return (
        <InfiniteScroll
            page={currentPage}
            setPage={setCurrentPage}
            loading={isReading && currentPage !== 0}
            onScrollEnd={paginateOtherRecordings}
        >
            <LayoutPlaying.Root>
                <LayoutPlaying.PlayerContainer>
                    <LayoutPlaying.Player
                        loadingVideo={!videoReadyToPlay}
                        loadingInfo={isFinding || errorToGet}
                        onReady={() => setVideoReadyToPlay(true)}
                        video={currentVideo ?? undefined}
                    >
                        <h5 className="mb-0 text-truncate">
                            {currentRecording?.patient.name} | {currentRecording?.project.projectName} |{" "}
                            {currentRecording?.moveInfo?.description ?? "<Nenhum Movimento>"}
                        </h5>
                    </LayoutPlaying.Player>
                </LayoutPlaying.PlayerContainer>
                <LayoutPlaying.List>
                    {currentRecording && currentRecording.recordingsVideos.length > 0 && (
                        <LayoutPlaying.Playlist
                            title="Relacionado"
                            subtitle="Vídeos da mesma gravação"
                            isLoading={isReading || errorToRead}
                        >
                            {suggestedVideos.map((video) => (
                                <CardRecordListed
                                    onPlaySpecificVideo={setCurrentVideo}
                                    recording={currentRecording}
                                    key={video.url}
                                    isPlaying={video === currentVideo}
                                    video={video}
                                />
                            ))}
                        </LayoutPlaying.Playlist>
                    )}
                    <LayoutPlaying.Search
                        value={search}
                        onAccept={setSearch}
                        placeholder="Pesquise pelo nome do bebê"
                    />
                    <LayoutPlaying.ListBody isLoading={(isReading && currentPage === 0) || errorToRead}>
                        {otherRecordings.map((recording) => (
                            <CardRecordListed
                                recording={recording}
                                key={recording.id}
                                video={recording.recordingsVideos[0]}
                            />
                        ))}
                    </LayoutPlaying.ListBody>
                </LayoutPlaying.List>
            </LayoutPlaying.Root>
        </InfiniteScroll>
    );
}
