import React from 'react';
import { Box, Button, Card, CardFooter, CardHeader, Flex, Heading } from '@chakra-ui/react';
import { EditIcon, CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import { copyURL } from './utils';

interface TopicCardProps {
  classItem: {
    _id: string;
    title: string;
  };
  onOpenCreatePost: (id: string) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ classItem, onOpenCreatePost }) => {

  const handleDeleteClassroom = async (id: string) => {
    try {
      await fetch('/api/topic', {
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
    <main>

      <Card maxW="100%" marginBottom={4}>
        <CardHeader>
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="sm">{classItem.title}</Heading>
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
          <Button leftIcon={<EditIcon />} colorScheme="blue" variant="outline" onClick={() => onOpenCreatePost(classItem._id)}>
            Create a post
          </Button>
          <Button leftIcon={<CopyIcon />} colorScheme="green" variant="outline" onClick={() => copyURL(classItem._id)}>
            Copy
          </Button>
          <Button leftIcon={<DeleteIcon />} colorScheme="red" variant="outline" onClick={() => handleDeleteClassroom(classItem._id)}>
            Delete
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default TopicCard;
