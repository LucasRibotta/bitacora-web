import Reac, { useState } from 'react'
import InfoBasic from './InfoBasic/InfoBasic'
import Desciption from './Description/Desciption'
import Culture from './Culture/Culture'
import Activitys from './Activitys/Activitys'
import Notes from './Notes/Notes'
import Multimedia from './Multimedia/Multimedia'

const steps = [
  <InfoBasic key='info' />,
  <Desciption key='description' />,
  <Culture key='culture' />,
  <Notes key='notes' />,
  <Activitys key='activity' />,
  <Multimedia key='multimedia' />
]

export default function Form () {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
      setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className='w-auto h-screen m-auto text-center justify-center'>
      <h1>Crear Nueva Bitácora</h1>
      <form onSubmit={(event) => handleSubmit(event) }>
        {steps.map((step, index) => (
          <div
            key={index}
            style={{ display: index === currentStep ? 'block' : 'none' }}
          >
            {step}
          </div>
        ))}

        {currentStep > 0 && <button onClick={handlePrevious}>Anterior</button>}
        {currentStep < steps.length - 1 ? (
          <button onClick={handleNext}>Siguiente</button>
        ) : (
          <button type='submit'>Guardar Bitácora</button>
        )}
      </form>
    </div>
  )
}
