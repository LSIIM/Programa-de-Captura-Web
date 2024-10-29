//Entidades do banco de dados

//PATIENT
export type tPatient = {
    id: number;
    name: string;
    birthDate: Date;
    isPremature: boolean;
    gestationalAge: number;
    atipicidades: string;
};

//MOVS_INFO
export type tMov = {
    id: number;
    description: string;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
};

//RECORDINGS
export type tRecording = {
    id: number;
    ignore: false;
    observation?: string;
    patientId: number;
    patient: tPatient;
    recordingDate: Date;
    moveId?: number;
    moveInfo?: tMov;
    projectId: number;
    project: tProject;
    recordVideoTypes: [];
    createdAt: Date;
    updatedAt: Date;
    videos: tVideo[];
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

//CAM INFO
export type CamInfo = {
    id: number;
    framerate: null | number;
    isInfraRed: boolean;
    model: string;
    projectVideoTypeId: number;
};

//PROJECT VIDEO TYPE
//TODO: recordVideoType é um array do que?
export type tProjectVideoType = {
    id: number;
    isMain: boolean;
    typeName: string;
    projectId: number;
    createdAt: Date;
    updatedAt: Date;
    recordVideoType: any[];
};

//PROJECT
export type tProject = {
    id: number;
    projectName: string;
    createdAt: Date;
    updatedAt: Date;
    movesInfo: tMov[];
    projectsVideoTypes: tProjectVideoType[];
};

//Tipo auxiliar para obter tipos parciais de tipos existentes
export type tPartialEntity<Entity, Keys extends keyof Entity> = {
    [Key in Keys]: Entity[Key];
};
