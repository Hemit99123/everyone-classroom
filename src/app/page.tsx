'use client'
import React from 'react';
import { Box, Heading, Text, Button, VStack, Badge } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter()
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minH="100vh"
      p={8}
    >
      <Box
        p={8}
        rounded="lg"
        shadow="md"
        textAlign="center"
        maxW="md"
        w="100%"
      >
        <Heading as="h1" fontSize={'xl'} mb={4} color="teal.500">
        </Heading>
        <Text fontSize={'2xl'} fontWeight={'bold'} mb={4} color='teal.500'>
          LIVE Instruction
        </Text>
        <Text fontSize="lg" color="gray.600" mb={4}>
          Explore, learn, and grow in our STEM-focused online classroom platform.
        </Text>
        <Text fontSize="lg" color="gray.600" mb={4}>
          Check out our diverse range of STEM courses, all available FOR FREE!
        </Text>
        <Button colorScheme="teal" size="lg" mt={4} onClick={() => {router.replace('/dashboard')}}>
          Go to dashboard
        </Button>
      </Box>
      
      {/* Additional content */}
      <VStack spacing={4} mt={8} maxW="xl" w="100%">
        <Heading as="h2" size="lg">
          Why Choose Everyone Classroom for STEM Education?
        </Heading>
        <Text fontSize="md" color="gray.700" textAlign="center">
          Our STEM-focused Learning Management System is designed to provide a comprehensive
          and interactive learning experience for students and professionals in the fields of
          Science, Technology, Engineering, and Mathematics.
        </Text>
        <Heading as="h3" size="md">
          Key Features:
        </Heading>
        <VStack spacing={2} align="start" w="100%">
          <Text fontSize="sm" color="gray.600">
            - Interactive Labs and Simulations
          </Text>
          <Text fontSize="sm" color="gray.600">
            - STEM Addons such as Github
          </Text>
          <Text fontSize="sm" color="gray.600">
            - Youtube intergration
          </Text>
          <Text fontSize="sm" color="gray.600">
            - Real-world Projects and Case Studies
          </Text>
        </VStack>
        
        
        {/* Testimonials */}
        <Heading as="h3" size="md" mt={4}>
          What Our Students Say:
        </Heading>

      </VStack>
    </Box>
  );
};

export default Home;
