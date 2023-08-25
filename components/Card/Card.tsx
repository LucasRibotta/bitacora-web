import React from 'react'
import { Card, CardFooter, Image, Button } from '@nextui-org/react'

export default function CardHome () {
  return (
    <Card isFooterBlurred radius='lg' className='border-none'>
      <Image
        alt='Woman listing to music'
        className='object-cover'
        height={200}
        src='https://i.pinimg.com/564x/6c/27/e8/6c27e848220591783d6e21247bf7d301.jpg'
        width={200}
      />
      <CardFooter className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
        <p className='text-tiny text-white/80'>Available soon.</p>
        <a href="/detail">
        <Button
          className='text-tiny text-white bg-black/20'
          variant='flat'
          color='default'
          radius='lg'
          size='sm'
        >
          Detalle
        </Button>
        </a>
      </CardFooter>
    </Card>
  )
}
