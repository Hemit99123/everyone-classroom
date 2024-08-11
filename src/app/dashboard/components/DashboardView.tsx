"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  Grid
} from '@chakra-ui/react';

export default async function  Dashboard() {

  
  interface TopicItems {
    _id: string;
    title: string;
    instructor: string;
    genre: string;
    description: string;
  }

  const [topic, setTopic] = useState<TopicItems[]>([]);
  const router = useRouter();
  const date = new Date();
  const hours = date.getHours();


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



  // Use parentheses instead of curly braces for conditional rendering
  return (
        <Box p={3}>
          <Center>
            <Text fontSize={'3xl'} fontWeight={'bold'}>
              {timeOfDay} user!
            </Text>
          </Center>
          <Text fontSize={'2xl'} fontWeight={'bold'} mt={2} marginBottom={3}>
            Our topics:
          </Text>
          <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
            {topic.map((classItem, index) => (
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
                <Card w="95%" h="100%" boxShadow="lg" transition="box-shadow 0.3s ease">
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
                          <Badge borderRadius="full" px="2" colorScheme="teal">
                            CESC
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
      )
  
}
