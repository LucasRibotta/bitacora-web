/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { db } from '../../firebaseConfig'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'

export default function DetailSection() {
  const colors = ['default']

  const [bitacoraList, setBitacoraList] = useState([])

  const bitacoraColecctionRef = collection(db, "bitacoras");

  useEffect(() => {
    const getBitacroaList = async () => {
      try {
        const dataBitacora = await getDocs(bitacoraColecctionRef)
        const filteredData = dataBitacora.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
        setBitacoraList(filteredData)
      } catch (error) {
        console.error(error)
      }
    }
    getBitacroaList()
  }, [])

  const deleteBitacora = async (id) => {
    const bitacoraDoc = doc(db, "bitacoras", id)
    await deleteDoc(bitacoraDoc)
  }

  return (
    <div className='flex flex-wrap gap-4 h-screen'>
      {bitacoraList.map((bitacora) => (
        <div key={bitacora.id}>
          <h1>{bitacora.title}</h1>
          <p>{bitacora.description}</p>
          <p>{bitacora.culture}</p>
          <div>
            <h2>{bitacora.notes}</h2>
            <h2>{bitacora.activitys}</h2>
          </div>

          <div>
            <img  src={bitacora.image} alt="img" width={30} height={50}/>
          </div>

          <div>
            <button onClick={deleteBitacora(bitacora.id)}>Eliminar Bitacora</button>
            <button>Editar Bitacora</button>
          </div>
        </div>

      ))}


    </div>
  )
}
