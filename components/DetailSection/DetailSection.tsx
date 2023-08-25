import React from 'react'
import { Tabs, Tab } from '@nextui-org/react'

export default function DetailSection () {
  const colors : ["default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined] = [
    'default'
  ]

  return (
    <div className='flex flex-wrap gap-4'>
      {colors.map(color => (
        <Tabs key={color} color={color} aria-label='Tabs colors' radius='full'>
          <Tab key='photos' title='Photos' />
          <Tab key='music' title='Music' />
          <Tab key='videos' title='Videos' />
        </Tabs>
      ))}
    </div>
  )
}
