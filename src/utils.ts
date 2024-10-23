const utils = {
    getMessageError: (err: any) => {
        console.error(err);
        return err?.response?.data?.message ?? err?.message ?? "Erro desconhecido!";
    },
    canIgnoreThisError: (err: any) => err?.code === "ERR_CANCELED",
};

export default utils;
