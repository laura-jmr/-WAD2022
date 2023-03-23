import React, { useState, useEffect } from 'react';
import api from '../api'

export default function Adressbook({ adresses, adminView }) {
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
        <li key={address.id}>
          <a>{address.name}</a>
        </li>
      ));

      return (
        <ul className="locations" id="map-address-list">
            {mappedAddresses}
        </ul>
      );
}
