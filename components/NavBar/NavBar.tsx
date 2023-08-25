import React from 'react'
import { usePathname } from 'next/navigation'
import { auth } from '../../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react'

export default function NavBar () {
  const [user] = useAuthState(auth)
  const router = useRouter();

  const logout = async () => {
    try {
      await auth.signOut()
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión', error)
    }
  }
  const pathname = usePathname()

  if (pathname !== '/' && pathname !== '/login' && pathname !== '/register') {
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
              <p>No has iniciado sesión.</p>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    )
  }
}
