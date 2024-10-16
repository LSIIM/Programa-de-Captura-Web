const utils = {
    getMessageError: (err: any) => {
        console.log("Dentro do erro:", err);
        return err?.response?.data?.message ?? err?.message ?? "Erro desconhecido!";
    },
    canIgnoreThisError: (err: any) => err?.code === "ERR_CANCELED",
};

export default utils;
