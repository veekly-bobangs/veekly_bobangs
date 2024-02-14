import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
} from "react-leaflet"
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Deal } from "@/types";
import { DealCard } from "../common";

interface LeafletMapProps {
  curPosition: [number, number]
  zoom: number
  deals: Deal[]
}

export default function leafletMap({curPosition, zoom, deals } : LeafletMapProps) {
  const myLocationIcon = new Icon({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    iconSize: [33, 33],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <MapContainer
      center={curPosition} zoom={zoom}
      scrollWheelZoom={true}
      style={{height: '400px', width: '100%', zIndex: 10}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={curPosition} icon={myLocationIcon}>
        <Popup>
          You are here
        </Popup>
      </Marker>
      {deals?.map((deal) => (
        <Marker key={deal.id} position={[parseFloat(deal.longlat[0][1]), parseFloat(deal.longlat[0][0])]}>
          <Popup maxHeight={300}>
            <DealCard deal={deal} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
