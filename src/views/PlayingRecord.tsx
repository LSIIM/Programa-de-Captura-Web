import { useState } from "react";
import LayoutPlaying from "../layouts/playing";
import { useRecording } from "../hooks";
import { CardRecord } from "../components";

export default function PlayingRecord() {
    //HOOKS
    const { recordings: otherRecordings, isReading: isReadingOtherRecordings } = useRecording({ enableRead: true });
    const { isReading: isReadingRecord } = useRecording({ enableRead: true });

    //STATES
    const [recordReadyToPlay, setRecordReadyToPlay] = useState(false);

    //STATES
    const [search, setSearch] = useState("");

    return (
        <LayoutPlaying.Root>
            <LayoutPlaying.PlayerContainer>
                <LayoutPlaying.Player
                    loadingRecord={!recordReadyToPlay}
                    loadingInfo={isReadingRecord}
                    onReady={() => setRecordReadyToPlay(true)}
                >
                    <h5 className="mb-0">Nome do bebê | Projeto X | Movimento Y</h5>
                </LayoutPlaying.Player>
            </LayoutPlaying.PlayerContainer>
            <LayoutPlaying.List isLoading={isReadingOtherRecordings}>
                <LayoutPlaying.Search value={search} onAccept={setSearch} placeholder="Pesquise por bebês" />
                {otherRecordings.map((record) => (
                    <CardRecord record={record} key={record.id_recording} />
                ))}
            </LayoutPlaying.List>
        </LayoutPlaying.Root>
    );
}
