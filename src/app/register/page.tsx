'use client'

// Import necessary components and styles from Chakra UI
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  VStack,
  Text,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { IoPersonCircleSharp } from 'react-icons/io5';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email and password
    if (!isValidEmail(email)) {
      setError('Email is invalid');
      return;
    }

    if (!password || password.length < 8) {
      setError('Password is invalid');
      return;
    }

    try {
      setLoading(true);

      let res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.status === 400) {
        setError('This email is already registered');
      } else if (res.status === 200) {
        const responseData = await res.json();
        setError('');
        await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
      }
    } catch (error) {
      setError('Error, try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (sessionStatus === 'loading') {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== 'authenticated' && (
      <Center>
        <Box
          p="8"
          rounded="md"
          boxShadow="md"
          w={{ base: '80%', md: '50%', lg: '40%' }} // Responsive width
        >
          <VStack spacing="8">
            <Text fontSize="2xl" fontWeight="bold">
              Register
            </Text>
            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <IoPersonCircleSharp />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Name"
                    isRequired
                    rounded="md"
                    px="3"
                    py="2"
                    _focus={{ borderColor: 'blue.400' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                  />
                </InputGroup>
              </FormControl>

              {/* Email Input */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <EmailIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Email"
                    isRequired
                    rounded="md"
                    px="3"
                    py="2"
                    _focus={{ borderColor: 'blue.400' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                  />
                </InputGroup>
              </FormControl>

              {/* Password Input */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement>
                    <LockIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="password"
                    placeholder="Password"
                    isRequired
                    rounded="md"
                    px="3"
                    py="2"
                    _focus={{ borderColor: 'blue.400' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                  />
                </InputGroup>
              </FormControl>
              <br />

              {/* Submit Button */}
              <Center>
                <Button
                  type="submit"
                  bg="blue.500"
                  color="white"
                  rounded="md"
                  _hover={{ bg: 'blue.600' }}
                  mt={2}
                  isLoading={loading}
                >
                  Register
                </Button>
              </Center>
            </form>

            {/* Or Text */}
            <Text>- OR -</Text>

            {/* Login Link */}
            <Link href="/login">
              <Text color="#0066CC" fontSize="sm" textDecoration="underline" mt="2">
                Login with an existing account
              </Text>
            </Link>
          </VStack>
          <Center>
            <Text color="red.600">{error && error}</Text>
          </Center>
        </Box>
      </Center>
    )
  );
};

export default Register;
