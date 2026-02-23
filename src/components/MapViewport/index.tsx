'use client'
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { ModalMapViewport } from '../ModalMapViewport';
import { useMap } from '@/context/MapContext';
import { PoiMarkers } from '../PoiMarkers';
import { useEffect, useState } from 'react';
import { GetReportZoneType } from '@/lib/firebase/reportZone';
import { db, ref, onValue } from "../../lib/firebase/dbFirebase";

export interface ClickedPositionType {
    lat: number,
    lng: number
}


export function MapViewport() {
    const { isOpenModal, openModalMap } = useMap()
    const [coordinates, setCoordinates] = useState<ClickedPositionType | null>(null)
    const [reportZone, setReportZone] = useState<GetReportZoneType[] | null>(null)
    const [activeMarker, setActiveMarker] = useState<string | null>(null)

    useEffect(() => {
        const t = onValue(ref(db, 'reportZones'), (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                setReportZone([]);
                return;
            }
            const reportZones = Object.keys(data).map(key => ({
                key,
                ...data[key]
            })) as GetReportZoneType[];
            setReportZone(reportZones);
        });


    }, [])


    function handleAddZone(e: any) {

        const coordinatesValue = {
            lat: e.detail.latLng.lat,
            lng: e.detail.latLng.lng
        }

        setCoordinates(coordinatesValue)
        
        openModalMap()
    }

    return (
        <div>
            {isOpenModal && <ModalMapViewport coordinates={coordinates} />}

            <APIProvider apiKey={String(process.env.NEXT_PUBLIC_googleMapsApiKey)} onLoad={() => console.log('Maps API has loaded.')}>
                <Map onClick={(e) => handleAddZone(e)}
                    style={{ width: '100vw', height: '100vh' }}
                    defaultCenter={{ lat: -23.5489, lng: -46.6389 }}
                    defaultZoom={12}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    mapId={'250bc91d913d5ab2294fddba'}
                >
                    {reportZone && reportZone.map(zone => (
                        <PoiMarkers 
                        key={zone.key} 
                        zone={zone}
                        activeMarker={activeMarker}
                        setActiveMarker={setActiveMarker}
                        
                        />
                    ))}
                </Map>

            </APIProvider>
        </div>
    )
}