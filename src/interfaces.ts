//Entidades do banco de dados

//BABYS_INFO
export type tBaby = {
    id: number;
    name: string;
    birthDate: Date;
    isPremature: boolean;
    gestationalAge: number;
    atipicidade: string;
};

//MOVS_INFO
export type tMovs = {
    id_mov: number;
    description: string;
};

//RECORDINGS
export type tRecording = {
    id_recording: number;
    ignore: boolean;
    observation: string;
    fk_id_baby: number;
    recording_year: number;
    recording_month: number;
    recording_day: number;
    fk_id_mov: number;
    mov_aux: boolean;
    fk_id_cam_mov: boolean;
    fk_id_cam_mov_aux: number;
    fk_id_projeto: number;
};

//CAM_INFO
export type tCam = {
    id_cam: number;
    model: string;
    is_ir: boolean;
};

//PROJECT
export type tProject = {
    id: number;
    projectName: string;
    createdAt: Date;
    updatedAt: Date;
};

//Tipo auxiliar para obter tipos parciais de tipos existentes
export type tPartialEntity<Entity, Keys extends keyof Entity> = {
    [Key in Keys]: Entity[Key];
};
