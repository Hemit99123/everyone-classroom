// 'use client'
import React, { useState } from 'react';
import {
  Text,
  Box,
  Button,
  Badge,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react'; // Assuming you are using Chakra UI components

import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  CopyIcon,
} from '@chakra-ui/icons';

interface AdminPortalProps {
  classroomData: Array<{
    _id: string;
    title: string;
    genre: string;
  }>;
}

interface AdminPortalState {
  isOpenCreatePost: boolean;
  isOpenCreateClassroom: boolean;
  title: string;
  genre: string;
  description: string;
  post_title: string;
  message: string;
  video_conferencing: string;
  github_username: string;
  github_reponame: string;
  github_content: Object;
  realworldApplication: string;
  youtube_link: string;
  youtubeID: string;
  model_url: string;
  sketchfab: Object;
}

const AdminPortal: React.FC<AdminPortalProps> = ({ classroomData }) => {
  const { isOpen: isOpenCreatePost, onOpen: onOpenCreatePost, onClose: onCloseCreatePost } = useDisclosure()
  const { isOpen: isOpenCreateClassroom, onOpen: onOpenCreateClassroom, onClose: onCloseCreateClassroom } = useDisclosure()
  const [state, setState] = useState<AdminPortalState>({
    isOpenCreatePost: false,
    isOpenCreateClassroom: false,
    title: '',
    genre: '',
    description: '',
    post_title: '',
    message: '',
    video_conferencing: '',
    github_username: '',
    github_reponame: '',
    github_content: {},
    realworldApplication: '',
    youtube_link: '',
    youtubeID: '',
    model_url: '',
    sketchfab: {},
  });

  const copyURL = async (id: string) => {
    await navigator.clipboard.writeText(`http://localhost:3000/dashboard/${id}`);
    alert('Copied classroom link!');
  };

  const getYoutubeId = () => {
    const match = state.youtube_link.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|v\/|.*[&?])v=)([^&?]+)/
    );
    const extractedVideoId = match ? match[1] : null;

    if (extractedVideoId) {
      setState({ ...state, youtubeID: extractedVideoId });
      console.log(state.youtubeID);
    } else {
      alert('Invalid video link');
    }
  };

  const getGithubRepo = async (owner: string, repo: string) => {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        alert('Something went wrong, try again!')
        throw new Error('API request failed');
      }

      const repoInfo = await response.json();
      const githubContent: {
        repo_url: string;
        name: string;
        language?: string;
        clone_url: string;
        description?: string;
      } = {
        repo_url: repoInfo?.html_url,
        name: repoInfo?.full_name,
        clone_url: repoInfo?.clone_url,
      };

      if (repoInfo?.description !== null) {
        githubContent.description = repoInfo?.description;
      }

      if (repoInfo?.language !== null) {
        githubContent.language = repoInfo?.language;
      }

      setState({ ...state, github_content: githubContent });
    } catch (error) {
      throw new Error('Error fetching repository information');
    }
  };

  const getsketchfabModel = async () => {
    const apiUrl = `https://sketchfab.com/oembed?url=${state.model_url}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        alert('Something went wrong, try again!');
        throw new Error('API request failed');
      }

      const modelInfo = await response.json();

      setState({
        ...state,
        sketchfab: {
          name: modelInfo?.title,
          html: modelInfo?.html,
        },
      });
    } catch (error) {
      throw new Error('Error fetching repository information');
    }
  };

  const handleCreateClassroom = async (e: any) => {
    e.preventDefault();
    try {
      await fetch('/api/classroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: state.title,
          genre: state.genre,
          description: state.description,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePost = async (e: React.FormEvent, classID: string) => {
    e.preventDefault();
    try {
      await fetch('/api/classroom/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: state.post_title,
          message: state.message,
          classID,
          video_conferencing: state.video_conferencing,
          github: state.github_content,
          realworldApplication: state.realworldApplication,
          youtubeID: state.youtubeID,
          sketchfab: state.sketchfab,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClassroom = async (id: string) => {
    try {
      await fetch('/api/classroom', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });
      alert('Deleted classroom');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Heading marginBottom={2} p={6}>
        Your classes:
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
        {classroomData.map((classItem) => (
          <main key={classItem._id}>
            <Card maxW="100%" marginBottom={4}>
              <CardHeader>
                <Flex>
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Box>
                      <Heading size="sm">{classItem.title}</Heading>
                    </Box>
                    <Box>
                      <Badge bgColor={'teal'}>{classItem.genre}</Badge>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  '& > button': {
                    minW: '136px',
                  },
                }}
              >
                <Button
                  leftIcon={<EditIcon />}
                  colorScheme="blue"
                  variant="outline"
                  onClick={onOpenCreatePost}
                >
                  Create a post
                </Button>
                <Button
                  leftIcon={<CopyIcon />}
                  colorScheme="green"
                  variant="outline"
                  onClick={() => copyURL(classItem._id)}
                >
                  Copy
                </Button>
                <Button
                  leftIcon={<DeleteIcon />}
                  colorScheme="red"
                  variant="outline"
                  onClick={() => handleDeleteClassroom(classItem._id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
            {/* Post creation model */}
            <Modal isOpen={isOpenCreatePost} onClose={onCloseCreatePost}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create a new post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <form onSubmit={(e) => handleCreatePost(e, classItem._id)}>
                    <FormControl isRequired>
                      <FormLabel>Title</FormLabel>
                      <Input
                        placeholder="Upcoming test reminder"
                        onChange={(e) => setState({ ...state, post_title: e.target.value })}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        placeholder="This is a reminder that we have a test!"
                        onChange={(e) => setState({ ...state, message: e.target.value })}
                      />
                    </FormControl>
                    <Text mt={2} fontSize={'2xl'} fontWeight={'bold'}>
                      Addons: (Optional)
                    </Text>
                    <FormControl>
                      <FormLabel>Video Conferencing Link</FormLabel>
                      <Input
                        placeholder="https://meet.google.com/1afe34fs"
                        onChange={(e) => setState({ ...state, video_conferencing: e.target.value })}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Your GitHub credentials</FormLabel>
                      <Input
                        placeholder="Github owner's username"
                        onChange={(e) => setState({ ...state, github_username: e.target.value })}
                      />
                      <Input
                        placeholder="Github repo name"
                        onChange={(e) => setState({ ...state, github_reponame: e.target.value })}
                      />
                      <Button onClick={() => getGithubRepo(state.github_username, state.github_reponame)}>
                        Link your repo
                      </Button>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Real World Application</FormLabel>
                      <Input
                        placeholder="Use cases in the IT field"
                        onChange={(e) => setState({ ...state, realworldApplication: e.target.value })}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Youtube Link</FormLabel>
                      <Input
                        placeholder="https://youtube.com/watch"
                        onChange={(e) => setState({ ...state, youtube_link: e.target.value })}
                      />
                      <Button onClick={getYoutubeId}>Link Youtube</Button>
                    </FormControl>
                    <FormControl>
                      <FormLabel>SketchFab 3D Modal</FormLabel>
                      <Input
                        placeholder="https://sketchfab.com/3d-models/the-bathroom-free-d5e5035dda434b8d9beaa7271f1c85fc"
                        onChange={(e) => setState({ ...state, model_url: e.target.value })}
                      />
                      <Button onClick={getsketchfabModel}>Link SketchFab</Button>
                    </FormControl>
                    <Button type="submit" mt={2}>
                      Post
                    </Button>
                  </form>
                </ModalBody>
                <ModalFooter />
              </ModalContent>
            </Modal>
          </main>
        ))}
      </Box>
      {/* Classroom creation modal */}
      <Modal
        isOpen={isOpenCreateClassroom}
        onClose={onCloseCreateClassroom}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new classroom</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleCreateClassroom}>
              <FormControl isRequired>
                <FormLabel>Course Name</FormLabel>
                <Input
                  placeholder="CS50"
                  onChange={(e) => setState({ ...state, title: e.target.value })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="A class all about coding"
                  onChange={(e) => setState({ ...state, description: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Select an option:</FormLabel>
                <Select
                  placeholder="Select option"
                  value={state.genre}
                  onChange={(e) => setState({ ...state, genre: e.target.value })}
                >
                  <option value="computer-science">Computer Science</option>
                  <option value="sciences">Sciences</option>
                  <option value="engineering">Engineering</option>
                </Select>
              </FormControl>

              <Button type="submit" mt={2}>
                Submit
              </Button>
            </form>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminPortal;