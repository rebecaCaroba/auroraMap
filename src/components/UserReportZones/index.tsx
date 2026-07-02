import { GetReportZoneType, User } from "@/types";
import { useEffect, useState } from "react";
import { db, ref, onValue } from "../../lib/firebase/dbFirebase";

export function UserReportZones({user}: {user: User}) {
    const [userReportZonesUser, setUserReportZonesUser] = useState<any[] | null>(null)

    useEffect(() => {
            onValue(ref(db, 'reportZones/' + `${user.uid}`), (snapshot) => {
                const data = snapshot.val();
                if (!data) {
                    setUserReportZonesUser([]);
                    return;
                }
                
                const reportZones = Object.keys(data).flatMap(key => ({
                    key,
                    ...data[key]
                })) as any[];

                setUserReportZonesUser(reportZones);
            });
    }, [])
        
    return (
        <div className="report-zones">
            
            <h2>Zonas Reportadas</h2>

            {userReportZonesUser && userReportZonesUser.length > 0 ? (
                <ul>
                    {userReportZonesUser.map((zone) => (
                        
                        <li key={zone.key}>
                            <p><strong>Tipo de Perigo:</strong> {zone.dangerType}</p>
                            <p><strong>Severidade:</strong> {zone.severity}</p>
                            <p><strong>Descrição:</strong> {zone.description}</p>
                            <p><strong>Data:</strong> {zone.date}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma zona reportada.</p>
            )}
        </div>
    )   
}