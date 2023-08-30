/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import CardHome from '../Card/Card';

export default function Community() {
  const [bitacoraList, setBitacoraList] = useState([]);
  const [loading, setLoading] = useState(true);

  const bitacoraCollectionRef = collection(db, 'bitacoras');

  useEffect(() => {
    const getBitacoraList = async () => {
      try {
        const dataBitacora = await getDocs(bitacoraCollectionRef);
        const promises = dataBitacora.docs.map(async doc => {
          const bitacoraData = doc.data();
          const imageURLs = bitacoraData.image || [];
          const imageDownloadURLs = await Promise.all(imageURLs.map(async url => {
            return url;
          }));

          return {
            ...bitacoraData,
            id: doc.id,
            images: imageDownloadURLs,
          };
        });

        const resolvedBitacoraList = await Promise.all(promises);
        setBitacoraList(resolvedBitacoraList);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getBitacoraList();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-screen p-4">
      {loading ? (
        <p>Loading...</p>
      ) : bitacoraList.length === 0 ? (
        <p>No bitacoras available.</p>
      ) : (
        bitacoraList.map(bitacora => (
          <div className="px-6 py-4" key={bitacora.id}>
            <CardHome
              title={bitacora.title}
              description={bitacora.description}
              image={bitacora.images[0]}
            />
          </div>
        ))
      )}
    </div>
  );
}
