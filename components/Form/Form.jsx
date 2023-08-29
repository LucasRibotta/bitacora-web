/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { db, auth, storage } from '@/firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list
} from 'firebase/storage'
import { v4 } from 'uuid'
import { useRouter } from 'next/navigation'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function Form() {
  const [newBitacoraTitle, setNewBitacoraTitle] = useState('')
  const [date, setDate] = useState(0)
  const [description, setDescription] = useState('')
  const [culture, setCulture] = useState('')
  const [notes, setNotes] = useState('')
  const [newActivity, setNewActivity] = useState('')
  const [activitys, setActivitys] = useState([])
  const [successMessage, setSuccessMessage] = useState(false)
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [markerPosition, setMarkerPosition] = useState([0, 0])
  const router = useRouter()


  const addActivity = () => {
    if (newActivity.trim() !== '') {
      setActivitys([...activitys, newActivity])
      setNewActivity('')
    }
  }

  const bitacoraColecctionRef = collection(db, 'bitacoras')

  const onSubmitBitacora = async () => {
    try {
      await addDoc(bitacoraColecctionRef, {
        title: newBitacoraTitle,
        date: date,
        location: markerPosition,
        description: description,
        culture: culture,
        notes: notes,
        activitys: activitys,
        image: imageUpload,
        userId: auth?.currentUser?.uid
      })
      setSuccessMessage(true)
      router.push('/home') 
    } catch (error) {
      console.error(error)
    }
  }

  const imagesListRef = ref(storage, "imagesBitacoras/");
  const uploadFiles = () => {
    if (imageUpload.length === 0) return;

    imageUpload.forEach((file) => {
      const imageRef = ref(storage, `imagesBitacoras/${file.name + v4()}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });

    setImageUpload([]);
  };

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage(false)
      }, 3000)

      return () => clearTimeout(timeout)
    }
      
  }, [successMessage, router])

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, [])

  return (
    <div className='flex h-screen w-auto justify-center items-center'>
      <div className='w-1/2 mr-5'>
        <h1 className='mb-5 text-2xl font-bold'>Crear Nueva Bitácora</h1>
        <form className='flex flex-col'>
          <div className='flex flex-col space-y-2'>
            <input
              type='text'
              placeholder='Título'
              onChange={e => setNewBitacoraTitle(e.target.value)}
            />
            <input
              type='date'
              placeholder='Fecha'
              onChange={e => setDate(e.target.valueAsNumber)}
            />
            {/*         <input
            type='text'
            placeholder='Ubicación'
            value={`${latitude}, ${longitude}`}
            onChange={e => {
              const [lat, lng] = e.target.value.split(', ')
              setLatitude(parseFloat(lat))
              setLongitude(parseFloat(lng))
            }}
          /> */}
            <input
              type='text'
              placeholder='Descripción'
              onChange={e => setDescription(e.target.value)}
            />
            <input
              type='text'
              placeholder='Cultura'
              onChange={e => setCulture(e.target.value)}
            />
            <input
              type='text'
              placeholder='Notes'
              onChange={e => setNotes(e.target.value)}
            />

            <input
              type='text'
              placeholder='Actividad'
              value={newActivity}
              onChange={e => setNewActivity(e.target.value)}
            />
            <button type='button' onClick={addActivity}>
              Agregar Actividad
            </button>

            <ul>
              {activitys.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>

          <input
            type='file'
            placeholder='Imagenes'
            multiple
            onChange={(event) => {
              const selectedFiles = Array.from(event.target.files);
              setImageUpload(selectedFiles);
            }}
          />
          <Button color='success' onClick={uploadFiles}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-camera'
              viewBox='0 0 16 16'
            >
              <path d='M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z' />
              <path d='M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z' />
            </svg>
            Cargar Imagenes
          </Button>
          <Button className='mt-4' color='success' variant='shadow' onClick={onSubmitBitacora}>
            Enviar
          </Button>
        </form>
      </div>
      <div className='flex flex-col items-center md:items-start md:mt-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {imageUrls.map(url => (
            <img key={url} src={url} height={70} width={100} alt='image' />
          ))}
        </div>
      </div>
    </div>


  )
}
{/*    <MapContainer
        center={markerPosition}
        zoom={10}
        style={{ height: '400px' }}
        whenCreated={mapInstance => {
          mapInstance.on('click', e => {
            const { lat, lng } = e.latlng
            setMarkerPosition([lat, lng])
          })
        }}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Marker position={markerPosition}>
          <Popup>Coordenadas: {markerPosition.join(', ')}</Popup>
        </Marker>
      </MapContainer> */}