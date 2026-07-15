"use client"

import { GetReportZoneType, User } from "@/types";
import { removeReportZone } from "@/lib/firebase/reportZone";
import { db, ref, onValue } from "../../lib/firebase/dbFirebase";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { ModalEditZone } from "../ModalEditZone";
import './style.scss'

export function UserReportZones({ user }: { user: User }) {
    const [userReportZonesUser, setUserReportZonesUser] = useState<GetReportZoneType[]>([])
    const [isShowModalEditZone, setIsShowModalEditZone] = useState<boolean>(false)
    const [editingZone, setEditingZone] = useState<any>(null)

    useEffect(() => {
        const unsubscribe = onValue(ref(db, 'reportZones/' + `${user.uid}`), (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                setUserReportZonesUser([]);
                return;
            }

            const reportZones = Object.keys(data).flatMap(key => ({
                key,
                ...data[key]
            })) as GetReportZoneType[];

            setUserReportZonesUser(reportZones);
        });
        return () => unsubscribe();
    }, [user.uid])

    async function handleRemoveZone(key: string) {
        const confirmed = window.confirm('Tem certeza que deseja excluir esta zona reportada?')

        if (!confirmed) {
            return
        }

        await removeReportZone(user.uid, key)
    }

    function startEditing(zone: GetReportZoneType) {
        setEditingZone(zone)
        setIsShowModalEditZone(true)
    }

    return (
        <div className="report-zones">

            <div className="report-zone-header">
                <h4>Zonas Reportadas</h4>

                <span>{userReportZonesUser.length} {userReportZonesUser.length > 1 ? "reportes" : "reporte"}</span>
            </div>

            {isShowModalEditZone && (
                <ModalEditZone zoneEdit={editingZone} setIsShowModalEditZone={setIsShowModalEditZone} userId={user.uid} />
            )}
            <div className="report-zone-card">

                {userReportZonesUser && userReportZonesUser.length > 0 ? (
                    <div className="report-zone-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tipo de perigo</th>
                                    <th>Severidade</th>
                                    <th>Descrição</th>
                                    <th>Data</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userReportZonesUser.map((zone, index) => (
                                    <tr key={index}>
                                        <td className="type-cell">{zone.dangerType}</td>
                                        <td> <span className={`severity-cell-${zone.severity}`}>{zone.severity}</span></td>
                                        <td className="desc-cell">{zone.description}</td>
                                        <td>{zone.date}</td>
                                        <td>
                                            <div className="report-zone-actions">
                                                <button type="button" onClick={() => startEditing(zone)}>
                                                    <MdEdit size={20} />
                                                </button>
                                                <button type="button" className="danger" onClick={() => handleRemoveZone(zone.key)}>
                                                    <MdDelete size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Nenhuma zona reportada.</p>
                )}
            </div>
        </div>
    )
}