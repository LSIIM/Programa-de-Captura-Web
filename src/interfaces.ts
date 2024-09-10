//Entidades do banco de dados

//BABYS_INFO
export type tBaby = {
    id_baby: number;
    name: string;
    birth_year: number;
    birth_month: number;
    birth_day: number;
    is_prem: boolean;
};

//MOVS_INFO
export type tMovs = {
    id_mov: number;
    description: string;
};

//RECORDINGS
export type tRecordings = {
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
    id_proj: number;
    name_proj: string;
};

//Tipo auxiliar para obter tipos parciais de tipos existentes
export type tPartialEntity<Entity, Keys extends keyof Entity> = {
    [Key in Keys]: Entity[Key];
};