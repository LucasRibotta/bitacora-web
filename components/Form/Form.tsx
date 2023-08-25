import Reac, { useState } from 'react'
import InfoBasic from './InfoBasic/InfoBasic'
import Desciption from './Description/Desciption'
import Culture from './Culture/Culture'
import Activitys from './Activitys/Activitys'
import Notes from './Notes/Notes'
import Multimedia from './Multimedia/Multimedia'

export default function Form () {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <InfoBasic />
      case 2:
        return <Desciption />
      case 3:
        return <Culture />
      case 4:
        return <Notes />
      case 5:
        return <Activitys />
      case 6:
        return <Multimedia />
      default:
        return null
    }
  }

  return (
    <div className='w-auto h-screen m-auto text-center justify-center'>
      <h1>Crear Nueva Bitácora</h1>
      <form>
        {renderStep()}

        {currentStep > 1 && (
          <button onClick={() => setCurrentStep(currentStep - 1)}>
            Anterior
          </button>
        )}
        {currentStep < 5 ? (
          <button onClick={handleNext}>Siguiente</button>
        ) : (
          <button type='submit'>Guardar Bitácora</button>
        )}
      </form>
    </div>
  )
}
