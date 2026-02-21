'use client'
import { GetReportZoneType } from "@/lib/firebase/reportZone"
import { useMarkerFillColor } from "@/useMarkerFillColor"
import { Marker, InfoWindow, useMarkerRef } from "@vis.gl/react-google-maps"
import { useCallback, useState } from "react"
import './style.scss'

interface PoiMarkersProps {
    zone: GetReportZoneType
}

export function PoiMarkers({ zone }: PoiMarkersProps) {
    const [openInfoWindow, setOpenInfoWindow] = useState<boolean>(false)
    const [markerRef, marker] = useMarkerRef()

    const handleMarkerClick = useCallback(() => {
        setOpenInfoWindow(isOpen => !isOpen), []
    }, [])

    const handleClose = useCallback(() => setOpenInfoWindow(false), [])

    const markerFillColor = useMarkerFillColor(zone.severity)

    function formatDate(dateValue: string) {
        const date = new Date(dateValue)
        return date.toLocaleDateString('pt-BR')
    }

    return (
        <>
            <Marker
                key={zone.key}
                ref={markerRef}
                onClick={handleMarkerClick}
                position={zone.location}
                icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: `${markerFillColor}`,
                    fillOpacity: 0.8,
                    scale: 12,
                    strokeColor: 'white',
                    strokeWeight: 2,
                }}
                animation={google.maps.Animation.DROP}
            />

            {openInfoWindow && marker && (

                <InfoWindow anchor={marker} onClose={handleClose}>
                    <div className="info-window">
                        <div className="info-header">
                            <p>Reportado por: <span className="info-username"> {zone.userName}</span></p>
                            <p className="info-date">Data: {formatDate(zone.date)}</p>
                        </div>
                        <div className="info-content-danger">

                            <p className="info-danger"><strong>{zone.dangerType}</strong></p>
                            {zone.severity == 'Alto' && (
                                <strong className='severity-badge high'>
                                    Severidade: {zone.severity}
                                </strong>
                            )}
                            {zone.severity == 'Médio' && (
                                <strong className='severity-badge medium'>
                                    Severidade: {zone.severity}
                                </strong>
                            )}
                            {zone.severity == 'Baixo' && (
                                <strong className='severity-badge low'>
                                    Severidade: {zone.severity}
                                </strong>
                            )}
                        </div>
                        <p className="info-description"> {zone.description}</p>
                    </div>
                </InfoWindow>
            )
            }
        </>
    )
}