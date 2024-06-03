import React, { useState } from 'react';
import {
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
  Textarea,
  Button,
  Text
} from '@chakra-ui/react';
import { getGithubRepo, getYoutubeId, getSketchfabModel } from '../utils';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId: string | null;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, topicId }) => {
  const [state, setState] = useState({
    topicId: '',
    post_title: '',
    message: '',
    github_username: '',
    github_reponame: '',
    github_content: {},
    realworldApplication: '',
    youtube_link: '',
    youtubeID: '',
    model_url: '',
    sketchfab: {},
  });

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicId) return;
    try {
      await fetch('/api/topic/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topicId, 
          title: state.post_title,
          message: state.message,
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleCreatePost}>
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
              <FormLabel>Your GitHub credentials</FormLabel>
              <Input
                placeholder="Github owner's username"
                onChange={(e) => setState({ ...state, github_username: e.target.value })}
              />
              <Input
                placeholder="Github repo name"
                onChange={(e) => setState({ ...state, github_reponame: e.target.value })}
              />
              <Button onClick={() => getGithubRepo(state.github_username, state.github_reponame, setState, state)}>
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
              <Button onClick={() => getYoutubeId(state.youtube_link, setState, state)}>
                Link Youtube
              </Button>
            </FormControl>
            <FormControl>
              <FormLabel>SketchFab 3D Modal</FormLabel>
              <Input
                placeholder="https://sketchfab.com/3d-models/the-bathroom-free-d5e5035dda434b8d9beaa7271f1c85fc"
                onChange={(e) => setState({ ...state, model_url: e.target.value })}
              />
              <Button onClick={() => getSketchfabModel(state.model_url, setState, state)}>
                Link SketchFab
              </Button>
            </FormControl>
            <Button type="submit" mt={2}>
              Post
            </Button>
          </form>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
