import { useCallback, useEffect, useState } from "react";
import { tPartialEntity, tRecordings } from "../interfaces";

let abortController: AbortController | undefined;

export default function useRecording({ enableRead }: { enableRead: boolean }) {
    //STATES
    const [recordings, setRecordings] = useState<tRecordings[]>([]);

    const [isReading, setIsReading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    //EVENTS
    const handleOnReadRecordings = useCallback(
        async (signal?: AbortSignal) => {
            if (!enableRead) return;
            try {
                setIsReading(true);
                //TODO: Implementar a lógica de carregar dados das gravações.
                const recordings = await new Promise<tRecordings[]>((resolve) =>
                    setTimeout(() => resolve(_recordings), 500)
                );
                setRecordings(recordings);
            } catch (err) {
                console.error(err);
            } finally {
                setIsReading(false);
            }
        },
        [enableRead]
    );

    useEffect(() => {
        abortController = new AbortController();
        const signal = abortController.signal;

        handleOnReadRecordings(signal);

        return () => abortController?.abort();
    }, [handleOnReadRecordings]);

    const handleOnUpdateRecording = useCallback(async (recording: tPartialEntity<tRecordings, "id_recording">) => {
        try {
            setIsUpdating(true);
            //TODO: Realizar lógica de editar gravação
        } catch (err) {
            console.error(err);
        } finally {
            setIsUpdating(false);
        }
    }, []);

    const handleOnCreateRecording = useCallback(async (recording: any) => {
        try {
            setIsCreating(true);
            //TODO: Realizar lógica de criar a gravação
        } catch (err) {
            console.error(err);
        } finally {
            setIsCreating(false);
        }
    }, []);

    const handleOnDeleteRecording = useCallback(async (id: number) => {
        try {
            setIsDeleting(true);
            //TODO: Realizar lógica de deletar a gravação
        } catch (err) {
            console.error(err);
        } finally {
            setIsDeleting(false);
        }
    }, []);

    return {
        recordings,
        handleOnReadRecordings,
        handleOnUpdateRecording,
        handleOnCreateRecording,
        handleOnDeleteRecording,
        isReading,
        isCreating,
        isUpdating,
        isDeleting,
    };
}

const _recordings: tRecordings[] = [
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
