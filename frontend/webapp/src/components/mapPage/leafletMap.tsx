import React from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMap
} from "react-leaflet"
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Deal } from "@/types";

interface LeafletMapProps {
  curPosition: [number, number]
  centerPos: [number, number]
  zoom: number
  deals: Deal[]
  style: React.CSSProperties
  handleMapMarkerClick: (index: number) => void
}

function MapUpdater({ centerPos }: { centerPos: [number, number] }) {
  const map = useMap();

  React.useEffect(() => {
    map.flyTo(centerPos);
  }, [centerPos, map]);

  return null;
}

export default function leafletMap(
    {curPosition, centerPos, zoom, deals, style, handleMapMarkerClick } : LeafletMapProps) {
  const myLocationIcon = new Icon({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    iconSize: [33, 33],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <MapContainer
      center={centerPos}
      zoom={zoom}
      scrollWheelZoom={true}
      // style={{height: '400px', width: '100%', zIndex: 10}}
      style={style}
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
      {deals?.map((deal, index) => {
        if (!deal.longlat[0]) return null;
        return (
          <Marker
            key={deal.id}
            position={[parseFloat(deal.longlat[0][1]), parseFloat(deal.longlat[0][0])]}
            eventHandlers={{
              click: () => handleMapMarkerClick(index)
            }}
          >
            <Popup maxHeight={300}>
              {deal.title}
            </Popup>
          </Marker>
        )
      })}
      <MapUpdater centerPos={centerPos} />
    </MapContainer>
  );
}
