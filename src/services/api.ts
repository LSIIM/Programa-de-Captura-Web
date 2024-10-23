import { tNewBaby } from "../components/forms/formBaby/FormBaby";
import { tCredentials } from "../components/forms/formLogin/FormLogin";
import { tBaby, tProject, tRecording } from "../interfaces";
import { routes } from "../router";
import axios, { AxiosError, AxiosResponse } from "axios";

export type tQuery<WhereObj extends object, SortKeys extends string> = {
    limit?: number;
    page?: number;
    sortBy?: SortKeys;
    sortType?: "asc" | "desc";
    where: WhereObj;
};
export type tBabyQuery = tQuery<{ name?: string }, "name" | "birthDate" | "gestacionalAge">;
export type tProjectQuery = tQuery<{}, "">;
export type tRecordingQuery = tQuery<{}, "">;

//Verifica strings em formato de datas
const formatoDeData = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;
function ehUmaData(value: any): boolean {
    return value && typeof value === "string" && formatoDeData.test(value);
}

//Lida com as datas vindas em formato de string da API e as transforma em data para o resto da aplição.
function handleDatas(dados: any) {
    if (dados === null || dados === undefined || typeof dados !== "object") return dados;

    for (const key of Object.keys(dados)) {
        const valor = dados[key];
        if (ehUmaData(valor)) dados[key] = new Date(valor);
        else if (typeof valor === "object") handleDatas(valor);
    }
}

const instance = axios.create({
    baseURL: process.env.REACT_APP_API + "/v1",
    timeout: 10_000, // Milliseconds
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        handleDatas(response.data);
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

const api = {
    //ACCESS
    login: async (credentials: tCredentials) => {
        //TODO: Chamar a rota para realizar login com as credenciais passadas
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                console.log(credentials);
                window.location.href = routes.listBabys;
                resolve();
            }, 500);
        });
    },
    logout: async () => {
        //TODO: Apagar o token de acesso caso exista
        //TODO: Chamar a rota para deslogar o usuário
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                window.location.href = routes.login;
                resolve();
            }, 500);
        });
    },

    //BABYS
    createBaby: (data: tNewBaby[], signal?: AbortSignal): Promise<AxiosResponse<void, AxiosError>> =>
        instance.post(`/baby`, { data }, { signal }),
    updateBaby: (id: number, data: tNewBaby, signal?: AbortSignal): Promise<AxiosResponse<void, AxiosError>> =>
        instance.patch(`/baby/${id}`, { data }, { signal }),
    deleteBaby: (id: number, signal?: AbortSignal): Promise<AxiosResponse<void, AxiosError>> =>
        instance.delete(`/baby/${id}`, { signal }),
    getBabys: (params?: tBabyQuery, signal?: AbortSignal): Promise<AxiosResponse<tBaby[], AxiosError>> =>
        instance.get(`/baby`, { params, signal }),
    getBaby: (id: number, signal?: AbortSignal): Promise<AxiosResponse<tBaby, AxiosError>> =>
        instance.get(`/baby/${id}`, { signal }),

    //PROJECTS
    getProjects: (params?: tProjectQuery, signal?: AbortSignal): Promise<AxiosResponse<tProject[], AxiosError>> =>
        instance.get(`/project`, { params, signal }),

    //RECORDINGS
    getRecordings: (params?: tRecordingQuery, signal?: AbortSignal): Promise<AxiosResponse<tRecording[], AxiosError>> =>
        instance.get(`/recording`, { params, signal }),
};

export default api;
