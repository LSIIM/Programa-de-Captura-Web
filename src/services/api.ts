import { tNewPatient } from "../components/forms/formBaby/FormPatient";
import { tCredentials } from "../components/forms/formLogin/FormLogin";
import { tPatient, tProject, tRecording, UserSession } from "../interfaces";
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
        //TODO: Modificar os headers da requisição para adicionar o token de acesso
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
    login: async (credentials: tCredentials, signal?: AbortSignal): Promise<AxiosResponse<UserSession, any>> =>
        instance.post(`/auth/login`, { ...credentials }, { signal }),

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
    createPatient: (data: tNewPatient[], signal?: AbortSignal): Promise<AxiosResponse<void, AxiosError>> =>
        instance.post(`/patient`, { data }, { signal }),
    updatePatient: (id: number, data: tNewPatient, signal?: AbortSignal): Promise<AxiosResponse<void, AxiosError>> =>
        instance.patch(`/patient/${id}`, { data }, { signal }),
    deletePatient: (id: number, signal?: AbortSignal): Promise<AxiosResponse<void, AxiosError>> =>
        instance.delete(`/patient/${id}`, { signal }),
    getPatients: (params?: tBabyQuery, signal?: AbortSignal): Promise<AxiosResponse<tPatient[], AxiosError>> =>
        instance.get(`/patient`, { params, signal }),
    getPatient: (id: number, signal?: AbortSignal): Promise<AxiosResponse<tPatient, AxiosError>> =>
        instance.get(`/patient/${id}`, { signal }),

    //PROJECTS
    getProjects: (params?: tProjectQuery, signal?: AbortSignal): Promise<AxiosResponse<tProject[], AxiosError>> =>
        instance.get(`/project`, { params, signal }),

    //RECORDINGS
    getRecording: (id: number, signal?: AbortSignal): Promise<AxiosResponse<tRecording, AxiosError>> =>
        instance.get(`/recording/${id}`, { signal }),
    getRecordings: (params?: tRecordingQuery, signal?: AbortSignal): Promise<AxiosResponse<tRecording[], AxiosError>> =>
        instance.get(`/recording`, { params, signal }),
    createRecordings: (data: FormData, signal?: AbortSignal): Promise<AxiosResponse<void, AxiosError>> =>
        instance.post(`/recording`, data, {
            signal,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
};

export default api;
