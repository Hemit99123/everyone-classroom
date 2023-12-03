'use client';

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  Text,
  Badge,
  Center,
  Spinner,
  Grid
} from '@chakra-ui/react';
export default function Dashboard() {
  interface ClassroomItems {
    _id: string;
    title: string;
    instructor: string;
    genre: string;
    description: string;
  }
  const { data: session, status }: any = useSession();
  const [classroom, setClassroom] = useState<ClassroomItems[]>([]);
  const router = useRouter();
  const date = new Date();
  const hours = date.getHours();

  let timeOfDay;

  if (hours < 12) {
    timeOfDay = (
      <>
        <Box as="span">Good&nbsp;</Box>
        <Box as="span">Morning</Box>
      </>
    );
  } else if (hours >= 12 && hours <= 17) {
    timeOfDay = (
      <>
        <Box as="span">Good&nbsp;</Box>
        <Box as="span">Afternoon</Box>
      </>
    );
  } else if (hours >= 17 && hours <= 24) {
    timeOfDay = (
      <>
        <Box as="span">Good&nbsp;</Box>
        <Box as="span">Evening</Box>
      </>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/classroom');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setClassroom(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Only fetch data if the user is authenticated
    if (status === 'authenticated') {
      fetchData();
    } else if (status === 'unauthenticated') {
      // Redirect to the login page if the user is not authenticated
      router.replace('/login');
    }
  }, [status]); // Include 'status' in the dependency array to re-run the effect when the authentication status changes

  if (status === 'loading') {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={3}>
      <Center>
        <Text fontSize={'3xl'} fontWeight={'bold'}>{timeOfDay} {session?.user.name}</Text>
      </Center>
      <Text fontSize={'2xl'} fontWeight={'bold'} mt={2}>Our Courses</Text>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
        {classroom.map((classItem, index) => (
          <Box
            key={index}
            onClick={() => {
              router.push(`/dashboard/${classItem._id}`);
            }}
            cursor="pointer"
            _hover={{
              transform: 'scale(1.02)',
              transition: 'transform 0.3s ease',
            }}
          >
            <Card
              w="95%"
              h="100%"
              boxShadow="lg"
              transition="box-shadow 0.3s ease"
            >
              <CardHeader>
                <Flex>
                  <Flex
                    flex="1"
                    gap="4"
                    alignItems="center"
                    flexWrap="wrap"
                    justify="space-between"
                  >
                    <Box>
                      <Heading size="sm">{classItem.title}</Heading>
                      <Text>{classItem.instructor}</Text>
                      <Badge borderRadius="full" px="2" colorScheme="teal">
                        {classItem.genre}
                      </Badge>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>{classItem.description}</Text>
              </CardBody>
            </Card>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}