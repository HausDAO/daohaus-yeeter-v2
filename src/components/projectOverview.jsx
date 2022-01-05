import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import makeBlockie from 'ethereum-blockies-base64';

import { RiDiscordFill, RiGithubFill, RiTwitterFill } from 'react-icons/ri';
import Icon from '@chakra-ui/icon';
import { themeImagePath } from '../utils/metadata';
import { fixSocialLink } from '../utils/general';
import DaohausLink from './daohausLink';

const ProjectOverview = ({ project }) => {
  const { daoid } = useParams();

  console.log('project', project);
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
            project?.meta?.name || '--'
          ) : (
            <RouterLink to={`/dao/${project?.networkID}/${project?.id}`}>
              {project?.meta?.name || '--'}
            </RouterLink>
          )}
        </Box>
      </Flex>
      <Box mb={5}>{project?.meta?.description}</Box>
      <Flex alignItems='center'>
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
        <DaohausLink linkText='Visit the DAO' project={project} />
      </Flex>
    </>
  );
};

export default ProjectOverview;
