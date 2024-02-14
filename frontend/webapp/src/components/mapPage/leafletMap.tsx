import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

interface LeafletMapProps {
  position: [number, number]
  zoom: number
}

export default function leafletMap({position, zoom } : LeafletMapProps) {

  return (
    <MapContainer
      center={position} zoom={zoom}
      scrollWheelZoom={false}
      style={{height: '400px', width: '100%', zIndex: 10}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
