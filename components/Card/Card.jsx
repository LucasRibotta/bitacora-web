/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Button } from '@nextui-org/react'
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";


export default function CardHome({ id, userId, title, location, image }) {

  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h1 className="text-tiny uppercase font-bold">{title}</h1>
        <h4 className="font-bold text-large">{location}</h4>
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
        <a href={`/detail?id=${id}`}>
          <Button className="mt-4 px-4 py-2 bg-lime-700 text-white rounded">
            Detalle
          </Button>
        </a>

      </div>
    </Card>
  )
}