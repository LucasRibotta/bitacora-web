'use client'
import Image from 'next/image'
import { Button } from '@nextui-org/react'

export default function Home () {
  return (
    <main>
      <div>
        <h1>Bienvenidos a tu Bitacora Web</h1>
        <img
          src='https://i.pinimg.com/564x/f1/30/5e/f1305e78ee0f1312a5cccc1389d59de3.jpg'
          alt='imagen'
          width={100}
          height={100}
        />
        <div>
          <p>descripcion</p>
          <a href='/login'>
            <Button color='primary' variant='shadow'>
              Ingreso
            </Button>
          </a>
        </div>
      </div>
    </main>
  )
}
