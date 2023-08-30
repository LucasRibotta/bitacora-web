/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { useRouter } from 'next/navigation'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';

function BitacoraDetail({ bitacora, setBitacoraList }) {
  const router = useRouter()
  const deleteBitacora = async (id) => {
    try {
      const bitacoraDoc = doc(db, "bitacoras", id);
      await deleteDoc(bitacoraDoc);

      setBitacoraList(prevBitacoras =>
        prevBitacoras.filter(item => item.id !== id)
      );

      alert("Bitácora eliminada con éxito");
      router.push('/home')
    } catch (error) {
      console.error("Error al eliminar la bitácora:", error);
    }
  };

  return (
    <div className="bg-slate-50 border p-4 rounded-md shadow-md justify-center h-screen w-auto m-auto">
      <h1 className="text-xl text-green-600 font-bold mb-2">{bitacora.title}</h1>
      <p className="text-lime-500 font-semibold mb-2">{bitacora.description}</p>
      <p className="text-lime-700 font-semibold mb-4">{bitacora.culture}</p>
      <div className="mb-4">
        <h2 className="font-semibold mb-1 underline">Notas:</h2>
        <p>{bitacora.notes}</p>
        <h2 className="font-semibold my-3 underline">Actividades:</h2>
        <div className="grid grid-cols-2 gap-2">
          {bitacora.activitys.map((activity, index) => (
            <p key={index} className="text-gray-600">
              {activity}
            </p>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 justify-center">
        {bitacora.image.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
            className="w-full h-[300px] object-cover rounded"
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded mr-2"
          onClick={() => deleteBitacora(bitacora.id)}
        >
          Eliminar Bitácora
        </button>
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


  return (
    <div className="flex flex-wrap gap-4 min-h-screen">
      {bitacoraList.map((bitacora) => (
        <BitacoraDetail key={bitacora.id} bitacora={bitacora} />
      ))}
    </div>
  );
}