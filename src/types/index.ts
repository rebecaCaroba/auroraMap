export interface User {
    uid: string;
    email: string;
    displayName: string;
}

export interface AddReportZoneType {
    userUid: string | undefined
    userName?: string
    lat: number;
    lng: number;
    dangerType: string;
    severity: string;
    description: string;
}

export interface EditReportZoneType {
    userUid: string;
    key: string;
    dangerType: string;
    severity: string;
    description: string;
}

export interface GetReportZoneType {
    userUid: string | null
    userName?: string
    dangerType: string;
    description: string;
    key: string;
    location: {
        lat: number;
        lng: number;
    };
    severity: 'Alto' | 'Médio' | 'Baixo';
    date: string
}
