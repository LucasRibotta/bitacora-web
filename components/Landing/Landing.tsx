/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import landingImg from '@/assets/Landing.jpg'
import Login from '../Login/Login'

export default function Landing () {
  return (
    <div className='flex flex-col justify-center text-center w-50 h-50 m-auto mt-5'>
      <h1 className='text-lg'>Bienvenidos a tu Bitacora Web</h1>
      <div className='flex flex-row  m-auto mt-7 space-x-2'>
        <p className='font-semibold text-base text-start m-auto mr-7 max-w-sm'>
          Descubre una nueva forma de capturar y revivir tus aventuras con
          nuestra innovadora aplicación de bitácora de viajes. Registra tus
          experiencias en cada destino, desde playas exóticas hasta majestuosas
          montañas, a través de fotos, historias y momentos destacados. Nuestra
          plataforma te permite crear y compartir fácilmente tus recuerdos más
          preciados con amigos y familiares. Con un diseño intuitivo y funciones
          inteligentes, organiza tus viajes, encuentra inspiración para nuevas
          travesías y conecta con una comunidad de entusiastas viajeros.
          Experimenta cada paso de tu viaje nuevamente mientras te sumerges en
          tus propias aventuras con nuestra bitácora de viajes. ¡Empieza a crear
          tus memorias inolvidables hoy mismo!
        </p>
        <Image src={landingImg} alt='imagen' width={300} height={200} />
      </div>
      <div className='m-auto mt-7'>
        <Login />
      </div>
    </div>
  )
}
