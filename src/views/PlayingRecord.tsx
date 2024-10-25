import { useContext, useEffect, useState } from "react";
import LayoutPlaying from "../layouts/playing";
import { useRecording } from "../hooks";
import { CardRecordListed } from "../components";
import { tRecording, tVideo } from "../interfaces";
import { useParams } from "react-router-dom";
import { SystemContext } from "../contexts/SystemContext";
import utils from "../utils";

export default function PlayingRecord() {
    //CONTEXTS
    const { showAlert } = useContext(SystemContext);

    //HOOKS
    const { readRecordings, isReading, isFinding, getRecording, errorToGet, errorToRead } = useRecording();
    const { id: currentRecordingId } = useParams();

    //STATES
    const [otherRecordings, setOtherRecordings] = useState<tRecording[]>([]);
    const [currentRecording, setCurrentRecording] = useState<tRecording | null>(null);
    const [suggestedVideos, setSuggestedVideos] = useState<tVideo[]>([]);
    const [currentVideo, setCurrentVideo] = useState<tVideo | null>();

    const [videoReadyToPlay, setVideoReadyToPlay] = useState(false);

    const [search, setSearch] = useState("");

    //VARIABLES
    const otherVideosFiltered = otherRecordings.filter(
        ({ id, babyInfo }) => id !== currentRecording?.id && babyInfo.name.toLowerCase().includes(search.toLowerCase())
    );

    //EVENTS
    useEffect(() => {
        if (currentRecordingId === undefined || isNaN(Number(currentRecordingId))) return;

        //Buscado current recording
        getRecording(Number(currentRecordingId))
            .then((recording) => {
                setCurrentRecording(recording);
                setSuggestedVideos(recording.videos);
                setCurrentVideo(recording.videos[0]);
            })
            .catch((err) => showAlert(utils.getMessageError(err)));

        //Buscando outros recordings
        readRecordings()
            .then((recordings) => setOtherRecordings(recordings))
            .catch((err) => showAlert(utils.getMessageError(err)));
    }, [readRecordings, currentRecordingId, getRecording, showAlert]);

    return (
        <LayoutPlaying.Root>
            <LayoutPlaying.PlayerContainer>
                <LayoutPlaying.Player
                    loadingVideo={!videoReadyToPlay}
                    loadingInfo={isFinding || errorToGet}
                    onReady={() => setVideoReadyToPlay(true)}
                    video={currentVideo ?? undefined}
                >
                    <h5 className="mb-0 text-truncate">
                        {currentRecording?.babyInfo.name} | {currentRecording?.project.projectName} |{" "}
                        {currentRecording?.moveInfo?.description ?? "<Nenhum Movimento>"}
                    </h5>
                </LayoutPlaying.Player>
            </LayoutPlaying.PlayerContainer>
            <LayoutPlaying.List>
                {currentRecording && currentRecording.videos.length > 0 && (
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
                <LayoutPlaying.Search value={search} onAccept={setSearch} placeholder="Pesquise pelo nome do bebê" />
                <LayoutPlaying.ListBody isLoading={isReading || errorToRead}>
                    {otherVideosFiltered.map((recording) => (
                        <CardRecordListed recording={recording} key={recording.id} video={recording.videos[0]} />
                    ))}
                </LayoutPlaying.ListBody>
            </LayoutPlaying.List>
        </LayoutPlaying.Root>
    );
}
