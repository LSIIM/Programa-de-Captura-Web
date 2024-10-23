import { useCallback, useState } from "react";
import { tPartialEntity, tProject } from "../interfaces";
import api, { tProjectQuery } from "../services/api";
import utils from "../utils";

let abortController: AbortController | undefined;
export default function useProject() {
    //STATES
    const [isReading, setIsReading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [errorToRead, setErrorToRead] = useState(false);

    //EVENTS
    const readProjects = useCallback((params?: tProjectQuery) => {
        abortController = new AbortController();
        const signal = abortController.signal;

        return new Promise<tProject[]>(async (resolve, reject) => {
            try {
                setIsReading(true);
                const res = await api.getProjects(params, signal);
                setErrorToRead(false);
                resolve(res.data);
            } catch (err: any) {
                if (utils.canIgnoreThisError(err)) return;
                setErrorToRead(true);
                console.error(err);
                reject(err);
            } finally {
                setIsReading(false);
            }
        });
    }, []);

    const updateProject = useCallback(async (project: tProject & tPartialEntity<tProject, "id">) => {
        abortController = new AbortController();
        //const signal = abortController.signal;

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsUpdating(true);
                //TODO: Implementar lógica de editar projeto
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

    const createProject = useCallback(async (project: tProject) => {
        abortController = new AbortController();
        //const signal = abortController.signal;

        return new Promise<void>(async (resolve, reject) => {
            try {
                setIsCreating(true);
                //TODO: Realizar lógica de criar o projeto
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
