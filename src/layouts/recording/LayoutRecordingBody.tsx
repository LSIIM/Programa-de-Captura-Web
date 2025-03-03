import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Col } from "react-bootstrap";
import { v4 } from "uuid";
import { ControlRecordingButton, MovimentsButtons } from "../../components";
import { tMov, tPartialEntity, tPatient, tProject, tProjectVideoType, tRecording } from "../../interfaces";
import { SystemContext } from "../../contexts/SystemContext";
import utils from "../../utils";
import { useRecording } from "../../hooks";
import "./styles.css";

const VIDEO_TYPE = "video/mp4";

export type tNewRecording = tPartialEntity<
    tRecording,
    "ignore" | "observation" | "patientId" | "recordingDate" | "moveId" | "projectId"
> & { recordingsVideos: { projectVideoTypeId: number; camIdUsed: number; file: Blob }[] };
export type tDataLabelChunks = { chunks: Blob[]; projectVideoType: tProjectVideoType };
export type tStreamLabel = { stream: MediaStream; projectVideoType: tProjectVideoType };
export type tDoneMoviment = tMov & { data: { blob: Blob; projectVideoType: tProjectVideoType }[] };

export interface LayoutRecordingBodyProps {
    streamsLabel: tStreamLabel[];
    moviments: tMov[];
    project?: tProject | null;
    patient?: tPatient | null;
}

