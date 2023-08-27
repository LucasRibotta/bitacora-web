import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import { auth } from '../../firebaseConfig'
import { EyeFilledIcon } from './password/EyeFilledIcon.jsx'
import { EyeSlashFilledIcon } from './password/EyeSlashFilledIcon'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'

export default function Login () {
  const [user, loading, error] = useAuthState(auth)
  const googleAuth = new GoogleAuthProvider()
  const router = useRouter()

  const variants: ['underlined' | 'bordered' | 'flat' | 'faded' | undefined] = [
    'underlined'
  ]

  const loginAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth)
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
    }
  }

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
  }, [user, router])

  return (
    <div className='flex-col h-screen w-auto space-x-10 m-auto mt-5'>
      {variants.map(variant => (
        <div
          key={variant}
          className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'
        >
          <Input type='email' variant={variant} label='Email' />
        </div>
      ))}
      <Input
        label='Password'
        variant='bordered'
        placeholder='Enter your password'
        endContent={
          <button
            className='focus:outline-none'
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
      <div >
        {loading ? (
          <Button
            isLoading
            color='secondary'
            spinner={
              <svg
                className='animate-spin h-5 w-5 text-current'
                fill='none'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                />
                <path
                  className='opacity-75'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  fill='currentColor'
                />
              </svg>
            }
          >
            Loading
          </Button>
        ) : (
          <Button onClick={loginAuth} color='primary' variant='ghost'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-google'
              viewBox='0 0 16 16'
            >
              <path d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z' />
            </svg>
          </Button>
        )}
        {error && <p>Error al iniciar sesión: {error.message}</p>}
      </div>
    </div>
  )
}
