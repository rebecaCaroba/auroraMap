'use client'
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { FormEvent, useState } from 'react';
import { ModalMapViewport } from '../ModalMapViewport';
import { useMap } from '@/context/MapContext';


export function MapViewport() {
    const { isOpenModal, openModalMap } = useMap()

    function handleAddZone(e: any) {
    
        const clickedPosition = {
            lat: e.detail.latLng.lat,
            lng: e.detail.latLng.lng
        }
        
        openModalMap()   
    }

    const App = () => (
        <APIProvider apiKey={String(process.env.NEXT_PUBLIC_googleMapsApiKey)} onLoad={() => console.log('Maps API has loaded.')}>
            <Map onClick={(e) => handleAddZone(e)}
                style={{ width: '100vw', height: '100vh' }}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                defaultZoom={10}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                center={{lat: -23.5505, lng: -46.6333}}
            />
        </APIProvider>
    );

    return (
        <div>
            {isOpenModal && <ModalMapViewport />}
            <App />
        </div>
    )
}