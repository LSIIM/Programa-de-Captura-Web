import { useCallback, useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { ControlRecordingButton, MovimentsButtons } from "../../components";
import { tMovs } from "../../interfaces";
import "./styles.css";

let data: { chunks: Blob[]; label: string }[];

export interface LayoutRecordingProps {
    moviments: tMovs[];
    videos: { stream: MediaStream; label: string }[];
}

export default function LayoutRecording({ videos, moviments }: LayoutRecordingProps) {
    //STATES
    const [currentStreamId, setCurrentStreamId] = useState<null | string>(null);
    const [currentMovimentId, setCurrentMovimentId] = useState(moviments[0].id_mov);
    const [movimentsWithVideo, setMovimentsWithVideo] = useState<
        (tMovs & { data: { label: string; url: string }[] })[]
    >([]);

    const [mediaRecorders, setMediaRecorders] = useState<MediaRecorder[]>([]);

    const [isRecording, setIsRecording] = useState(false);

    //EVENTS
    useEffect(() => {
        if (videos[0]) setCurrentStreamId(videos[0].stream.id);
    }, [videos]);

    const handleOnRestart = useCallback(() => {
        setIsRecording(false);
        setMediaRecorders([]);
    }, []);

    const handleOnRecordingError = useCallback(
        (msg: string) => {
            alert(msg);
            handleOnRestart();
        },
        [handleOnRestart]
    );

    const handleOnSaveVideos = useCallback(() => {
        const currentMoviment = moviments.find((mov) => mov.id_mov === currentMovimentId);
        if (currentMoviment) {
            setMovimentsWithVideo((current) => {
                const currentMovimentWithVideo = {
                    ...currentMoviment,
                    data: data?.map(({ chunks, label }) => {
                        const blob = new Blob(chunks, { type: "video/webm" });
                        console.log("Blob onde deveria: ", blob);
                        const url = URL.createObjectURL(blob);
                        return { label, url };
                    }),
                };
                if (current.some((mwv) => mwv.id_mov === currentMovimentId))
                    return current.map((mwv) => (mwv.id_mov === currentMovimentId ? currentMovimentWithVideo : mwv));
                else return [...current, currentMovimentWithVideo];
            });
        } else alert("Aconteceu um erro ao salvar os vídeos.");
    }, [moviments, currentMovimentId]);

    const handleOnInit = useCallback(() => {
        //Instancia variavel de armazenamento de gravações e cria objetos de gravação.
        data = [];
        const mediaRecorders = videos.map(({ stream, label }) => {
            data.push({ label, chunks: [] });
            return new MediaRecorder(stream, { mimeType: "video/webm; codecs=vp9" });
        });

        mediaRecorders.forEach((media, index) => {
            media.ondataavailable = (event) => {
                if (event.data.size < 1) return;
                data[index].chunks.push(event.data);
                if (index === mediaRecorders.length - 1) handleOnSaveVideos();
            };
            media.onerror = () => handleOnRecordingError("Erro inesperado durante a gravação.");
            media.start();
        });

        //Feedback visual para inicio da gravação
        setIsRecording(true);
        setMediaRecorders(mediaRecorders);
    }, [videos, handleOnRecordingError, handleOnSaveVideos]);

    const handleOnDone = useCallback(() => {
        if (mediaRecorders.some((media) => media.state !== "recording"))
            return handleOnRecordingError("Erro ao tentar salvar gravação.");
        mediaRecorders.forEach((media) => media.stop());

        handleOnRestart();
    }, [mediaRecorders, handleOnRestart, handleOnRecordingError]);

    const handleOnRemake = useCallback(() => {
        setMovimentsWithVideo((current) => current.filter((mwv) => mwv.id_mov !== currentMovimentId));
    }, [currentMovimentId]);

    const handleOnChangeMoviment = useCallback(
        (newCurrentMovimentId: number) => {
            if (isRecording) return alert("A gravação deve ser salva antes de prosseguir.");
            setCurrentMovimentId(newCurrentMovimentId);
        },
        [isRecording]
    );

    return (
        <Stack className="my-layout-recording d-flex position-relative p-3">
            {videos.map(({ stream, label }) => {
                const movimentWithVideo = movimentsWithVideo.find(({ id_mov }) => id_mov === currentMovimentId);
                const dataSaved = movimentWithVideo?.data?.find((data) => data.label === label);
                return (
                    <div
                        key={stream.id}
                        className={`my-layout-recording-video-div border ${
                            currentStreamId === stream.id
                                ? "selected border-4 border-primary"
                                : "border-2 border-secondary z-2"
                        }`}
                        onClick={currentStreamId !== stream.id ? () => setCurrentStreamId(stream.id) : undefined}
                    >
                        {currentStreamId !== stream.id && (
                            <i className="bi bi-box-arrow-in-up-left text-white bg-black ps-1 pe-1 rounded bg-opacity-50 position-absolute top-0 end-0 m-2" />
                        )}
                        <span className="my-layout-recording-span position-absolute bottom-0 mb-2 ms-3 text-white bg-black ps-1 pe-1 rounded bg-opacity-50">
                            {label}
                        </span>
                        <video
                            className="w-100 h-100"
                            autoPlay
                            playsInline
                            muted
                            controls={!!dataSaved}
                            ref={(video) => {
                                if (!video) return;

                                if (dataSaved) {
                                    video.srcObject = null;
                                    video.src = dataSaved.url;
                                } else {
                                    video.srcObject = stream;
                                }
                            }}
                        />
                        {currentStreamId === stream.id && (
                            <>
                                <div className="position-absolute start-0 top-0 mt-2 ms-2 w-100">
                                    <MovimentsButtons
                                        moviments={moviments}
                                        currentMovimentId={currentMovimentId}
                                        setCurrentMovimentId={handleOnChangeMoviment}
                                        donedMovimentsIds={movimentsWithVideo.map((mwv) => mwv.id_mov)}
                                    />
                                </div>
                                <div className="d-flex w-100 justify-content-center position-absolute bottom-0 mb-2 z-3">
                                    <ControlRecordingButton
                                        isRecording={isRecording}
                                        isSave={movimentsWithVideo.some((mwv) => mwv.id_mov === currentMovimentId)}
                                        onClickInit={handleOnInit}
                                        onClickDone={handleOnDone}
                                        onClickRemake={handleOnRemake}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </Stack>
    );
}
