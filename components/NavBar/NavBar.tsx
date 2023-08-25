import React from 'react'
import { usePathname } from 'next/navigation'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button
} from '@nextui-org/react'

export default function NavBar () {
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
          {/*         <NavbarItem>
          <Link color='foreground' href='#'>
            Integrations
          </Link>
        </NavbarItem> */}
        </NavbarContent>
        {/*       <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link href='#'>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color='primary' href='#' variant='flat'>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent> */}
      </Navbar>
    )
  }
}
