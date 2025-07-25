'use client'
import L from 'leaflet';
import './style.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import ReactDOMServer from 'react-dom/server';
import { AiFillAndroid } from "react-icons/ai";

import 'leaflet/dist/leaflet.css';

export function ContainerMap() {
    const markerIcon = new L.DivIcon({
        html: ReactDOMServer.renderToString(
          <AiFillAndroid size={30} />
        ),
        className: 'custom-react-icon', 
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
      });

    return (
        <div className="container-map">
            <div className="container-map-container">
                <MapContainer
                 center={[-23.5505, -46.6333]} 
                 zoom={13} 
                 style={{ height: '100vh', width: '100%' }}
                 >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[-23.5505, -46.6333]} icon={markerIcon}>
                        <Popup>Local seguro aqui!</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )

} 