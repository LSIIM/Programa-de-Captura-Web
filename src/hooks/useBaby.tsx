import { useCallback, useEffect, useState } from "react";
import { tBaby, tPartialEntity } from "../interfaces";
import { tNewBaby } from "../components/forms/formBaby/FormBaby";

let abortController: AbortController | undefined;

export default function useBaby({ enableRead }: { enableRead: boolean }) {
    //STATES
    const [babys, setBabys] = useState<tBaby[]>([]);

    const [isReading, setIsReading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    //EVENTS
    const handleOnReadBabys = useCallback(
        async (signal?: AbortSignal) => {
            if (!enableRead) return;
            try {
                setIsReading(true);
                //TODO: Implementar a lógica de carregar dados dos bebês.
                const babys = await new Promise<tBaby[]>((resolve) => setTimeout(() => resolve(_babys), 500));
                setBabys(babys);
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

        handleOnReadBabys(signal);

        return () => abortController?.abort();
    }, [handleOnReadBabys]);

    const handleOnUpdateBaby = useCallback(async (baby: tNewBaby & tPartialEntity<tBaby, "id_baby">) => {
        try {
            setIsUpdating(true);
            //TODO: Realizar lógica de editar bebê
        } catch (err) {
            console.error(err);
        } finally {
            setIsUpdating(false);
        }
    }, []);

    const handleOnCreateBaby = useCallback(async (baby: tNewBaby) => {
        try {
            setIsCreating(true);
            //TODO: Realizar lógica de criar o bebê
        } catch (err) {
            console.error(err);
        } finally {
            setIsCreating(false);
        }
    }, []);

    const handleOnDeleteBaby = useCallback(async (id: number) => {
        try {
            setIsDeleting(true);
            //TODO: Realizar lógica de deletar o bebê
        } catch (err) {
            console.error(err);
        } finally {
            setIsDeleting(false);
        }
    }, []);

    return {
        babys,
        handleOnReadBabys,
        handleOnUpdateBaby,
        handleOnCreateBaby,
        handleOnDeleteBaby,
        isReading,
        isCreating,
        isUpdating,
        isDeleting,
    };
}

const _babys: tBaby[] = [
    { id_baby: 0, name: "Baby A", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 1, name: "Baby B", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 2, name: "Baby C", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 3, name: "Baby D", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 4, name: "Baby E", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 5, name: "Baby F", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 6, name: "Baby G", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 7, name: "Baby H", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 8, name: "Baby I", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 9, name: "Baby J", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
];
