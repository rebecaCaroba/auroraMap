'use client'
import { GetReportZoneType } from "@/lib/firebase/reportZone"
import { useMarkerFillColor } from "@/useMarkerFillColor"
import { Marker, InfoWindow, useMarkerRef } from "@vis.gl/react-google-maps"
import { useCallback, useState } from "react"
import './style.scss'

interface PoiMarkersProps {
    zone: GetReportZoneType
    activeMarker: string | null
    setActiveMarker: (key: string | null) => void
}

export function PoiMarkers({ zone, setActiveMarker, activeMarker }: PoiMarkersProps) {
    const [markerRef, marker] = useMarkerRef()

    const handleMarkerClick = useCallback(() => {
        setActiveMarker(zone.key)
    }, [zone.key, setActiveMarker])

    const handleClose = useCallback(() => setActiveMarker(null), [])

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

            {activeMarker == zone.key && marker && (

                <InfoWindow anchor={marker} onClose={handleClose}>
                    <div className="info-window">
                            <h2 className="info-danger">{zone.dangerType}</h2>
                            <p className="info-description">
                                <strong>Descrição:</strong>
                                <br />
                                {zone.description}
                            </p>
                        <div className="info-content-danger">

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
                        <div className="info-header">
                            <p>Reportado por: <span className="info-username"> {zone.userName}</span></p>
                            <p className="info-date">Data: {formatDate(zone.date)}</p>
                        </div>
                    </div>
                </InfoWindow>
            )
            }
        </>
    )
}