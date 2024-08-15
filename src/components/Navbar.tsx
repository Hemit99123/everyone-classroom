"use client";
import React from "react";
import { useRouter } from 'next/navigation';
import {
  Box,
  Flex,
  Button,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import axios from "axios";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const handleLogOut = async () => {
    await axios.post('/api/auth/logout').then(result => {
      if (result.data.success === true) {
        alert('Logged out');
      } else {
        alert('You are not signed in!')
      }
    });
  };

  const handleRedirect = (link: string) => {
    window.location.href = link
  }

  return (
    <Box width='100%' px={5}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box onClick={() => { router.replace('/'); }} cursor={'pointer'}>
          <Image alt="Logo" src="/logo.png" height={50} width={50} />
        </Box>

        <Flex alignItems={'center'} flex={1} justifyContent={'center'}>
          <Stack direction={'row'} spacing={10} alignItems={'center'}>
            <Button onClick={() => handleRedirect('/login')} variant={'link'}>Login</Button>
            <Button onClick={() => handleRedirect('/dashboard')} variant={'link'}>Dashboard</Button>
            <Button variant={'link'} onClick={handleLogOut}>
              Logout
            </Button>

            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