export default function LayoutRecordingBody({ streamsLabel, moviments, patient, project }: LayoutRecordingBodyProps) {
    //CONTEXTS
    const { showAlert } = useContext(SystemContext);

    //HOOKS
    const { createRecording } = useRecording();

    //STATES
    const [currentSelectedStreamId, setCurrentSelectedStreamId] = useState<string | null>(null);
    const [currentMovimentId, setCurrentMovimentId] = useState<number | null>(null);

    const [donedMoviments, setDonedMoviments] = useState<tDoneMoviment[]>([]);
    const [uploadedMovimentsId, setUploadedMovimentsId] = useState<number[]>([]);

    const [mediaRecorders, setMediaRecorders] = useState<MediaRecorder[]>([]);
    const [isRecording, setIsRecording] = useState(false);

    //VARIABLES
    const currentMovimentIsDoned = donedMoviments.some(({ id: id_mov }) => id_mov === currentMovimentId) ? true : false;

    //EVENTS
    useEffect(() => {
        if (streamsLabel.length > 0) setCurrentSelectedStreamId(streamsLabel[0].stream.id);
        if (moviments.length > 0) setCurrentMovimentId(moviments[0].id);
        setDonedMoviments([]);
        setUploadedMovimentsId([]);
    }, [streamsLabel, moviments, patient]);

    const handleOnRestart = useCallback(() => {
        setIsRecording(false);
        setMediaRecorders([]);
    }, []);

    const handleOnRecordingError = useCallback(
        (msg: string) => {
            showAlert(msg);
            handleOnRestart();
        },
        [handleOnRestart, showAlert]
    );

    const handleOnSaveVideos = useCallback(
        (data: tDataLabelChunks[], currentMovimentId: number | null) => {
            const currentMoviment = moviments.find((mov) => mov.id === currentMovimentId);
            if (!currentMoviment) return showAlert("Aconteceu um erro ao salvar os vídeos.");

            //Criando um moivment atual com os vídeos gravados de cada câmera
            const currentDonedMoviment = {
                ...currentMoviment,
                data: data?.map(({ chunks, projectVideoType }) => {
                    const blob = new Blob(chunks, { type: VIDEO_TYPE });
                    return { blob, projectVideoType };
                }),
            };

            //Salvando o moviment criado
            setDonedMoviments((current) => {
                if (current.some((donedMoviment) => donedMoviment.id === currentMovimentId))
                    return current.map((donedMoviment) =>
                        donedMoviment.id === currentMovimentId ? currentDonedMoviment : donedMoviment
                    );
                else return [...current, currentDonedMoviment];
            });
        },
        [moviments, showAlert]
    );

    const handleOnInitPlay = useCallback(() => {
        if (streamsLabel.length < 1) return showAlert("Não existe nenhuma câmera pronta.");

        try {
            //Inicia variável para salvar os vídeos e se criam os objetos de gravação.
            let data: tDataLabelChunks[] = [];
            const mediaRecorders = streamsLabel.map(({ stream, projectVideoType }) => {
                data.push({ chunks: [], projectVideoType });
                return new MediaRecorder(stream, { mimeType: `${VIDEO_TYPE}; codecs=vp9` });
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
        } catch (err) {
            showAlert("Algo deu errado! Verifique suas câmeras e tente novamente.");
            console.error(err);
        }
    }, [streamsLabel, currentMovimentId, handleOnRecordingError, handleOnSaveVideos, showAlert]);

    const handleOnDone = useCallback(() => {
        try {
            //Todos os mediaRecorders devem estar gravando
            if (mediaRecorders.some((media) => media.state !== "recording"))
                return handleOnRecordingError("Erro ao tentar salvar gravação.");
            //Para a gravação de todos os mediaRecorders, isto aciona o evento ondataavailable de cada media
            mediaRecorders.forEach((media) => media.stop());

            //Feedback visual de gravação finalizada.
            handleOnRestart();
        } catch (err) {
            showAlert("Algo deu errado! Verifique suas câmeras e tente novamente.");
            console.error(err);
        }
    }, [mediaRecorders, handleOnRestart, handleOnRecordingError, showAlert]);

    const handleOnRemake = useCallback(() => {
        setDonedMoviments((current) => current.filter((donedMoviment) => donedMoviment.id !== currentMovimentId));
    }, [currentMovimentId]);

    const handleOnChangeCurrentMoviment = useCallback(
        (newCurrentMovimentId: number) => {
            if (streamsLabel.length < 1) return showAlert("É necessário existirem câmeras prontas.");
            if (isRecording) return showAlert("A gravação deve ser salva antes de prosseguir.");
            setCurrentMovimentId(newCurrentMovimentId);
        },
        [isRecording, streamsLabel.length, showAlert]
    );

    const handleOnUpload = useCallback(async () => {
        try {
            if (!patient || !project) return showAlert("Não foi possível encontrar o paciente ou o projeto.");
            if (!currentMovimentId) return showAlert("Nenhum movimento selecionado.");

            if (uploadedMovimentsId.includes(currentMovimentId)) return showAlert("Este movimento já foi salvo.");

            const currentDonedMoviment = donedMoviments.find((dm) => dm.id === currentMovimentId);
            if (!currentDonedMoviment) return showAlert("Não foi possível encontrar o movimento salvo.");

            await createRecording([
                {
                    ignore: false,
                    patientId: patient.id,
                    recordingDate: new Date(),
                    moveId: currentMovimentId,
                    projectId: project.id,
                    observation: "-",
                    recordingsVideos: currentDonedMoviment.data.map((data) => ({
                        projectVideoTypeId: data.projectVideoType.id,
                        camIdUsed: currentDonedMoviment.defaultCamId,
                        file: data.blob,
                    })),
                },
            ]);

            setUploadedMovimentsId((current) => [...current, currentDonedMoviment.id]);
            showAlert("Movimento salvo!");
        } catch (err) {
            showAlert(utils.getMessageError(err));
            console.error(err);
        }
    }, [donedMoviments, showAlert, createRecording, patient, project, currentMovimentId, uploadedMovimentsId]);

    return (
        <Col sm="12" className="bg-red h-100 z-1 p-3 position-relative">
            <div className="position-absolute top-0 start-0 z-1 mt-4 ms-4">
                <MovimentsButtons
                    moviments={moviments}
                    currentMovimentId={currentMovimentId ?? 0}
                    setCurrentMovimentId={handleOnChangeCurrentMoviment}
                    donedMovimentsIds={donedMoviments.map(({ id: id_mov }) => id_mov)}
                />
            </div>

            <div
                className={`my-layout-recording-body-play-button ${
                    isRecording ? "recording" : ""
                } position-absolute z-2 bottom-0 start-0`}
            >
                <ControlRecordingButton
                    isUploaded={uploadedMovimentsId.includes(currentMovimentId ?? -1)}
                    isRecording={isRecording}
                    isReadyToUpload={currentMovimentIsDoned}
                    onClickInit={handleOnInitPlay}
                    onClickDone={handleOnDone}
                    onClickRemake={handleOnRemake}
                    onClickUpload={handleOnUpload}
                />
            </div>

            {streamsLabel.length < 1 && <div className="my-layout-recording-body-div-video-selected rounded-4" />}
            {useMemo(
                () =>
                    streamsLabel.map(({ stream, projectVideoType }) => {
                        const isSelected = stream.id === currentSelectedStreamId;
                        const currentDonedMoviment = donedMoviments.find(
                            ({ id: id_mov }) => id_mov === currentMovimentId
                        );
                        const dataSaved = currentDonedMoviment?.data?.find(
                            (data) => data.projectVideoType.id === projectVideoType.id
                        );
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
                                        <span className="position-absolute top-0 start-0 ms-2 mt-2 h-max-content w-auto ratio-1x1 bg-black px-1 bg-opacity-50 rounded">
                                            <i className="bi bi-box-arrow-in-up-left fs-5 text-white lh-1" />
                                        </span>
                                    )}
                                    <span className="position-absolute top-0 end-0 bg-black bg-opacity-50 rounded text-white me-2 mt-2 ps-1 pe-1">
                                        {projectVideoType.typeName}
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
                                                video.src = URL.createObjectURL(dataSaved.blob);
                                            } else {
                                                video.srcObject = stream;
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    }),
                [streamsLabel, currentSelectedStreamId, donedMoviments, currentMovimentId]
            )}
        </Col>
    );
}
