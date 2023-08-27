import React from 'react'
import { usePathname } from 'next/navigation'
import { auth } from '../../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button
} from '@nextui-org/react'

export default function NavBar () {
  const [user] = useAuthState(auth)
  const router = useRouter()

  const logout = async () => {
    try {
      await auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Error al cerrar sesión', error)
    }
  }
  const pathname = usePathname()

  if (pathname !== '/' && pathname !== '/login' && pathname !== '/register' && pathname !== '/community') {
    return (
      <Navbar>
        <NavbarBrand>
          <h2>LOGO</h2>
        </NavbarBrand>
        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          <NavbarItem>
            <Link color='foreground' href='/home'>
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href='/form' aria-current='page'>
              Agregar nueva bitacora
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify='end'>
          <NavbarItem className='hidden lg:flex'>
            {user ? (
              <Button onClick={logout} variant='ghost'>
                Cerrar sesión
              </Button>
            ) : (
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
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    )
  }
}
