'use client';
import React, { useState, useEffect } from 'react';
import { Box, Heading, IconButton, useDisclosure, Button, Alert, AlertIcon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, List, ListItem } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import CreateClassroomModal from './CreateTopicModal';
import CreatePostModal from './CreatePostModal';

interface TopicProps {
  _id: string;
  title: string;
}

interface PostProps {
  _id: string;
  title: string;
}

const AdminPortal: React.FC = () => {
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

  const {
    isOpen: isOpenPosts,
    onOpen: onOpenPosts,
    onClose: onClosePosts
  } = useDisclosure();

  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(null);
  const [topics, setTopics] = useState<TopicProps[]>([]);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch topics initially
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/topic');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        setError('Error fetching topics');
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  // Fetch posts for the selected topic
  const fetchPosts = async (topicId: string) => {
    try {
      const response = await fetch(`/api/topic/post?topicId=${topicId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
      setSelectedClassroom(topicId);
      onOpenPosts();
    } catch (error) {
      setError('Error fetching posts');
      console.error('Error fetching posts:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!selectedClassroom) return;

    try {
      const response = await fetch(`/api/topic/post?topicId=${selectedClassroom}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: postId })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (error) {
      setError('Error deleting post');
      console.error('Error deleting post:', error);
    }
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
        onClick={onOpenCreateClassroom}
      />
      <Box mt={5}>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {topics.map((topic) => (
          <Box key={topic._id} borderWidth={1} borderRadius="md" p={4} mb={4} position="relative">
            <h2>{topic.title}</h2>
            <Button onClick={() => onOpenCreatePost()} colorScheme="blue" mt={2}>
              Create Post
            </Button>
            <Button onClick={() => fetchPosts(topic._id)} colorScheme="teal" mt={2} ml={2}>
              Fetch Posts
            </Button>
          </Box>
        ))}
      </Box>
      
      <CreateClassroomModal isOpen={isOpenCreateClassroom} onClose={onCloseCreateClassroom} />
      <CreatePostModal isOpen={isOpenCreatePost} onClose={onCloseCreatePost} topicId={selectedClassroom} />

      {/* Modal for displaying posts */}
      <Modal isOpen={isOpenPosts} onClose={onClosePosts}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Posts for Topic</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {error && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                {error}
              </Alert>
            )}
            <List spacing={3}>
              {posts.map((post) => (
                <ListItem key={post._id} borderWidth={1} borderRadius="md" p={2} mb={2} position="relative">
                  <h3>{post.title}</h3>
                  <Button onClick={() => handleDeletePost(post._id)} colorScheme="red" mt={2} ml={2}>
                    <DeleteIcon />
                  </Button>
                </ListItem>
              ))}
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminPortal;
