import { useCallback, useState } from "react";
import { tRecording } from "../interfaces";
import api, { tRecordingQuery } from "../services/api";
import utils from "../utils";

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
                const res = await api.getRecordings();
                const recording = res.data.find(({ id }) => recordingId === id);
                if (!recording) throw Error("Gravação não encontrada!");

                setErrorToGet(false);
                resolve(recording);
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
        console.log(recording);

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

    const createRecording = useCallback(async (recording: any) => {
        abortController = new AbortController();
        //const signal = abortController.signal;

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsCreating(true);
                //TODO: Realizar lógica de criar o recording
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
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
