'use client'
import { Marker, InfoWindow, useMarkerRef } from "@vis.gl/react-google-maps"
import { useCallback, useState } from "react"

interface Poi {
    key: string,
    location: google.maps.LatLngLiteral
}

export function PoiMarkers() {
    const [openInfoWindow, setOpenInfoWindow] = useState<boolean>(false)
    const [markerRef, marker] = useMarkerRef()

    const locations: Poi[] = [
        { key: 'operaHouse', location: { lat: -23.54100037, lng: -46.36899948 } },
        { key: 'center', location: { lat: -23.5574, lng: -46.5936 } },
    ]

    const handleMarkerClick = useCallback(() => setOpenInfoWindow(isOpen => !isOpen), [])

    const handleClose = useCallback(() => setOpenInfoWindow(false), [])

    console.log(marker)
    return (
        <>
            {locations.map((poi) => (
                <Marker
                    key={poi.key}
                    ref={markerRef}
                    onClick={handleMarkerClick}
                    position={poi.location}
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
                ),
                {
                        openInfoWindow && (
                            <InfoWindow anchor={marker} onClose={handleClose}> 
                                <div>{poi.key}</div> 
                            </InfoWindow>
                        )
                    }
            )
                
            }
        </>
    )
}