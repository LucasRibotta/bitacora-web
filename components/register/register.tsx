import React, { useState } from 'react'
import { Button } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import { auth } from '../../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { EyeFilledIcon } from '../Login/password/EyeFilledIcon.jsx'
import { EyeSlashFilledIcon } from '../Login/password/EyeSlashFilledIcon'

export default function RegistroUsuario () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleRegistro = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      const userData = {
        birthdate: birthdate,
        phone: phone
      }

      console.log('Usuario registrado:', user)
      router.push('/login')
    } catch (error) {
      console.error('Error al registrar usuario:', error)
    }
  }

  return (
    <div className='flex-col h-screen max-w-xs  m-auto'>
      <div className='py-10 space-y-2 justify-center justify-items-center'>
        <Input
          type='email'
          label='Email'
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          label='Contraseña'
          variant='bordered'
          placeholder='Ingresar contraseña'
          onChange={e => setPassword(e.target.value)}
          endContent={
            <button
              className='focus:outline-none mb-7'
              type='button'
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              ) : (
                <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          className='max-w-xs'
        />
        <Input
          label='Fecha de nacimiento:'
          placeholder='Fecha de nacimiento '
          type='date'
          onChange={e => setBirthdate(e.target.value)}
        />
        <Input
          label='Teléfono'
          type='tel'
          onChange={e => setPhone(e.target.value)}
        />
      </div>
      {error && <p>Error al registrar usuario: {error}</p>}
      <div className='flex flex-row space-x-2.5'>
        <Button onClick={handleRegistro} color='primary' variant='ghost'>
          Registrarse
        </Button>
      </div>
    </div>
  )
}
