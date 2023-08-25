import React from 'react'

export default function InfoBasic () {
  return (
    <div className='flex flex-col h-50 w-50 m-auto py-7'>
      <div className='mb-5 text-start'>
        <label>Título del viaje: </label>
        <input type='text' name='titulo' />
      </div>
      <div className='mb-5 text-start'>
        <label>Fecha: </label>
        <input type='date' name='titulo' />
      </div>
      <div className='text-start mb-5'>
        <label>Ubicación: </label>
        <input type='text' name='titulo' />
      </div>
    </div>
  )
}
