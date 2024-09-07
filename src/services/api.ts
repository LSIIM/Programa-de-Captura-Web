import { routes } from "../router";

const api = {
    logout: async () => {
        //Apagar o token de acesso caso exista
        //Chamar a rota para deslogar o usuário
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                window.location.href = routes.login;
                resolve();
            }, 500);
        });
    },
};

export default api;
