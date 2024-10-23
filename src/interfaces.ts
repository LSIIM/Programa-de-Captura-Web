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
export type tMov = {
    id_mov: number;
    description: string;
};

//RECORDINGS
export type tRecording = {
    id: number;
    ignore: false;
    observation?: string;
    babyId: number;
    babyInfo: tBaby;
    recordingDate: Date;
    moveId?: number;
    moveInfo?: tMov;
    movAux: boolean;
    projectId: number;
    project: tProject;
    camInfoId?: number;
    camInfo?: tCam;
    recordVideoTypes: [];
    videos: tVideo[];
    createdAt: Date;
    updatedAt: Date;
};

//CAM_INFO
export type tCam = {
    id_cam: number;
    model: string;
    is_ir: boolean;
};

//VIDEO
export type tVideo = {
    url: string;
    isMain: boolean;
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
