import { useCallback, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { v4 } from "uuid";
import { ControlRecordingButton, MovimentsButtons } from "../../components";
import { tMovs } from "../../interfaces";
import "./styles.css";

export type tDataLabelChunks = { label: string; chunks: Blob[] };
export type tStreamLabel = { stream: MediaStream; label: string };
export type tDoneMoviment = tMovs & { data: { label: string; url: string }[] };

export interface LayoutRecordingBodyProps {
    streamsLabel: tStreamLabel[];
    moviments: tMovs[];
}

export default function LayoutRecordingBody({ streamsLabel, moviments, ...props }: LayoutRecordingBodyProps) {
    //STATES
    const [currentSelectedStreamId, setCurrentSelectedStreamId] = useState<string | null>(null);
    const [currentMovimentId, setCurrentMovimentId] = useState<number | null>(null);

    const [donedMoviments, setDonedMoviments] = useState<tDoneMoviment[]>([]);

    const [mediaRecorders, setMediaRecorders] = useState<MediaRecorder[]>([]);
    const [isRecording, setIsRecording] = useState(false);

    //VARIABLES
    const currentMovimentIsDoned = donedMoviments.some(({ id_mov }) => id_mov === currentMovimentId) ? true : false;

    //EVENTS
    useEffect(() => {
        if (streamsLabel.length > 0) setCurrentSelectedStreamId(streamsLabel[0].stream.id);
        if (moviments.length > 0) setCurrentMovimentId(moviments[0].id_mov);
        setDonedMoviments([]);
    }, [streamsLabel, moviments]);

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

    const handleOnSaveVideos = useCallback(
        (data: tDataLabelChunks[], currentMovimentId: number | null) => {
            const currentMoviment = moviments.find((mov) => mov.id_mov === currentMovimentId);
            if (!currentMoviment) return alert("Aconteceu um erro ao salvar os vídeos.");

            //Criando um moivment atual com os vídeos gravados de cada câmera
            const currentDonedMoviment = {
                ...currentMoviment,
                data: data?.map(({ chunks, label }) => {
                    const blob = new Blob(chunks, { type: "video/webm" });
                    const url = URL.createObjectURL(blob);
                    return { label, url };
                }),
            };

            //Salvando o moviment criado
            setDonedMoviments((current) => {
                if (current.some((donedMoviment) => donedMoviment.id_mov === currentMovimentId))
                    return current.map((donedMoviment) =>
                        donedMoviment.id_mov === currentMovimentId ? currentDonedMoviment : donedMoviment
                    );
                else return [...current, currentDonedMoviment];
            });
        },
        [moviments]
    );

    const handleOnInitPlay = useCallback(() => {
        if (streamsLabel.length < 1) return alert("Não existe nenhuma câmera pronta.");

        //Inicia variável para salvar os vídeos e se criam os objetos de gravação.
        let data: tDataLabelChunks[] = [];
        const mediaRecorders = streamsLabel.map(({ stream, label }) => {
            data.push({ label, chunks: [] });
            return new MediaRecorder(stream, { mimeType: "video/webm; codecs=vp9" });
        });

        mediaRecorders.forEach((media, index) => {
            //ondataavailable irá acontecer assim que o media.stop for chamado
            media.ondataavailable = (event) => {
                if (event.data.size < 1) return; //Não deve acontecer.
                data[index].chunks.push(event.data); //Salva os dados de video em Blob[] na variavel global data.
                //Chama a função que salva os videos na última iteração.
                //Isto deve ser feito somente na última iteração para que todos os dados estejam salvos na variavel data.
                if (index === mediaRecorders.length - 1) handleOnSaveVideos(data, currentMovimentId);
            };
            //Caso aconteça algum erro.
            media.onerror = () => handleOnRecordingError("Erro inesperado durante a gravação.");
            //Inicia a gravaçào.
            media.start();
        });

        //Feedback visual para inicio da gravação
        setIsRecording(true);
        setMediaRecorders(mediaRecorders);
    }, [streamsLabel, currentMovimentId, handleOnRecordingError, handleOnSaveVideos]);

    const handleOnDone = useCallback(() => {
        //Todos os mediaRecorders devem estar gravando
        if (mediaRecorders.some((media) => media.state !== "recording"))
            return handleOnRecordingError("Erro ao tentar salvar gravação.");
        //Para a gravação de todos os mediaRecorders, isto aciona o evento ondataavailable de cada media
        mediaRecorders.forEach((media) => media.stop());

        //Feedback visual de gravação finalizada.
        handleOnRestart();
    }, [mediaRecorders, handleOnRestart, handleOnRecordingError]);

    const handleOnRemake = useCallback(() => {
        setDonedMoviments((current) => current.filter((donedMoviment) => donedMoviment.id_mov !== currentMovimentId));
    }, [currentMovimentId]);

    const handleOnChangeCurrentMoviment = useCallback(
        (newCurrentMovimentId: number) => {
            if (streamsLabel.length < 1) return alert("É necessário existirem câmeras prontas.");
            if (isRecording) return alert("A gravação deve ser salva antes de prosseguir.");
            setCurrentMovimentId(newCurrentMovimentId);
        },
        [isRecording, streamsLabel.length]
    );

    return (
        <Col sm="12" className="h-100 bg-red z-1 p-3 position-relative">
            <div className="position-absolute top-0 start-0 z-1 mt-4 ms-4">
                <MovimentsButtons
                    moviments={moviments}
                    currentMovimentId={currentMovimentId ?? 0}
                    setCurrentMovimentId={handleOnChangeCurrentMoviment}
                    donedMovimentsIds={donedMoviments.map(({ id_mov }) => id_mov)}
                />
            </div>

            <div
                className={`my-layout-recording-body-play-button ${
                    isRecording ? "recording" : ""
                } position-absolute z-2 bottom-0 start-0`}
            >
                <ControlRecordingButton
                    isRecording={isRecording}
                    isSave={currentMovimentIsDoned}
                    onClickInit={handleOnInitPlay}
                    onClickDone={handleOnDone}
                    onClickRemake={handleOnRemake}
                />
            </div>

            {streamsLabel.length < 1 && <div className="my-layout-recording-body-div-video-selected rounded-4" />}
            {streamsLabel.map(({ stream, label }) => {
                const isSelected = stream.id === currentSelectedStreamId;
                const currentDonedMoviment = donedMoviments.find(({ id_mov }) => id_mov === currentMovimentId);
                const dataSaved = currentDonedMoviment?.data?.find((data) => data.label === label);
                return (
                    <div
                        key={v4()}
                        className={`my-layout-recording-body-div-video${
                            isSelected ? "-selected border-primary" : ""
                        } rounded-4 overflow-hidden d-flex border border-3`}
                        onClick={() => setTimeout(() => setCurrentSelectedStreamId(stream.id), 150)}
                    >
                        <div className="d-flex w-100 h-100 position-relative">
                            {!isSelected && (
                                <i className="bi bi-box-arrow-in-up-left fs-5 position-absolute top-0 start-0 ms-2 mt-2" />
                            )}
                            <span className="position-absolute top-0 end-0 bg-black bg-opacity-50 rounded text-white me-2 mt-2 ps-1 pe-1">
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
                        </div>
                    </div>
                );
            })}
        </Col>
    );
}
