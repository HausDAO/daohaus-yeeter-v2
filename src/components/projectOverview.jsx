import React, { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import makeBlockie from 'ethereum-blockies-base64';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

import {
  RiDiscordFill,
  RiGithubFill,
  RiGlobeLine,
  RiMediumFill,
  RiTelegramFill,
  RiTwitterFill,
} from 'react-icons/ri';
import Icon from '@chakra-ui/icon';
import { themeImagePath } from '../utils/metadata';
import { fixSocialLink } from '../utils/general';
import DaohausLink from './daohausLink';
import CopyButton from './copyButton';
import { yeetStatus } from '../utils/projects';

const ProjectOverview = ({ project, longDescription }) => {
  const { daoid, daochain } = useParams();
  const [showDetails, setShowDetails] = useState(false);

  const status = yeetStatus(project);

  return (
    <>
      <Flex alignItems='flex-start' mb={5}>
        <Avatar
          src={
            project?.meta?.avatarImg
              ? themeImagePath(project.meta.avatarImg)
              : makeBlockie(project.id || '0x0')
          }
          mr={6}
        />
        <Box fontSize='2xl' fontWeight={700} fontFamily='heading'>
          {daoid ? (
            `${project?.meta?.name || ''} ${project.yeeterNumber || ''}`
          ) : (
            <RouterLink
              to={`/dao/${project?.networkID}/${
                project?.id
              }/${project.yeeterNumber || '1'}`}
            >
              {project?.meta?.name} {project.yeeterNumber}
            </RouterLink>
          )}
        </Box>
      </Flex>
      <Box mb={5}>
        {longDescription ? (
          <>
            <Text> {project?.meta?.description}</Text>
            {project?.meta?.longDescription && (
              <>
                {showDetails && (
                  <>
                    <ReactMarkdown
                      components={ChakraUIRenderer()}
                      skipHtml
                      remarkPlugins={[remarkGfm]}
                    >
                      {project?.meta?.longDescription}
                    </ReactMarkdown>
                  </>
                )}
                <Text
                  onClick={() => setShowDetails(!showDetails)}
                  _hover={{ cursor: 'pointer' }}
                  color='secondary.500'
                  fontSize='sm'
                >
                  Show {!showDetails ? `More` : `Less`}
                </Text>
              </>
            )}
          </>
        ) : (
          <Text>{project?.meta?.description}</Text>
        )}
      </Box>
      <Flex alignItems='center' wrap='wrap'>
        {project?.meta?.links?.twitter && (
          <Link
            href={fixSocialLink('twitter', project.meta.links.twitter)}
            target='_blank'
            rel='noreferrer noopener'
            mr={3}
          >
            <Icon as={RiTwitterFill} h='30px' w='30px' color='secondary.500' />
          </Link>
        )}
        {project?.meta?.links?.discord && (
          <Link
            href={fixSocialLink('discord', project.meta.links.discord)}
            target='_blank'
            rel='noreferrer noopener'
            mr={3}
          >
            <Icon as={RiDiscordFill} h='30px' w='30px' color='secondary.500' />
          </Link>
        )}

        {project?.meta?.links?.other && (
          <Link
            href={fixSocialLink('github', project.meta.links.other)}
            target='_blank'
            rel='noreferrer noopener'
            mr={3}
          >
            <Icon as={RiGithubFill} h='30px' w='30px' color='secondary.500' />
          </Link>
        )}

        {project?.meta?.links?.website && (
          <Link
            href={project.meta.links.website}
            target='_blank'
            rel='noreferrer noopener'
            m={3}
            ml={0}
          >
            <Icon as={RiGlobeLine} h='30px' w='30px' color='secondary.500' />
          </Link>
        )}

        {project?.meta?.links?.telegram && (
          <Link
            href={fixSocialLink('telegram', project.meta.links.telegram)}
            target='_blank'
            rel='noreferrer noopener'
            m={3}
          >
            <Icon as={RiTelegramFill} h='30px' w='30px' color='secondary.500' />
          </Link>
        )}

        {project?.meta?.links?.medium && (
          <Link
            href={fixSocialLink('medium', project.meta.links.medium)}
            target='_blank'
            rel='noreferrer noopener'
            m={3}
          >
            <Icon as={RiMediumFill} h='30px' w='30px' color='secondary.500' />
          </Link>
        )}

        {!daoid && (
          <RouterLink to={`/dao/${project?.networkID}/${project?.id}`}>
            View Project
          </RouterLink>
        )}

        {daoid && <DaohausLink linkText='Visit the DAO' project={project} />}
      </Flex>
      {daoid && status === 'active' && (
        <Flex mt={2} fontSize='sm'>
          Get Share Link{' '}
          <CopyButton
            text={`https://${window.location.host}/dao/${daochain}/${project.id}/yeet`}
            iconProps={{ height: '15px', width: '15px' }}
            customMessage='URL Copied to clipboard'
          />
        </Flex>
      )}
    </>
  );
};

export default ProjectOverview;
