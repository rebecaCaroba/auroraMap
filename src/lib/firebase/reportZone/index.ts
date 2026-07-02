import { AddReportZoneType, EditReportZoneType } from "@/types";
import { db, ref, push, update, remove } from "../dbFirebase";

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short', 
    }).format(date);
}

export async function addReportZone(data: AddReportZoneType) {
    let response = null

    const contentData = {
        userName: data.userName == "" ? 'Usuário Anônimo' : data.userName,
        location: {
            lat: data.lat,
            lng: data.lng,
        },
        dangerType: data.dangerType,
        severity: data.severity,
        description: data.description,
        date: formatDate(new Date()),
    }

    try {
        const contentRef = ref(db, `reportZones/${data.userUid}`);
        await push(contentRef, contentData)

    } catch (error: any) {
        console.error('Erro ', error.message)
    }

    return { response };
}

export async function editReportZone(data: EditReportZoneType) {
    let response = null

    const contentData = { 
        dangerType: data.dangerType,
        severity: data.severity,
        description: data.description,
    }

    try {
        const contentRef = ref(db, `reportZones/${data.userUid}/${data.key}`);
        await update(contentRef, contentData)
    } catch (error: any) {
        console.error('Erro ', error.message)
    }

    return { response };
}

export async function removeReportZone(userUid: string, key: string) {
    let response = null

    try {
        const contentRef = ref(db, `reportZones/${userUid}/${key}`);
        await remove(contentRef)
    } catch (error: any) {
        console.error('Erro ', error.message)
    }

    return { response };
}
