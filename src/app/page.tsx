'use client';
import React from 'react';
import {  Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Hero = () => {
  // hero page for main route
  const router = useRouter();

  return (
    <Flex
      align="center"
      justify="center" // Center horizontally
      minH="70vh"
      px={8}
      mb={16}
      textAlign="center" // Center text horizontally
    >
      <Stack
        spacing={4}
        w={{ base: '80%', md: '60%' }} // Adjust width if needed
        align="center" // Center content inside Stack
      >
        <Heading
          as="h1"
          size={['md', 'lg', 'xl', 'xl']}
          fontWeight="bold"
          color="primary.800"
        >
          Welcome to Everyone Classroom
        </Heading>
        <Heading
          as="h2"
          size="md"
          fontWeight="normal"
          lineHeight={1.5}
          bgGradient="linear(to-l, #64B5F6, #81C784)"
          bgClip="text"
        >
          Your gateway to collaborative learning
        </Heading>

        <Button
          borderRadius="8px"
          py="4"
          px="4"
          lineHeight="1"
          size="md"
          onClick={() => router.push('/dashboard')}
        >
          Enter Classroom
        </Button>
        <Text fontSize="s" mt={2} color="primary.800" opacity="0.6">
          Sign in to join the classroom.
        </Text>
      </Stack>
    </Flex>
  );
};

export default Hero;
