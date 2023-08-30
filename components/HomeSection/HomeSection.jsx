/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConfig';
import { getDocs, collection, query, where } from 'firebase/firestore';
import CardHome from '../Card/Card';
import { Button } from '@nextui-org/react';

export default function HomeSection() {
  const [bitacoraList, setBitacoraList] = useState([]);
  const [loading, setLoading] = useState(true);

  const bitacoraCollectionRef = collection(db, 'bitacoras');

  useEffect(() => {
    const getBitacoraList = async () => {
      try {
        if (!auth.currentUser) {
          console.log("Usuario no autenticado.");
          return;
        }

        const q = query(
          bitacoraCollectionRef,
          where('userId', '==', auth.currentUser.uid)
        );

        console.log("Consulta:", q); 

        const dataBitacora = await getDocs(q);
        const filteredData = dataBitacora.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        console.log("Bitácoras filtradas:", filteredData); 

        setBitacoraList(filteredData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getBitacoraList();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-screen p-4 bg-slate-50">
      {bitacoraList.length === 0 ? (
        <div className="border rounded-lg p-4 text-center">
          <img
            src="https://i.pinimg.com/564x/c8/bf/e0/c8bfe06a152bc6a6611182c26f719e84.jpg"
            alt="Nueva bitacora"
            className="max-w-full h-auto mx-auto"
          />
          <a href="/form">
            <Button className="mt-4 px-4 py-2 bg-lime-700 text-white rounded">
              Añadir nueva tarjeta
            </Button>
          </a>
        </div>
      ) : (
        bitacoraList.map(bitacora => (
          <div className="px-6 py-4" key={bitacora.id}>
            <CardHome
              title={bitacora.title}
              description={bitacora.description}
              image={bitacora.image}
            />
          </div>
        ))
      )}
    </div>
  );
}
