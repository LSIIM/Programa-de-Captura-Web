import { useCallback, useState } from "react";
import { tRecording } from "../interfaces";

let abortController: AbortController | undefined;
export default function useRecording() {
    //STATES
    const [isFinding, setIsFinding] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [errorToRead, setErrorToRead] = useState(false);
    const [errorToGet, setErrorToGet] = useState(false);

    //EVENTS
    const readRecordings = useCallback(async () => {
        //TODO: Implementar o controle de signal
        abortController = new AbortController();
        const signal = abortController.signal;

        return new Promise<tRecording[]>(async (resolve, reject) => {
            try {
                setIsReading(true);
                //TODO: Implementar a lógica de carregar dados dos recordings.
                const recordings = await new Promise<tRecording[]>((resolve) =>
                    setTimeout(() => resolve(_recordings), 1000)
                );
                setErrorToRead(false);
                resolve(recordings);
            } catch (err: any) {
                console.error(err);
                setErrorToRead(true);
                reject(err?.message ?? "Erro desconhecido ao buscar recordings");
            } finally {
                setIsReading(false);
            }
        });
    }, []);

    const getRecording = useCallback(async (id: number) => {
        //TODO: Implementar o controle de signal
        abortController = new AbortController();
        const signal = abortController.signal;

        return new Promise<tRecording>(async (resolve, reject) => {
            try {
                setIsFinding(true);
                //TODO: Implementar a lógica de carregar dados do recording.
                const recording = await new Promise<tRecording>((resolve, reject) =>
                    setTimeout(() => {
                        const recordings = _recordings;
                        const recording = recordings.find(({ id_recording }) => id_recording === id);
                        if (recording) resolve(recording);
                        else reject(new Error("A gravação não foi encontrada."));
                    }, 1000)
                );
                setErrorToGet(false);
                resolve(recording);
            } catch (err: any) {
                console.error(err);
                setErrorToGet(true);
                reject(err?.message ?? "Erro desconhecido ao buscar recordings");
            } finally {
                setIsFinding(false);
            }
        });
    }, []);

    const updateRecording = useCallback(async (recording: any) => {
        abortController = new AbortController();
        const signal = abortController.signal;

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsUpdating(true);
                //TODO: Implementar lógica de editar recording
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                resolve();
            } catch (err: any) {
                console.error(err);
                reject(err.message ?? "Erro desconhecido ao editar recording.");
            } finally {
                setIsUpdating(false);
            }
        });
    }, []);

    const createRecording = useCallback(async (recording: any) => {
        abortController = new AbortController();
        const signal = abortController.signal;

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsCreating(true);
                //TODO: Realizar lógica de criar o recording
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                resolve();
            } catch (err: any) {
                console.error(err);
                reject(err?.message ?? "Erro desconhecido ao criar recording.");
            } finally {
                setIsCreating(false);
            }
        });
    }, []);

    const deleteRecording = useCallback(async (recordingId: number) => {
        abortController = new AbortController();
        const signal = abortController.signal;

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsDeleting(true);
                //TODO: Realizar lógica de deletar o recording
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                resolve();
            } catch (err: any) {
                console.error(err);
                reject(err?.message ?? "Erro desconhecido ao deletar recording.");
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
        isFinding,
        isReading,
        isCreating,
        isUpdating,
        isDeleting,
        errorToRead,
        errorToGet,
    };
}

const _recordings: tRecording[] = [
    {
        id_recording: 0,
        fk_id_baby: 1,
        fk_id_cam_mov: true,
        fk_id_cam_mov_aux: 1,
        fk_id_mov: 0,
        fk_id_projeto: 0,
        ignore: true,
        observation: "Algo foi observado.",
        recording_year: 2024,
        recording_month: 8,
        recording_day: 2,
        mov_aux: true,
    },
    {
        id_recording: 1,
        fk_id_baby: 1,
        fk_id_cam_mov: true,
        fk_id_cam_mov_aux: 1,
        fk_id_mov: 0,
        fk_id_projeto: 0,
        ignore: true,
        observation: "Algo foi observado.",
        recording_year: 2024,
        recording_month: 8,
        recording_day: 2,
        mov_aux: true,
    },
    {
        id_recording: 2,
        fk_id_baby: 1,
        fk_id_cam_mov: true,
        fk_id_cam_mov_aux: 1,
        fk_id_mov: 0,
        fk_id_projeto: 0,
        ignore: true,
        observation: "Algo foi observado.",
        recording_year: 2024,
        recording_month: 8,
        recording_day: 2,
        mov_aux: true,
    },
    {
        id_recording: 3,
        fk_id_baby: 1,
        fk_id_cam_mov: true,
        fk_id_cam_mov_aux: 1,
        fk_id_mov: 0,
        fk_id_projeto: 0,
        ignore: true,
        observation: "Algo foi observado.",
        recording_year: 2024,
        recording_month: 8,
        recording_day: 2,
        mov_aux: true,
    },
    {
        id_recording: 4,
        fk_id_baby: 1,
        fk_id_cam_mov: true,
        fk_id_cam_mov_aux: 1,
        fk_id_mov: 0,
        fk_id_projeto: 0,
        ignore: true,
        observation: "Algo foi observado.",
        recording_year: 2024,
        recording_month: 8,
        recording_day: 2,
        mov_aux: true,
    },
    {
        id_recording: 5,
        fk_id_baby: 1,
        fk_id_cam_mov: true,
        fk_id_cam_mov_aux: 1,
        fk_id_mov: 0,
        fk_id_projeto: 0,
        ignore: true,
        observation: "Algo foi observado.",
        recording_year: 2024,
        recording_month: 8,
        recording_day: 2,
        mov_aux: true,
    },
    {
        id_recording: 6,
        fk_id_baby: 1,
        fk_id_cam_mov: true,
        fk_id_cam_mov_aux: 1,
        fk_id_mov: 0,
        fk_id_projeto: 0,
        ignore: true,
        observation: "Algo foi observado.",
        recording_year: 2024,
        recording_month: 8,
        recording_day: 2,
        mov_aux: true,
    },
];
