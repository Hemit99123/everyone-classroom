'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { FaMedal } from 'react-icons/fa';

interface CertificateProps {
  certData: {
    name: string;
    course_name: string;
    createdAt: string;
  };
}

const Certificate: React.FC<CertificateProps> = ({ certData }) => {
  return (
    <Flex
      bg="white"
      color="#333"
      direction="column"
      align="center"
      p="120px" // Increased padding for an even larger certificate
      border="1px solid #ddd"
      borderRadius="md"
      boxShadow="md"
      maxW="1500px" // Increased max width
      mx="auto"
      position="relative"
    >
      {/* Decorative elements */}
      <Box
        bg="#333"
        h="12px" // Increased height of the decorative elements
        w="100%"
        position="absolute"
        top="0"
        left="0"
        borderRadius="md"
      />
      <Box
        bg="#333"
        h="12px" // Increased height of the decorative elements
        w="100%"
        position="absolute"
        bottom="0"
        left="0"
        borderRadius="md"
      />
      <Box
        bg="#FFD700" // Use a gold color for the medal
        h="150px" // Increased size of the medal
        w="150px" // Increased size of the medal
        borderRadius="50%"
        position="absolute"
        bottom="-75px" // Adjusted position of the medal
        transform="translateX(-50%)"
        left="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="lg"
      >
        {/* Use the PiMedalBold component or any other custom medal icon */}
        <FaMedal size="80px" color="#fff" /> {/* Increased size of the medal icon */}
      </Box>
      <Heading mb="6" fontSize="4xl"> {/* Increased font size */}
        Certificate of Mastery
      </Heading>
      <Text fontSize="xl" mb="6"> {/* Increased font size */}
        This is to certify that
      </Text>
      <Heading mb="6" fontSize="2xl"> {/* Increased font size */}
        {certData?.name}
      </Heading>
      <Text fontSize="xl" mb="6"> {/* Increased font size */}
        has successfully completed the course
      </Text>
      <Heading mb="6" fontSize="2xl"> {/* Increased font size */}
        {certData?.course_name}
      </Heading>
      <Text fontSize="xl" mb="6"> {/* Increased font size */}
        on {certData?.createdAt}
      </Text>
      {/* You can add more details from the certData as needed */}
    </Flex>
  );
};

const Cert: React.FC = () => {
  const { id: classroom_id } = useParams();
  const [certData, setCertData] = useState<{
    name: string;
    course_name: string;
    createdAt: string;
    // Add other properties as needed
  } | null>(null);

  useEffect(() => {
    const fetchCertData = async () => {
      try {
        const response = await fetch(`/api/cert?certID=${classroom_id}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setCertData(data);
        } else {
          console.error('Error fetching cert data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching cert data:', error);
      }
    };

    fetchCertData();
  }, [classroom_id]);

  return (
    <Flex justify="center" align="center" h="100vh">
      <Box>
        {certData ? (
          <Certificate certData={certData} />
        ) : (
          <Text>Loading...</Text>
        )}
      </Box>
    </Flex>
  );
};

export default Cert;
