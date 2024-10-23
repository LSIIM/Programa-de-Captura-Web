import { useCallback, useContext, useState } from "react";
import { tBaby } from "../interfaces";
import { tNewBaby } from "../components/forms/formBaby/FormBaby";
import api, { tBabyQuery } from "../services/api";
import utils from "../utils";
import { SystemContext } from "../contexts/SystemContext";

let abortController: AbortController | undefined;
export default function useBaby() {
    //CONTEXT
    const { showAlert } = useContext(SystemContext);

    //STATES
    const [arrBuscando, setArrBuscando] = useState<true[]>([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [errorToRead, setErrorToRead] = useState(false);

    //EVENTS
    const readBabys = useCallback(
        (params?: tBabyQuery) => {
            abortController = new AbortController();
            const signal = abortController.signal;

            return new Promise<tBaby[]>(async (resolve, reject) => {
                try {
                    setArrBuscando((current) => [...current, true]);
                    const res = await api.getBabys(params, signal);
                    setErrorToRead(false);
                    resolve(res.data);
                } catch (err: any) {
                    if (utils.canIgnoreThisError(err)) return;
                    showAlert(utils.getMessageError(err));
                    setErrorToRead(true);
                    console.error(err);
                    reject(err);
                } finally {
                    setArrBuscando((current) => current.slice(1));
                }
            });
        },
        [showAlert]
    );

    const updateBaby = useCallback(
        async (id: number, data: tNewBaby) => {
            abortController = new AbortController();
            const signal = abortController.signal;

            return new Promise<void>(async (resolve, reject) => {
                try {
                    setIsUpdating(true);
                    await api.updateBaby(id, data, signal);
                    resolve();
                } catch (err: any) {
                    if (utils.canIgnoreThisError(err)) return;
                    showAlert(utils.getMessageError(err));
                    console.error(err);
                    reject(err);
                } finally {
                    setIsUpdating(false);
                }
            });
        },
        [showAlert]
    );

    const createBaby = useCallback(
        async (baby: tNewBaby) => {
            abortController = new AbortController();
            const signal = abortController.signal;

            return new Promise<void>(async (resolve, reject) => {
                try {
                    setIsCreating(true);
                    await api.createBaby([baby], signal);
                    resolve();
                } catch (err: any) {
                    if (utils.canIgnoreThisError(err)) return;
                    showAlert(utils.getMessageError(err));
                    console.error(err);
                    reject(err);
                } finally {
                    setIsCreating(false);
                }
            });
        },
        [showAlert]
    );

    const deleteBaby = useCallback(
        async (babyId: number) => {
            abortController = new AbortController();
            const signal = abortController.signal;

            return new Promise<void>(async (resolve, reject) => {
                try {
                    setIsDeleting(true);
                    await api.deleteBaby(babyId, signal);
                    resolve();
                } catch (err: any) {
                    if (utils.canIgnoreThisError(err)) return;
                    showAlert(utils.getMessageError(err));
                    console.error(err);
                    reject(err);
                } finally {
                    setIsDeleting(false);
                }
            });
        },
        [showAlert]
    );

    const cancelProcess = useCallback(() => abortController?.abort(), []);

    return {
        readBabys,
        updateBaby,
        deleteBaby,
        createBaby,
        cancelProcess,
        isReading: arrBuscando.length > 0,
        isCreating,
        isUpdating,
        isDeleting,
        errorToRead,
    };
}
