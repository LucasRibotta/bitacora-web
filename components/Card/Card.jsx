/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Button } from '@nextui-org/react'
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";


export default function CardHome({ id, userId, title, description, image }) {

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h1 className="text-tiny uppercase font-bold">{title}</h1>
        <h4 className="font-bold text-large">{description}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <img
          alt="img"
          className="object-cover rounded-xl"
          src={image}
          width={270}
        />
      </CardBody>
      <div className="flex justify-center py-4">
        <a href='/detail'>
          <Button
            radius='full'
            className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'
          >
            Detalle
          </Button>
        </a>
      </div>
    </Card>
  )
}
