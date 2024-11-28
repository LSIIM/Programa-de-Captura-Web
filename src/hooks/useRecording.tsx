import { useCallback, useState } from "react";
import { tRecording } from "../interfaces";
import api, { tRecordingQuery } from "../services/api";
import utils from "../utils";
import { tNewRecording } from "../layouts/recording/LayoutRecordingBody";

export const LIMIT_PATIENT_PER_RECORDING= 50;

let abortController: AbortController | undefined;
export default function useRecording() {
    //STATES
    const [arrBuscando, setArrBuscando] = useState<true[]>([]);
    const [arrBuscandoPorId, setArrBuscandoPorId] = useState<true[]>([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [errorToRead, setErrorToRead] = useState(false);
    const [errorToGet, setErrorToGet] = useState(false);

    //EVENTS
    const readRecordings = useCallback(async (params?: tRecordingQuery) => {
        //TODO: Implementar o controle de signal
        abortController = new AbortController();
        const signal = abortController.signal;

        return new Promise<tRecording[]>(async (resolve, reject) => {
            try {
                setArrBuscando((current) => [...current, true]);
                const res = await api.getRecordings(params, signal);
                setErrorToRead(false);
                resolve(res.data);
            } catch (err: any) {
                if (utils.canIgnoreThisError(err)) return;
                console.error(err);
                setErrorToRead(true);
                reject(err);
            } finally {
                setArrBuscando((current) => current.slice(1));
            }
        });
    }, []);

    const getRecording = useCallback(async (recordingId: number) => {
        //TODO: Implementar o controle de signal
        abortController = new AbortController();
        //const signal = abortController.signal;

        return new Promise<tRecording>(async (resolve, reject) => {
            try {
                setArrBuscandoPorId((current) => [...current, true]);
                //TODO: Implementar a lógica de pegar somente o recording certo.
                const res = await api.getRecording(recordingId);
                if (!res.data) throw Error("Gravação não encontrada!");

                setErrorToGet(false);
                resolve(res.data);
            } catch (err: any) {
                if (utils.canIgnoreThisError(err)) return;
                console.error(err);
                setErrorToGet(true);
                reject(err);
            } finally {
                setArrBuscandoPorId((current) => current.slice(1));
            }
        });
    }, []);

    const updateRecording = useCallback(async (recording: any) => {
        abortController = new AbortController();
        //const signal = abortController.signal;

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsUpdating(true);
                //TODO: Implementar lógica de editar recording
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                resolve();
            } catch (err: any) {
                if (utils.canIgnoreThisError(err)) return;
                console.error(err);
                reject(err);
            } finally {
                setIsUpdating(false);
            }
        });
    }, []);

    const createRecording = useCallback(async (recordings: tNewRecording[]) => {
        abortController = new AbortController();
        const signal = abortController.signal;

        const recordingsWithoutFile = recordings.map((recording) => ({
            ...recording,
            recordingsVideos: recording.recordingsVideos.map(({ file, ...rest }) => rest),
        }));

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsCreating(true);
                const formData = new FormData();
                formData.append("recordings", JSON.stringify({ data: recordingsWithoutFile }));
                recordings.forEach((recording) =>
                    recording.recordingsVideos.forEach((video) => {
                        formData.append("videos", video.file, video.projectVideoTypeId.toString() + '.mp4');
                    })
                );

                await api.createRecordings(formData, signal);
                resolve();
            } catch (err: any) {
                if (utils.canIgnoreThisError(err)) return;
                console.error(err);
                reject(err);
            } finally {
                setIsCreating(false);
            }
        });
    }, []);

    const deleteRecording = useCallback(async (recordingId: number) => {
        abortController = new AbortController();
        //const signal = abortController.signal;

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsDeleting(true);
                //TODO: Realizar lógica de deletar o recording
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                resolve();
            } catch (err: any) {
                if (utils.canIgnoreThisError(err)) return;
                console.error(err);
                reject(err);
            } finally {
                setIsDeleting(false);
            }
        });
    }, []);

    const cancelProcess = useCallback(() => abortController?.abort(), []);

    return {
        getRecording,
        createRecording,
        updateRecording,
        readRecordings,
        deleteRecording,
        cancelProcess,
        isFinding: arrBuscandoPorId.length > 0,
        isReading: arrBuscando.length > 0,
        isCreating,
        isUpdating,
        isDeleting,
        errorToRead,
        errorToGet,
    };
}
