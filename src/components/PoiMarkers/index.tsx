import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps"

interface Poi {
    key: string,
    location: google.maps.LatLngLiteral
}

export function PoiMarkers() {

    const locations: Poi[] = [
        { key: 'operaHouse', location: { lat: -23.54100037, lng: -46.36899948  } },
    ]

    return (
        <>
            {locations.map(location => 
                <AdvancedMarker
                    key={location.key}
                    position={location.location}
                >
                    <Pin  background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            )}
        </>
    )
}