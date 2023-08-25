/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Button } from '@nextui-org/react'

export default function CardHome () {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      <img
        className='w-full'
        src='https://i.pinimg.com/564x/6c/27/e8/6c27e848220591783d6e21247bf7d301.jpg'
        alt='Sunset in the mountains'
      />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>The Coldest Sunset</div>
        <p className='text-gray-700 text-base'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
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
