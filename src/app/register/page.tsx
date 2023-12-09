'use client'
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
  InputLeftElement
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { IoPersonCircleSharp } from "react-icons/io5";
import {useUploadThing} from "../../utils/uploadthing";

const Register = () => {
  interface ApiResponse {
    id: string; 
  }
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);

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

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (res) => {
      alert('Your profile picture is uploaded to the server!')
      setFile(undefined)
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // Validate email and password
    if (!isValidEmail(email)) {
      setError('Email is invalid');
      return;
    }

    if (!password || password.length < 8) {
      setError('Password is invalid');
      return;
    }

    let response: { name: string; size: number; key: string; serverData: null; url: string }[] = [];


    try {
      setLoading(true); // Set loading state to true during the API request
      
      // Now you can use the 'response' variable outside the if block.
      

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
        const responseData: ApiResponse = await res.json();
        if (file) {
          try {
            // Assuming startUpload returns a value when resolved
            const uploadResponse = await startUpload([file]);
            response = uploadResponse || []
          } catch (error) {
            // Handle errors during upload
            console.error("Error during upload:", error);
            return;
          }
          await fetch('/api/auth/register/add-profile-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              _id: responseData.id,
              photo_url: response[0].url
            }),
          });
        }
        setError('');
        await signIn("credentials", {
          redirect: false,
          email,
          password
        })
      }
    } catch (error) {
      setError('Error, try again');
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state after API request completes
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
          w="96"
        >
          <VStack spacing="8">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement>
                  <IoPersonCircleSharp  />

                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Name"
                    isRequired
                    border="1px"
                    borderColor="gray.300"
                    rounded="md"
                    px="3"
                    py="2"
                    _focus={{ borderColor: 'blue.400' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete='off'
                  />
                </InputGroup>
              </FormControl>

              {/* Email Input */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <EmailIcon />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Email"
                    isRequired
                    border="1px"
                    borderColor="gray.300"
                    rounded="md"
                    px="3"
                    py="2"
                    _focus={{ borderColor: 'blue.400' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='off'
                  />
                </InputGroup>
              </FormControl>
              
              {/* Password Input */}
              <FormControl>
                <InputGroup>
                  <InputLeftElement>
                    <LockIcon color='grey.300' />
                  </InputLeftElement>
                  <Input
                    type="password"
                    placeholder="Password"
                    isRequired
                    border="1px"
                    borderColor="gray.300"
                    rounded="md"
                    px="3"
                    py="2"
                    _focus={{ borderColor: 'blue.400' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='off'
                  />
                </InputGroup>
              </FormControl>
              <br />
              <FormControl>
              <Text fontSize={'18px'} fontWeight={'bold'}>Upload a profile picture</Text>  
              <input
                type="file"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                      setFile(selectedFile);
                    }
                  }}
              />
              </FormControl>

              <FormControl>




              </FormControl>
              {/* Submit Button */}
              <Center>
                <Button
                  type="submit"
                  bg="blue.500"
                  color="white"
                  py="2"
                  rounded="md"
                  _hover={{ bg: 'blue.600' }}
                  mt={2}
                  isLoading={loading} // Use Chakra UI isLoading prop
                >
                  Register
                </Button>
              </Center>
            </form>
            
            {/* Or Text */}
            <Text>- OR -</Text>

            {/* Login Link */}
            <Link href="/login">
              <Text color={'#0066CC'} fontSize='20px'>
                Login with an existing account
              </Text>
            </Link>
          </VStack>
          <Center>
            <Text color={'red'}>{error && error}</Text>
          </Center>
        </Box>
      </Center>
    )
  );
};

export default Register;