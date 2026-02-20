'use client'
import { GetReportZoneType } from "@/lib/firebase/reportZone"
import { Marker, InfoWindow, useMarkerRef, useMap } from "@vis.gl/react-google-maps"
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

    return (
        <>
            <Marker
                key={zone.key}
                ref={markerRef}
                onClick={handleMarkerClick}
                position={zone.location}
                icon={{
                        path: google.maps.SymbolPath.CIRCLE,
                        fillColor: 'red',
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
                        <p>Severidade: {zone.sevarity}</p>
                        <p>{zone.description}</p>
                    </div> 
                </InfoWindow>
                )
            }
        </>
    )
}