'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
  Text,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import {EmailIcon, LockIcon} from '@chakra-ui/icons'

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <Center>
        <Box
          p="8"
          rounded="md"
          boxShadow="md"
          w={{ base: "80%", md: "50%", lg: "40%" }} // Responsive width
        >
          <VStack spacing="6">
            <Text fontSize="2xl" fontWeight="bold">
              Login
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <InputGroup>
                  <InputLeftElement>
                    <LockIcon color='gray.300' />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Email"
                    isRequired
                    rounded="md"
                    _focus={{ borderColor: 'blue.400' }}
                  />
                </InputGroup>
                <FormErrorMessage>{error && error}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement>
                    <EmailIcon color='gray.300' />
                  </InputLeftElement>
                  <Input
                    type="password"
                    placeholder="Password"
                    isRequired
                    rounded="md"
                    _focus={{ borderColor: 'blue.400' }}
                  />
                </InputGroup>
              </FormControl>
              <Center>
                <Button
                  type="submit"
                  bg="blue.500"
                  color="white"
                  rounded="md"
                  _hover={{ bg: 'blue.600' }}
                >
                  Sign In
                </Button>
              </Center>
              <Text color="red.600" fontSize="sm" mt="2">
                {error && error}
              </Text>
            </form>
            <Text fontSize="sm">
              - OR -
            </Text>
            <Link href="/register">
              <Text color="blue.500" fontSize="sm" textDecoration="underline" mt="2">
                Register for a new account
              </Text>
            </Link>
          </VStack>
        </Box>
      </Center>
    )
  );
};

export default Login;