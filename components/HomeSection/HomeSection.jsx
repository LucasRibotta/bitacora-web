/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import CardHome from '../Card/Card';
import { Button } from '@nextui-org/react';

export default function HomeSection() {
  const [bitacoraList, setBitacoraList] = useState([]);
  const [loading, setLoading] = useState(true);

  const bitacoraCollectionRef = collection(db, 'bitacoras');

  useEffect(() => {
    const getBitacoraList = async () => {
      try {
        const dataBitacora = await getDocs(bitacoraCollectionRef);
        const filteredData = dataBitacora.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
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
    <div className="max-w-sm h-screen rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="border rounded-lg p-4 text-center">
          <img
            src="https://i.pinimg.com/564x/d1/00/65/d10065ecdc7ec3bbdc53fcacac738a46.jpg"
            alt="Nueva bitacora"
            className="max-w-full h-auto mx-auto"
          />
          <a href="/form">
            <Button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Añadir nueva tarjeta
            </Button>
          </a>
        </div>
      </div>

      {!loading &&
        bitacoraList.map(bitacora => {
          if (bitacora.userId === auth.currentUser.uid) {
            return (
              <div className="px-6 py-4" key={bitacora.id}>
                <CardHome
                  title={bitacora.title}
                  description={bitacora.description}
                  image={bitacora.image}
                />
              </div>
            );
          }
          return null;
        })}
    </div>
  );
}
