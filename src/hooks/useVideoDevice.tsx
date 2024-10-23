import { useCallback, useContext, useState } from "react";
import { SystemContext } from "../contexts/SystemContext";

export default function useVideoDevice() {
    //CONTEXTS
    const { showAlert } = useContext(SystemContext);

    //STATES
    const [loadingStreams, setLoadingStreams] = useState(false);

    //EVENTS
    const getVideoStreams = useCallback(async () => {
        try {
            setLoadingStreams(true);
            //Porque se busca 1 stream e depois o resto? Porque não se busca todo de uma vez?
            //A única forma encontrada de pegar todos os streams foi realizando uma busca por cada deviceId.
            //Para pegar todos os devicesId se usa a função navigator.mediaDevice.enumerateDevices().
            //No entanto, essa função não traz devicesId que não tenham sido permitidos pelo usuário.
            //Para aparecer o prompt de permissão a forma encontrada foi realizar uma busca sem passar nenhum deviceId.
            //Essa busca faz o prompt de permissões aparecer para o usuário e traz o streamDefault.
            //Após isso podem-se listar todos os devicesIds com a função anterior e acrescentar os streams encontrados.

            // Requisição para permitir uso das câmeras e obtenção do primeiro Stream.
            const defaultStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            const deviceIdDefault = defaultStream.getVideoTracks()[0]?.getSettings().deviceId;

            //Busca o restantes dos streams
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(
                ({ kind, deviceId }) => kind === "videoinput" && deviceId !== deviceIdDefault
            );

            const _otherStreams = videoDevices.map(({ deviceId }) =>
                navigator.mediaDevices
                    .getUserMedia({ audio: false, video: { deviceId: { exact: deviceId } } })
                    .catch(() => undefined)
            );
            const otherStreams = await Promise.all(_otherStreams);
            const filteredOtherStreams = otherStreams.filter((stream) => stream !== undefined) as MediaStream[];
            return [defaultStream, ...filteredOtherStreams];
        } catch (err: any) {
            console.error(err);
            switch (err?.code) {
                case 0:
                    showAlert("Não foi possível acessar todas suas câmeras. Outros programas podem estar usando-as.");
                    break;
                default:
                    showAlert("Não foi possível acessar alguma das suas camêras.");
                    break;
            }
            throw err;
        } finally {
            setLoadingStreams(false);
        }
    }, [showAlert]);

    return { loadingStreams, getVideoStreams };
}
