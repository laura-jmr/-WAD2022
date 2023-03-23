import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";

export default function Map() {
  const berlinPos = [52.52, 13.40];
  const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const addressBookResponse = await fetch('http://localhost:3000/susLocs', {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            });
            const addressbook = await addressBookResponse.json();
            setAddresses(addressbook);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, []);

      const mappedAddresses = addresses.map(address => (
        <Marker key={address.id} position={[address.lat, address.lon]}>
  <Popup>
    <span>{address.street}</span>
  </Popup>
</Marker>
      ));

  //var adresses = getAllAddresses();
  //console.log(adresses)

  const adresses = [{ id: "63bd461f56d343d343305d12", lat: 52.5287, lon: 13.3882}, { id: "63bd461f56d343d343305d16", lat: 52.5089808, lon: 13.3206558}]
  const displayAdresses = adresses.map((adress) => <Marker key={adress.id} position={[adress.lat, adress.lon]}>
  <Popup>
    <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
  </Popup>
</Marker>);
  return (
    <>
    <MapContainer center={berlinPos} zoom={12}scrollWheelZoom={false}>
      <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />

        <ul>
        {mappedAddresses}
        </ul>
      </MapContainer>
    </>
  );
}
