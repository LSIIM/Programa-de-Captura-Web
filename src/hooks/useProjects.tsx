import { useCallback, useState } from "react";
import { tPartialEntity, tProject } from "../interfaces";
import api, { tProjectQuery } from "../services/api";

let abortController: AbortController | undefined;
export default function useProject() {
    //STATES
    const [isReading, setIsReading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [errorToRead, setErrorToRead] = useState(false);

    //EVENTS
    const readProjects = useCallback((params?: tProjectQuery, signal?: AbortSignal) => {
        abortController = new AbortController();
        //const signal = abortController.signal;

        return new Promise<tProject[]>(async (resolve, reject) => {
            try {
                setIsReading(true);
                //TODO: Implementar a lógica de carregar dados dos projetos.
                const res = await api.getProjects(params, signal);
                setErrorToRead(false);
                resolve(res.data);
            } catch (err: any) {
                setErrorToRead(true);
                console.error(err);
                reject(err?.message ?? "Erro ao encontrar projetos.");
            } finally {
                setIsReading(false);
            }
        });
    }, []);

    //TODO: Mudar o type any para o certo
    const updateProject = useCallback(async (project: any & tPartialEntity<tProject, "id">) => {
        abortController = new AbortController();
        //const signal = abortController.signal;

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsUpdating(true);
                //TODO: Implementar lógica de editar projeto
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                resolve();
            } catch (err: any) {
                console.error(err);
                reject(err.message ?? "Erro desconhecido ao editar projeto.");
            } finally {
                setIsUpdating(false);
            }
        });
    }, []);

    const createProject = useCallback(async (project: any) => {
        abortController = new AbortController();
        //const signal = abortController.signal;

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsCreating(true);
                //TODO: Realizar lógica de criar o projeto
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                resolve();
            } catch (err: any) {
                console.error(err);
                reject(err?.message ?? "Erro desconhecido ao criar projeto.");
            } finally {
                setIsCreating(false);
            }
        });
    }, []);

    const deleteProject = useCallback(async (babyId: number) => {
        abortController = new AbortController();
        //const signal = abortController.signal;

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsDeleting(true);
                //TODO: Realizar lógica de deletar o projeto
                await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
                resolve();
            } catch (err: any) {
                console.error(err);
                reject(err?.message ?? "Erro desconhecido ao deletar projeto.");
            } finally {
                setIsDeleting(false);
            }
        });
    }, []);

    const cancelProcess = useCallback(() => abortController?.abort(), []);

    return {
        readProjects,
        updateProject,
        deleteProject,
        createProject,
        cancelProcess,
        isReading,
        isCreating,
        isUpdating,
        isDeleting,
        errorToRead,
    };
}
