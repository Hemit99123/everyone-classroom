'use client';
import React, { useState, useEffect } from 'react';
import { Box, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ClassroomCard from './components/TopicCard';
import CreateClassroomModal from './components/CreateTopicModal';
import CreatePostModal from './components/CreatePostModal';
import { useSession } from 'next-auth/react';
interface TopicProps {
  _id: string;
  title: string;
}

const AdminPortal: React.FC= () => {

  const {
    isOpen: isOpenCreatePost,
    onOpen: onOpenCreatePost,
    onClose: onCloseCreatePost
  } = useDisclosure();
  
  const {
    isOpen: isOpenCreateClassroom,
    onOpen: onOpenCreateClassroom,
    onClose: onCloseCreateClassroom
  } = useDisclosure();
  
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(null);
  const { data: session, status: sessionStatus } = useSession();
  const [topic, setTopic] = useState<TopicProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/topic');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTopic(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  const handleCreateClassroomOpen = () => {
    onOpenCreateClassroom();
  };

  const handleCreatePostOpen = (id: string) => {
    setSelectedClassroom(id);
    onOpenCreatePost();
  };

  return (
    <div>
      <Heading marginBottom={2} p={6}>
        Your topics:
      </Heading>
      <IconButton
        icon={<AddIcon />}
        size="lg"
        position="absolute"
        top="90px"
        right="20px"
        aria-label="Add"
        onClick={handleCreateClassroomOpen}
      />
      <Box mt={5}>
        {topic.map((classItem) => (
          <ClassroomCard
            key={classItem._id}
            classItem={classItem}
            onOpenCreatePost={handleCreatePostOpen}
          />
        ))}
      </Box>
      <CreateClassroomModal isOpen={isOpenCreateClassroom} onClose={onCloseCreateClassroom} />
      <CreatePostModal isOpen={isOpenCreatePost} onClose={onCloseCreatePost} topicId={selectedClassroom} />
    </div>
  );
};

export default AdminPortal;
