/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';

function BitacoraDetail({ bitacora }) {
  return (
    <div>
      <h1>{bitacora.title}</h1>
      <p>{bitacora.description}</p>
      <p>{bitacora.culture}</p>
      <div>
        <h2>{bitacora.notes}</h2>
        <h2>{bitacora.activitys}</h2>
      </div>
      <div>
        <img src={bitacora.image} alt="img" width={70} height={100} />
      </div>
      <div>
        <button onClick={() => deleteBitacora(bitacora.id)}>Eliminar Bitacora</button>
        <button>Editar Bitacora</button>
      </div>
    </div>
  );
}

export default function DetailSection() {
  const [bitacoraList, setBitacoraList] = useState([]);

  const bitacoraCollectionRef = collection(db, "bitacoras");

  useEffect(() => {
    const getBitacoraList = async () => {
      try {
        const dataBitacora = await getDocs(bitacoraCollectionRef);
        const filteredData = dataBitacora.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBitacoraList(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getBitacoraList();
  }, []);

  const deleteBitacora = async (id) => {
    const bitacoraDoc = doc(db, "bitacoras", id);
    await deleteDoc(bitacoraDoc);
    setBitacoraList(bitacoraList.filter(bitacora => bitacora.id !== id));
  };

  return (
    <div className="flex flex-wrap gap-4 h-screen">
      {bitacoraList.map((bitacora) => (
        <BitacoraDetail key={bitacora.id} bitacora={bitacora} />
      ))}
    </div>
  );
}