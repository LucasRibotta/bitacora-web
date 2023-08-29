/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Button } from '@nextui-org/react'


export default function CardHome ({id, userId, title, description, image}) {

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      <h1>{title}</h1>
      <p>{description}</p>
      <img src={image} alt="Imagen" />
      <div className='pt-3 m-auto justify-end items-end'>
        <a href='/detail'>
          <Button
            radius='full'
            className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'
          >
            Detalle
          </Button>
        </a>
      </div>
    </div>
  )
}
