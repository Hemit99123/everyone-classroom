'use client'

// Import necessary components and styles from Chakra UI
import {
  Box,
  Flex,
  Text,
  ChakraProvider,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Image,
} from '@chakra-ui/react';
import React, { useState } from 'react';

// Define co-creators
const coCreators = [
  { name: 'Hemit Patel', role: 'Founder and Creator', description: 'Hemit started the idea of our own in-house platform. He is the one that pioneered this platform and built it from the ground up.', image: 'https://media.licdn.com/dms/image/D5603AQFDJxp7vmgX0Q/profile-displayphoto-shrink_200_200/0/1695640460890?e=1709164800&v=beta&t=pOWan2TS0XcYOXIOpVOFx5uWf_1OPn8wvfXZnVJbw9k' },
  { name: 'Santosh Patapati', role: 'Co-Creator', description: 'Santosh Patapati was the first person other than Hemit to start work on the platform. He initially started work on V1, but when Hemit came up with the idea of this new, better platform, he quickly helped contribute to it!', image: 'https://media.licdn.com/dms/image/D5603AQGIOhuRey-yKw/profile-displayphoto-shrink_200_200/0/1697165471848?e=1709164800&v=beta&t=fCsZZTGBgYTW3OWdS0KXool2UA1u-40KmWElLRZYd0s' },
];

const Page = () => {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const openModal = (person: string) => {
    setSelectedPerson(person);
  };

  const closeModal = () => {
    setSelectedPerson(null);
  };

  return (
    <ChakraProvider>
      {/* Masthead */}
      <Center>
        <Heading marginBottom={3} marginTop={3}>
          About
        </Heading>
      </Center>

      {/* About Section */}
      <Box p={{ base: '4', md: '8' }} mx="auto" maxW="full" textAlign="center">
        <Text fontSize={{ base: 'md', md: 'lg' }} mb="6">
          Welcome to our platform, a cutting-edge in-house educational tool created for our non-profit Everyone STEM. Our platform is designed to provide an immersive learning experience, empowering users to embark on a journey of innovation and knowledge.
        </Text>
      </Box>

      {/* The People Section */}
      <Box bg="blue.500" color="white" p="4" boxShadow="md" textAlign="center">
        <Text fontSize="xl" fontWeight="bold">
          The Creators
        </Text>
      </Box>

      {/* Co-Creators Section */}
      <Box p={{ base: '4', md: '8' }} mx="auto" maxW="full">
        <Flex wrap="wrap" justify="center" align="center">
          {coCreators.map((person) => (
            <Box
              key={person.name}
              textAlign="center"
              mb="8"
              cursor="pointer"
              _hover={{ textDecoration: 'underline' }}
              onClick={() => openModal(person.description)}
              flex="0 0 100%"
              maxWidth={{ base: 'auto', md: '25%' }}
            >
              <Image
                src={person.image}
                alt={`${person.name}'s image`}
                borderRadius="full"
                boxSize="150px"
                objectFit="cover"
                mb="4"
                mx="auto"
              />
              <Text>{person.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {person.role}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Description Modal */}
      <Modal isOpen={selectedPerson !== null} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedPerson}</Text>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default Page;
