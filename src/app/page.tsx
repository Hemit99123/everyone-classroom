'use client'
import React from 'react';
import { Box, Button, Flex, Image, Heading, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Hero: React.FC = () => {

  // hero page for main route
  const router = useRouter();

  return (
    <Flex
      align="center"
      justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
      direction={{ base: 'column-reverse', md: 'row' }}
      minH="70vh"
      px={8}
      mb={16}
    >
      <Stack
        spacing={4}
        w={{ base: '80%', md: '40%' }}
        align={['center', 'center', 'flex-start', 'flex-start']}
      >
      <Heading
        as="h1"
        size={['md', 'lg', 'xl', 'xl']}
        fontWeight="bold"
        color="primary.800"
        textAlign={['center', 'center', 'left', 'left']}
      >
        This is Everyone Classroom 2.0
      </Heading>
        <Heading
          as="h2"
          size="md"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={['center', 'center', 'left', 'left']}
          bgGradient="linear(to-l, #64B5F6, #81C784)"
          bgClip="text"
      >
          Redesigned, Reimagined.
      </Heading>

        <Button
          borderRadius="8px"
          py="4"
          px="4"
          lineHeight="1"
          size="md"
          onClick={() => router.push('/dashboard')}
        >
          Go to dashboard
        </Button>
        <Text fontSize="s" mt={2} textAlign="center" color="primary.800" opacity="0.6">
          Login is required.
        </Text>
      </Stack>
      <Box w={{ base: '80%', sm: '60%', md: '50%' }} mb={{ base: 12, md: 0 }}>
        <Image
          src="https://source.unsplash.com/collection/404339/800x600"
          rounded="1rem"
          shadow="2xl"
        />
      </Box>
    </Flex>
  );
};

export default Hero;
