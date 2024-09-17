import { useEffect, useState } from "react";
import LayoutPlaying from "../layouts/playing";
import { useRecording } from "../hooks";
import { CardRecord } from "../components";
import { tRecording } from "../interfaces";
import { useParams } from "react-router-dom";

export default function PlayingRecord() {
    //HOOKS
    const { readRecordings, isReading, isFinding, getRecording, errorToGet, errorToRead } = useRecording();
    const { id: currentRecordingId } = useParams();

    //STATES
    const [suggestedRecordings, setSuggestedRecordings] = useState<tRecording[]>([]);
    const [currentRecording, setCurrentRecording] = useState<tRecording | null>(null);
    console.log(currentRecording);
    
    const [recordReadyToPlay, setRecordReadyToPlay] = useState(false);

    //STATES
    const [search, setSearch] = useState("");

    //EVENTS
    useEffect(() => {
        if (currentRecordingId === undefined || isNaN(Number(currentRecordingId))) return;

        //Buscado current recording
        getRecording(Number(currentRecordingId))
            .then((recording) => setCurrentRecording(recording))
            .catch((errMsg) => alert(errMsg));

        //Buscando recordings sugestivos
        readRecordings()
            .then((recordings) => setSuggestedRecordings(recordings))
            .catch((errMsg) => alert(errMsg));
    }, [readRecordings, currentRecordingId, getRecording]);

    return (
        <LayoutPlaying.Root>
            <LayoutPlaying.PlayerContainer>
                <LayoutPlaying.Player
                    loadingRecord={!recordReadyToPlay}
                    loadingInfo={isFinding && errorToGet}
                    onReady={() => setRecordReadyToPlay(true)}
                >
                    <h5 className="mb-0">Nome do bebê | Projeto X | Movimento Y</h5>
                </LayoutPlaying.Player>
            </LayoutPlaying.PlayerContainer>
            <LayoutPlaying.List isLoading={isReading || errorToRead}>
                <LayoutPlaying.Search value={search} onAccept={setSearch} placeholder="Pesquise pelo nome do bebê" />
                {suggestedRecordings.map((record) => (
                    <CardRecord record={record} key={record.id_recording} />
                ))}
            </LayoutPlaying.List>
        </LayoutPlaying.Root>
    );
}
