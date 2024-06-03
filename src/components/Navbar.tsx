"use client";
import React from "react";
import {useRouter} from 'next/navigation'
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter();
  const { data: session, status }: any = useSession();
  return (
    <>
    {/* Set the Box component width to '100%' to make it take up the entire viewport */}
    <Box bg={useColorModeValue('gray.100', 'gray.900')} width='100%' px={5}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box onClick={() => {router.replace('/')}} cursor={'pointer'}>
          {colorMode === 'dark' &&
            <img src="/logo_white.png" width={50} height={50}/>
          }
          {colorMode === 'light' &&
            <img src="/logo_black.png" width={50} height={50}/>
          }
        </Box>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Menu>
              {status !== 'unauthenticated' && (
                <>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Avatar
                      size={'sm'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <br />
                    <Center>
                      <Avatar
                        size={'2xl'}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{session?.user.name }</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    {session?.user.isAdmin === true &&
                    <MenuItem onClick={() => router.push('/admin')}>Admin Portal</MenuItem>
                    }
                    <Link href={'/'}>
                      <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                    </Link>

                  </MenuList>
                </>
              )}
              {status === 'unauthenticated' && (
                <Center>
                  <Text mr={2} fontSize='17' onClick={() => router.replace('/register')} cursor={'pointer'}>
                    Register
                  </Text>
                  <Text fontSize='17' onClick={() => router.replace('/login')} cursor={'pointer'}>
                    Login
                  </Text>
                </Center>
              )}
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  </>
  )
}