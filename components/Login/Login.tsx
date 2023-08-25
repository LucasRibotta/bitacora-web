import React from 'react'
import { Input } from '@nextui-org/react'

export default function Login () {
  return (
    <div className='flex flex-col m-auto mt-10 h-50 w-50 justify-center content-center'>
      <Input
        isClearable
        type='email'
        label='Email'
        variant='bordered'
        placeholder='Enter your email'
        defaultValue='junior@nextui.org'
        onClear={() => console.log('input cleared')}
        className='max-w-xs'
      />
    </div>
  )
}
