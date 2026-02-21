'use client'
import { GetReportZoneType } from "@/lib/firebase/reportZone"
import { useMarkerFillColor } from "@/useMarkerFillColor"
import { Marker, InfoWindow, useMarkerRef } from "@vis.gl/react-google-maps"
import { useCallback, useState } from "react"

interface PoiMarkersProps {
    zone: GetReportZoneType
}

export function PoiMarkers({zone}: PoiMarkersProps) {
    const [openInfoWindow, setOpenInfoWindow] = useState<boolean>(false)
    const [markerRef, marker] = useMarkerRef()
    
    const handleMarkerClick = useCallback(() => {
        setOpenInfoWindow(isOpen => !isOpen), []
    }, [])
    
    const handleClose = useCallback(() => setOpenInfoWindow(false), [])
    
    const markerFillColor = useMarkerFillColor(zone.severity)


    return (
        <>
            <Marker
                key={zone.key}
                ref={markerRef}
                onClick={handleMarkerClick}
                position={zone.location}
                icon={{
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor:`${markerFillColor}`,
                        fillOpacity: 0.8,
                        scale: 12,
                        strokeColor: 'white',
                        strokeWeight: 2,
                    }}
                animation={google.maps.Animation.DROP}                            
            />
                
            {openInfoWindow && marker && (
                
                <InfoWindow anchor={marker} onClose={handleClose} > 
                    <div style={{ color: '#000', padding: '8px' }}>
                        <p><strong>{zone.dangerType}</strong></p>
                        <p>Severidade: {zone.severity}</p>
                        <p>{zone.description}</p>
                    </div> 
                </InfoWindow>
                )
            }
        </>
    )
}