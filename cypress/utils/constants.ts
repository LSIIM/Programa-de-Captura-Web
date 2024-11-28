const constants = {
    VIEWS: {
        LOGIN_PATH: "/login",
        PACTIENTS_PATH: "/sistema/pacientes",
        RECORDINGS_PATH: "/sistema/gravacoes",
        CREATE_RECORD_PATH: "/sistema/gravar",
        PLAYING_FIRST_RECORDING: "/sistema/gravacao/1",
    },
    API: {
        AUTH: { LOGIN_PATH: "/v1/auth/login" },
        PATIENT: { DEFAULT_PATH: "/v1/patient", PATCH_DELETE_PATH: "/v1/patient/*" },
        RECORDINGS: { DEFAULT_PATH: "/v1/recording" },
    },
};

export default constants;
