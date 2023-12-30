import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Badge,
  Link,
  IconButton,
  Flex,
  useToast,
  useMediaQuery
} from '@chakra-ui/react';
import {
  FaYoutube,
  FaGithub,
  FaCode,
  FaVideo,
  FaExternalLinkAlt,
  FaCubes
} from 'react-icons/fa';
import parse from 'html-react-parser';

interface PostProps {
  id: string;
  title: string;
  message: string;
  video_conferencing?: string;
  githubName?: string;
  githubURL?: string;
  githubCloneURL?: string;
  githubLanguage?: string;
  githubDescription?: string
  youtubeID?: string;
  sketchfabHTML: string;
  sketchfabTitle?: string;
  realworldApplication?: string;
  userSub?: string;
  updatedAt: string;
  createdAt: string;
}

const Post: React.FC<PostProps> = ({
  id,
  title,
  message,
  video_conferencing,
  githubName,
  githubURL,
  githubCloneURL,
  githubLanguage,
  githubDescription,
  youtubeID,
  sketchfabHTML,
  sketchfabTitle,
  realworldApplication,
  updatedAt,
  createdAt
}) => {
  const [showYoutube, setShowYoutube] = useState<{ [key: string]: boolean }>({});
  const [showGithub, setShowGithub] = useState<{ [key: string]: boolean }>({});
  const [showSketchfab, setShowSketchfab] = useState<{ [key: string]: boolean }>({});
  const [isSmallerThan500] = useMediaQuery('(max-width: 500px)');
  const toast = useToast()

  // Algorithm to calculate how long time has passed since the creation of the post

  const handleTimePassed = (timestamp: string) => {
    const providedTimestamp: Date = new Date(timestamp);
    const currentTime = new Date()
    const timeDifference: number = currentTime.getTime() - providedTimestamp.getTime();
    const days: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeks: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
    // Approximates to 365.25 days due to leap years which have a day more than regular years
    const years: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));

    if (days < 1) {
      return 'Today'
    } 
    // Assumes its been weeks now since if its been more than 7 days, it has to be in weeks (7 days = 1 week)
    else if (days < 7) {
      return `${days} days ago`
    }
    // So now we can use weeks instead of days to simplify computation
    else if (weeks < 52) {
      return `${weeks} weeks ago`
    }
    // Again same logic, more than 52 weeks is in years as 52 weeks is equal to 1 year.
    else {
      return `${years} years ago`
    }
  };

  return (
    <Box borderRadius="md" boxShadow="md" p={4} mb={4}>
      <Text fontSize="sm" color="gray.500">
        {handleTimePassed(createdAt)}
        
        {createdAt !== updatedAt && (
          <Text as="span" onClick={() => alert(`Updated at ${handleTimePassed(updatedAt)}`)}>
            (Edited)
          </Text>
        )}
      </Text>
      <Text fontSize="lg" fontWeight="bold">
        {title}
      </Text>
      <Text fontSize="md" mt={2}>
        {message}
      </Text>
      {video_conferencing && (
        <Box p={2} cursor="pointer">
          <Flex alignItems="center">
            <FaVideo style={{ marginRight: '8px' }} />
            <Text fontSize="md" fontWeight="semibold" display="inline">
              Video Conference Link:
            </Text>
            <Box
              onClick={() => {
                window.location.href = video_conferencing;
              }}
              ml={2}
            >
              <IconButton
                icon={<FaExternalLinkAlt />}
                size="xs"
                aria-label="External Link"
              />
            </Box>
          </Flex>
        </Box>
      )}
      {githubName && (
        <Box
          p={2}
          cursor="pointer"
          onClick={() =>
            setShowGithub((prevState) => ({
              ...prevState,
              [id]: !prevState[id]
            }))
          }
        >
          <Flex alignItems="center">
            <FaGithub style={{ marginRight: '8px' }} />
            <Text fontSize="md" fontWeight="semibold" display="inline">
              GitHub Repository:
            </Text>
            <Link href={githubURL} isExternal ml={2}>
              <IconButton
                icon={<FaExternalLinkAlt />}
                size="xs"
                aria-label="External Link"
              />
            </Link>
          </Flex>
          {showGithub[id] && (
            <Box>
              <Text fontWeight="semibold">
                Name: {githubName}
              </Text>
              <Badge mt={1} mb={2}>
                {githubLanguage}
              </Badge>
              <Text>
                {githubDescription}
              </Text>
              <Button
                mt={2}
                variant="outline"
                leftIcon={<FaCode />}
                onClick={() => {
                  navigator.clipboard
                    .writeText(`git clone ${githubCloneURL}`)
                    .then(() => {
                      toast({
                        title: 'Copied clone url',
                        description:
                          "Now, you can use this clone url with Git to clone this repo :)",
                        status: 'info',
                        duration: 5500,
                        isClosable: true
                      });
                    })
                    .catch((error) => {
                      console.error(
                        'Error copying clone URL:',
                        error
                      );
                    });
                }}
              >
                Clone
              </Button>
            </Box>
          )}
        </Box>
      )}
      {youtubeID && (
        <Box
          p={2}
          display="flex"
          alignItems="center"
          cursor="pointer"
          onClick={() =>
            setShowYoutube((prevState) => ({
              ...prevState,
              [id]: !prevState[id]
            }))
          }
        >
          <FaYoutube
            style={{ marginRight: '8px', fontSize: '25px' }}
          />
          <Text fontSize="md" fontWeight="bold">
            YouTube
          </Text>
          {showYoutube[id] && (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${youtubeID}?si=k_0AbfAaSAFAOrZV`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
        </Box>
      )}
      {realworldApplication && (
        <Box p={2}>
          <Text fontSize="md" fontWeight="semibold">
            Real World Application
          </Text>
          <Text fontSize="md">{realworldApplication}</Text>
        </Box>
      )}
      {sketchfabTitle && (
        <Box p={2}>
          <Flex
            alignItems="center"
            cursor="pointer"
            onClick={() =>
              setShowSketchfab((prevState) => ({
                ...prevState,
                [id]: !prevState[id]
              }))
            }
          >
            <FaCubes style={{ fontSize: '24px', marginRight: '8px' }} />
            <Text fontSize="lg" fontWeight="semibold">
              3D Model
            </Text>
            <Text ml={2} color="gray.600">
              Powered by Sketchfab
            </Text>
          </Flex>

          {showSketchfab[id] && (
  <Box mt={2}>
    <Text fontSize="md" fontWeight="semibold" mb={2}>
      {sketchfabTitle}
    </Text>
    {isSmallerThan500 ? (
    <Box
    position="relative"
    paddingBottom="56.25%" // 16:9 aspect ratio
    height="0"
    background="black" // Set the background color
  >
    <iframe
      srcDoc={sketchfabHTML}
      title="Sketchfab Model"
      width="100%"
      height="100%"
      style={{ position: "absolute", top: "0", left: "0", border: "none" }}
    />
  </Box>
    ): (
      <>  
            {parse(sketchfabHTML)}
      </>
    )}

  </Box>
)}
        </Box>
      )}
    </Box>
  );
};

export default Post;