/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseConfig';
import { useParams } from 'next/navigation'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';


export default function DetailSection() {
  const [data, setData] = useState()
  const params = useParams()

  const info = data && data.find(el => el.id === params.id)


  const getBitacora = async (id) => {
    try {
      const bitacoraDoc = await doc(db, "bitacoras", params.id);
      setData(bitacoraDoc)

    } catch (error) {
      alert('Error en la bitacora')
    }
  }

  const bitacoraCollectionRef = collection(db, "bitacoras");

  useEffect(() => {
    const getBitacoraList = async () => {
      try {
        const dataBitacora = await getDocs(bitacoraCollectionRef);
        const filteredData = dataBitacora.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getBitacoraList();
  }, []);


  return (
    <div className="flex flex-wrap gap-4 min-h-screen">

        <div
          key={info.id}
          className="bg-slate-50 border p-4 rounded-md shadow-md justify-center h-screen w-auto m-auto"
        >
          <h1 className="text-xl text-green-600 font-bold mb-2">{info?.title}</h1>
          <p className="text-lime-500 font-semibold mb-2">{info?.description}</p>
          <p className="text-lime-700 font-semibold mb-4">{info?.culture}</p>
          <div className="mb-4">
            <h2 className="font-semibold mb-1 underline">Notas:</h2>
            <p>{info?.notes}</p>
            <h2 className="font-semibold my-3 underline">Actividades:</h2>
            <div className="grid grid-cols-2 gap-2">
              {info?.activitys.map((activity, index) => (
                <p key={index} className="text-gray-600">
                  {activity}
                </p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 justify-center">
            {info?.image.map((imageUrl, index) => (
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
    </div>
  );
} 

