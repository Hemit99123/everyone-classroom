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
  const { data: session, status: sessionStatus } = useSession();
  const [classroom, setClassroom] = useState<ClassroomItems[]>([]);
  const router = useRouter();
  const date = new Date();
  const hours = date.getHours();
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

    if (sessionStatus === 'unauthenticated') {
      router.replace('/login');
    } else {
      fetchData();
    }
  }, []); 


  let timeOfDay;

  if (hours < 12) {
    timeOfDay = (
      <>
        <Box as="span">Good&nbsp;</Box>
        <Box as="span">morning</Box>
      </>
    );
  } else if (hours >= 12 && hours <= 17) {
    timeOfDay = (
      <>
        <Box as="span">Good&nbsp;</Box>
        <Box as="span">afternoon</Box>
      </>
    );
  } else if (hours >= 17 && hours <= 24) {
    timeOfDay = (
      <>
        <Box as="span">Good&nbsp;</Box>
        <Box as="span">evening</Box>
      </>
    );
  }

  

  if (sessionStatus === 'loading') {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }
  
  return (
    <Box p={3}>
      <Center>
        <Text fontSize={'3xl'} fontWeight={'bold'}>{timeOfDay} {session?.user.name}!</Text>
      </Center>
      <Text fontSize={'2xl'} fontWeight={'bold'} mt={2} marginBottom={3}>Our topics:</Text>
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
      <br />
    </Box>
  );
}