import React from 'react'


export default function Notes () {

  return (
    <div className='w-50 flex flex-col gap-4'>
      <label>Notas Personales:</label>
      <textarea name="notas" rows="4" />

      <label>Consejos utiles:</label>
      <textarea name="consejos" rows="4" />
    </div>
  )
}
