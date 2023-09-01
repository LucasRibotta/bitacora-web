/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Button } from '@nextui-org/react'
import Link from 'next/link';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";


export default function CardHome({ id, userId, title, location, image }) {

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h1 className="text-tiny uppercase font-bold">{title}</h1>
        <h3 className="font-bold text-large">{location}</h3>
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
        <Link href={`/detail/${id}`}>
          <Button
            radius='full'
            className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'
          >
            Detalle
          </Button>
        </Link>
      </div>
    </Card>
  )
}