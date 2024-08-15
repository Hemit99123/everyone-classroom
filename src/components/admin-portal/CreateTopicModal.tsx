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
  Button,
  Textarea
} from '@chakra-ui/react';

interface CreateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTopicModal: React.FC<CreateTopicModalProps> = ({ isOpen, onClose }) => {
  const [state, setState] = useState({
    title: '',
    genre: '',
    description: '',
    tag: ''
  });

  const handleCreateTopic = async (e: any) => {
    e.preventDefault();
    try {
      await fetch('/api/topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: state.title,
          genre: state.genre,
          description: state.description,
          tag: state.tag
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
        <ModalHeader>Create a new classroom</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleCreateTopic}>

          <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Computer Engineering"
                onChange={(e) => setState({ ...state, title: e.target.value })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Combines both principals from computer science and electrical engineering"
                onChange={(e) => setState({ ...state, description: e.target.value })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Tag</FormLabel>
              <Textarea
                placeholder="A tag to help users understand topic further. Keep it short!"
                onChange={(e) => setState({ ...state, tag: e.target.value })}
              />
            </FormControl>

            <Button type="submit" mt={2}>
              Submit
            </Button>
          </form>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default CreateTopicModal;
