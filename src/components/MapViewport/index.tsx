'use client'
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { ModalMapViewport } from '../ModalMapViewport';
import { useMap } from '@/context/MapContext';
import { PoiMarkers } from '../PoiMarkers';
import { useState } from 'react';

interface Poi {
    key: string,
    location: google.maps.LatLngLiteral
}


export function MapViewport() {
    const { isOpenModal, openModalMap, getClickedPosition } = useMap()

    function handleAddZone(e: any) {

        const zone = {
            lat: e.detail.latLng.lat,
            lng: e.detail.latLng.lng
        }

        getClickedPosition(zone)
        
        openModalMap()
    }


    const App = () => (
        <APIProvider apiKey={String(process.env.NEXT_PUBLIC_googleMapsApiKey)} onLoad={() => console.log('Maps API has loaded.')}>
            <Map onClick={(e) => handleAddZone(e)}
                style={{ width: '100vw', height: '100vh' }}
                defaultCenter={{ lat: -23.5489, lng: -46.6389 }}
                defaultZoom={12}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId={'250bc91d913d5ab2294fddba'}
            >
                <PoiMarkers />
            </Map>

        </APIProvider>
    );

    return (
        <div>
            {isOpenModal && <ModalMapViewport />}
            <App />
        </div>
    )
}