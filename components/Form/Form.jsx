/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { db, auth, storage } from '@/firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list
} from 'firebase/storage'
import UploadImg from '../UploadImg/UploadImg';
import { useRouter } from 'next/navigation'


export default function Form() {
  const [newBitacoraTitle, setNewBitacoraTitle] = useState('')
  const [id, setId] = useState('');
  const [date, setDate] = useState(0)
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [culture, setCulture] = useState('')
  const [notes, setNotes] = useState('')
  const [newActivity, setNewActivity] = useState('')
  const [activitys, setActivitys] = useState([])
  const [successMessage, setSuccessMessage] = useState(false)
  const [imageUpload, setImageUpload] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imagePrev, setImagePrev] = useState([]);
  const router = useRouter()


  const addActivity = () => {
    if (newActivity.trim() !== '') {
      setActivitys([...activitys, newActivity])
      setNewActivity('')
    }
  }

  const bitacoraColecctionRef = collection(db, 'bitacoras-web')

  const onSubmitBitacora = async () => {
    if (
      !newBitacoraTitle.trim() ||
      date === 0 ||
      !description.trim() ||
      !culture.trim() ||
      !notes.trim() ||
      activitys.length === 0 ||
      imageUrls.length === 0
    ) {
      alert("Por favor completa todos los campos antes de enviar el formulario.");
      return;
    }
    try {
      const newId = uuidv4();
      setId(newId);
      await addDoc(bitacoraColecctionRef, {
        id: newId,
        title: newBitacoraTitle,
        date: date,
        location: location,
        description: description,
        culture: culture,
        notes: notes,
        activitys: activitys,
        image: imageUrls,
        userId: auth?.currentUser?.uid
      })
      setSuccessMessage(true)
      router.push('/home')
    } catch (error) {
      console.error(error)
    }
  }

  const onImageUpload = (uploadedImageUrls) => {
    setImageUrls(uploadedImageUrls); 
  };

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage(false)
      }, 3000)

      return () => clearTimeout(timeout)
    }

  }, [successMessage, router])


  return (
    <div className='flex h-screen w-auto bg-lime-200 justify-center items-center'>
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
              placeholder='Ubicación'
              onChange={e => setLocation(e.target.value)}
            />
            <textarea
              placeholder='Descripción'
              onChange={e => setDescription(e.target.value)}
            />
            <textarea
              placeholder='Cultura'
              onChange={e => setCulture(e.target.value)}
            />
            <textarea
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

          {/* <input
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
          </Button> */}
          <UploadImg parentId={id} onImageUpload={onImageUpload} />
        </form>
      </div>
      {/* <div className='flex flex-col items-center md:items-start md:mt-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {imagePrev.map(url => (
            <img key={url} src={url} height={70} width={100} alt='image' />
          ))}
        </div>
      </div> */}
    </div>


  )
}
