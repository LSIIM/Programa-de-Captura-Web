import { useCallback, useState } from "react";
import { tBaby, tPartialEntity } from "../interfaces";
import { tNewBaby } from "../components/forms/formBaby/FormBaby";

let abortController: AbortController | undefined;
export default function useBaby() {
    //STATES
    const [isReading, setIsReading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [errorToRead, setErrorToRead] = useState(false);

    //EVENTS
    const readBabys = useCallback(() => {
        abortController = new AbortController();
        //const signal = abortController.signal;

        return new Promise<tBaby[]>(async (resolve, reject) => {
            try {
                setIsReading(true);
                //TODO: Implementar a lógica de carregar dados dos bebês.
                const babys = await new Promise<tBaby[]>((resolve) => setTimeout(() => resolve(_babys), 1000));
                setErrorToRead(false);
                resolve(babys);
            } catch (err: any) {
                setErrorToRead(true);
                console.error(err);
                reject(err?.message ?? "Erro ao encontrar bebês.");
            } finally {
                setIsReading(false);
            }
        });
    }, []);

    const updateBaby = useCallback(async (baby: tNewBaby & tPartialEntity<tBaby, "id_baby">) => {
        abortController = new AbortController();
        //const signal = abortController.signal;

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsUpdating(true);
                //TODO: Implementar lógica de editar bebês
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                resolve();
            } catch (err: any) {
                console.error(err);
                reject(err.message ?? "Erro desconhecido ao editar bebê.");
            } finally {
                setIsUpdating(false);
            }
        });
    }, []);

    const createBaby = useCallback(async (baby: tNewBaby) => {
        abortController = new AbortController();
        //const signal = abortController.signal;

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsCreating(true);
                //TODO: Realizar lógica de criar o bebê
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                resolve();
            } catch (err: any) {
                console.error(err);
                reject(err?.message ?? "Erro desconhecido ao criar bebê.");
            } finally {
                setIsCreating(false);
            }
        });
    }, []);

    const deleteBaby = useCallback(async (babyId: number) => {
        abortController = new AbortController();
        //const signal = abortController.signal;

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsDeleting(true);
                //TODO: Realizar lógica de deletar o bebê
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                resolve();
            } catch (err: any) {
                console.error(err);
                reject(err?.message ?? "Erro desconhecido ao deletar bebê.");
            } finally {
                setIsDeleting(false);
            }
        });
    }, []);

    const cancelProcess = useCallback(() => abortController?.abort(), []);

    return {
        readBabys,
        updateBaby,
        deleteBaby,
        createBaby,
        cancelProcess,
        isReading,
        isCreating,
        isUpdating,
        isDeleting,
        errorToRead,
    };
}

const _babys: tBaby[] = [
    {
        id_baby: 0,
        name: "Baby A",
        birth_day: 1,
        birth_month: 0,
        birth_year: 2000,
        is_prem: false,
        idade_gestacional: 9,
        atipicidades:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus.",
    },
    {
        id_baby: 1,
        name: "Baby B",
        birth_day: 1,
        birth_month: 0,
        birth_year: 2000,
        is_prem: false,
        idade_gestacional: 9,
        atipicidades: "",
    },
    {
        id_baby: 2,
        name: "Baby C",
        birth_day: 1,
        birth_month: 0,
        birth_year: 2000,
        is_prem: false,
        idade_gestacional: 9,
        atipicidades: "",
    },
    {
        id_baby: 3,
        name: "Baby D",
        birth_day: 1,
        birth_month: 0,
        birth_year: 2000,
        is_prem: false,
        idade_gestacional: 9,
        atipicidades: "",
    },
    {
        id_baby: 4,
        name: "Baby E",
        birth_day: 1,
        birth_month: 0,
        birth_year: 2000,
        is_prem: false,
        idade_gestacional: 9,
        atipicidades: "",
    },
    {
        id_baby: 5,
        name: "Baby F",
        birth_day: 1,
        birth_month: 0,
        birth_year: 2000,
        is_prem: false,
        idade_gestacional: 9,
        atipicidades: "",
    },
    {
        id_baby: 6,
        name: "Baby G",
        birth_day: 1,
        birth_month: 0,
        birth_year: 2000,
        is_prem: false,
        idade_gestacional: 9,
        atipicidades: "",
    },
    {
        id_baby: 7,
        name: "Baby H",
        birth_day: 1,
        birth_month: 0,
        birth_year: 2000,
        is_prem: false,
        idade_gestacional: 9,
        atipicidades: "",
    },
    {
        id_baby: 8,
        name: "Baby I",
        birth_day: 1,
        birth_month: 0,
        birth_year: 2000,
        is_prem: false,
        idade_gestacional: 9,
        atipicidades: "",
    },
    {
        id_baby: 9,
        name: "Baby J",
        birth_day: 1,
        birth_month: 0,
        birth_year: 2000,
        is_prem: false,
        idade_gestacional: 9,
        atipicidades: "",
    },
];
