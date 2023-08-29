import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'

interface TypeCard {
  tittle: string,
  description: string,
}

export default function Community ({tittle, description}: TypeCard) {


  return (
    <div>
      <h1>Comunidad</h1>
    </div>
  )
}
