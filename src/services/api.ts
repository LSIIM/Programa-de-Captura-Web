import { tCredentials } from "../components/forms/formLogin/FormLogin";
import { routes } from "../router";

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
};

export default api;
