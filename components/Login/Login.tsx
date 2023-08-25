import React, { useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { auth } from '../../firebaseConfig'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'

export default function Login () {
  const [user, loading, error] = useAuthState(auth)
  const googleAuth = new GoogleAuthProvider()
  const router = useRouter()

  const loginAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuth)
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
    }
  }

  useEffect(() => {
   
    if (user) {
      router.push('/home')
    }
  }, [user, router])

  return (
    <div className='flex-row space-x-10 m-auto mt-5'>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Button onClick={loginAuth} color='primary' variant='ghost'>
          Iniciar
        </Button>
      )}
      {error && <p>Error al iniciar sesión: {error.message}</p>}
    </div>
  )
}
