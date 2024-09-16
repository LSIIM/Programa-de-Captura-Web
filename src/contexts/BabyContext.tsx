import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { tNewBaby } from "../components/forms/formBaby/FormBaby";
import { tBaby, tPartialEntity } from "../interfaces";

//TYPES
export interface BabyProviderProps {
    children?: ReactNode;
}

//CONTEXT PROPS
interface BabyContextProps {
    babys: tBaby[];
    readingBabys: boolean;
    updatingBaby: boolean;
    deletingBaby: boolean;
    creatingBaby: boolean;
    readBabys: () => Promise<void>;
    updateBaby: (baby: tNewBaby & tPartialEntity<tBaby, "id_baby">) => Promise<void>;
    createBaby: (baby: tNewBaby) => Promise<void>;
    deleteBaby: (babyId: number) => Promise<void>;
}

//CONTEXT
export const BabyContext = createContext<BabyContextProps>({
    babys: [],
    readingBabys: false,
    updatingBaby: false,
    deletingBaby: false,
    creatingBaby: false,
    readBabys: async () => {},
    updateBaby: async () => {},
    createBaby: async () => {},
    deleteBaby: async () => {},
});

let abortController: AbortController | undefined;
export default function BabyProvider({ children }: BabyProviderProps) {
    //STATES
    const [babys, setBabys] = useState<tBaby[]>([]);
    const [readingBabys, setReadingBabys] = useState(false);
    const [updatingBaby, setUpdatingBaby] = useState(false);
    const [deletingBaby, setDeletingBaby] = useState(false);
    const [creatingBaby, setCreatingBaby] = useState(false);

    //EVENTS
    const readBabys = useCallback(async () => {
        //TODO: Implementar o controle de signal
        abortController = new AbortController();
        return new Promise<void>(async (resolve, reject) => {
            try {
                setReadingBabys(true);
                //TODO: Implementar a lógica de carregar dados dos bebês.
                const babys = await new Promise<tBaby[]>((resolve) => setTimeout(() => resolve(_babys), 1000));
                setBabys(babys);
                resolve();
            } catch (err: any) {
                console.error(err);
                reject(err?.message ?? "Erro desconhecido ao buscar bebês");
            } finally {
                setReadingBabys(false);
            }
        });
    }, []);

    useEffect(() => {
        readBabys().catch(() => {});
        return () => abortController?.abort();
    }, [readBabys]);

    const updateBaby = useCallback(async (baby: tNewBaby & tPartialEntity<tBaby, "id_baby">) => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                setUpdatingBaby(true);
                //TODO: Implementar lógica de editar bebês
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                resolve();
            } catch (err: any) {
                console.error(err);
                reject(err.message ?? "Erro desconhecido ao editar bebê.");
            } finally {
                setUpdatingBaby(false);
            }
        });
    }, []);

    const createBaby = useCallback(async (baby: tNewBaby) => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                setCreatingBaby(true);
                //TODO: Realizar lógica de criar o bebê
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                resolve();
            } catch (err: any) {
                console.error(err);
                reject(err?.message ?? "Erro desconhecido ao criar bebê.");
            } finally {
                setCreatingBaby(false);
            }
        });
    }, []);

    const deleteBaby = useCallback(async (babyId: number) => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                setDeletingBaby(true);
                //TODO: Realizar lógica de deletar o bebê
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                resolve();
            } catch (err: any) {
                console.error(err);
                reject(err?.message ?? "Erro desconhecido ao deletar bebê.");
            } finally {
                setDeletingBaby(false);
            }
        });
    }, []);

    return (
        <BabyContext.Provider
            value={{
                babys,
                readBabys,
                createBaby,
                updateBaby,
                deleteBaby,
                deletingBaby,
                readingBabys,
                updatingBaby,
                creatingBaby,
            }}
        >
            {children}
        </BabyContext.Provider>
    );
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
