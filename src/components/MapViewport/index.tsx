'use client'
import { APIProvider, Map } from '@vis.gl/react-google-maps';


export function MapViewport() {

    const App = () => (
        <APIProvider apiKey={String(process.env.NEXT_PUBLIC_googleMapsApiKey)} onLoad={() => console.log('Maps API has loaded.')}>
            <Map
                style={{ width: '100vw', height: '100vh' }}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                defaultZoom={3}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            />
        </APIProvider>
    );

    return (
        <div>
            <App />
        </div>
    )
}