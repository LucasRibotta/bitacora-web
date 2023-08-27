import React from 'react'
import { usePathname } from 'next/navigation'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input
} from '@nextui-org/react'
import SearchBar from '../SearchBar/SearchBar'

export default function NavBarCommunity () {
  const pathname = usePathname()

  if (pathname === '/community') {
    return (
      <Navbar isBordered>
        <NavbarContent className='hidden sm:flex gap-3'>
          <NavbarItem>
            <Link color='foreground' href='/'>
              Inicio
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as='div' className='items-center' justify='end'>
          <Input
            classNames={{
              base: 'max-w-full sm:max-w-[10rem] h-10',
              mainWrapper: 'h-full',
              input: 'text-small',
              inputWrapper:
                'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20'
            }}
            placeholder='Type to search...'
            size='sm'
            startContent={<SearchBar />}
            type='search'
          />
        </NavbarContent>
      </Navbar>
    )
  }
}
