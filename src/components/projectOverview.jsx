import React, { useMemo, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link, Text } from '@chakra-ui/layout';
import { Badge, Button } from '@chakra-ui/react';
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
  const { daoid, daochain, yeeternumber } = useParams();
  const [showDetails, setShowDetails] = useState(false);

  const status = yeetStatus(project);

  const projectBadge = useMemo(() => {
    return (
      project.yeeterConfig.erc20Only && (
        <Badge
          bg='pink'
          borderRadius={4}
          color='#632b16'
          ml={4}
          px={2}
          variant='outline'
        >
          ERC20
        </Badge>
      )
    );
  }, [project]);

  return (
    <>
      <Flex alignItems={{ base: 'center', lg: 'flex-start' }} mb={5}>
        <Avatar
          src={
            project?.dao?.meta?.avatarImg
              ? themeImagePath(project.dao.meta.avatarImg)
              : makeBlockie(project.dao.id || '0x0')
          }
          mr={6}
        />
        <Box
          fontSize={{ base: '20px', lg: '30px' }}
          lineHeight={{ base: '30px', lg: '42px' }}
          fontWeight={700}
          fontFamily='heading'
        >
          {daoid ? (
            <Flex align='center' flexWrap='wrap'>
              <Text>{project?.dao.meta?.name || ''}</Text>
              {yeeternumber === '1' ? (
                ''
              ) : (
                <Text ml={2} fontSize='md'>
                  (yeet #{yeeternumber})
                </Text>
              )}
              {projectBadge}
            </Flex>
          ) : (
            <RouterLink
              to={`/dao/${project?.networkID}/${
                project?.dao?.id
              }/${project.yeeterNumber || '1'}`}
              style={{
                color: '#ED963A',
              }} // needed to override the theme 'a' style
            >
              <Flex align='center' flexWrap='wrap'>
                <Text>{project?.dao?.meta?.name}</Text>
                {project.yeeterNumber ? (
                  <Text ml={2} fontSize='md'>
                    (yeet #{project.yeeterNumber})
                  </Text>
                ) : (
                  ''
                )}
                {projectBadge}
              </Flex>
            </RouterLink>
          )}
        </Box>
      </Flex>
      <Box mb={5} mr={5}>
        {longDescription ? (
          <>
            <Text fontSize='md'> {project?.dao?.meta?.description}</Text>
            {project?.dao?.meta?.longDescription && (
              <>
                {showDetails && (
                  <>
                    <ReactMarkdown
                      components={ChakraUIRenderer()}
                      skipHtml
                      remarkPlugins={[remarkGfm]}
                      linkTarget='_blank'
                    >
                      {project?.dao?.meta?.longDescription}
                    </ReactMarkdown>
                  </>
                )}

                <Button
                  mt={2}
                  paddingX={2}
                  paddingY={1}
                  width='94px'
                  height='29px'
                  borderRadius='lg'
                  color='black'
                  fontSize='11px'
                  lineHeight='20px'
                  fontWeight='400'
                  align='center'
                  transition='all 0.15s linear'
                  _hover={{
                    color: 'gray.900',
                    backgroundColor: 'secondary.600',
                  }}
                  onClick={() => setShowDetails(!showDetails)}
                >
                  Show {!showDetails ? `More` : `Less`}
                </Button>
              </>
            )}
          </>
        ) : (
          <Text>{project?.dao?.meta?.description}</Text>
        )}
      </Box>
      <Flex alignItems='center' wrap='wrap'>
        {project?.dao?.meta?.links?.twitter && (
          <Link
            href={fixSocialLink('twitter', project.dao.meta.links.twitter)}
            target='_blank'
            rel='noreferrer noopener'
            mr={3}
          >
            <Icon
              as={RiTwitterFill}
              h='30px'
              w='30px'
              color='interfaceOrange.500'
            />
          </Link>
        )}
        {project?.dao?.meta?.links?.discord && (
          <Link
            href={fixSocialLink('discord', project.dao.meta.links.discord)}
            target='_blank'
            rel='noreferrer noopener'
            mr={3}
          >
            <Icon
              as={RiDiscordFill}
              h='30px'
              w='30px'
              color='interfaceOrange.500'
              transition='all 0.15s linear'
              _hover={{ textDecoration: 'none', color: 'interfaceOrange.800' }}
            />
          </Link>
        )}

        {project?.dao?.meta?.links?.other && (
          <Link
            href={fixSocialLink('github', project.dao.meta.links.other)}
            target='_blank'
            rel='noreferrer noopener'
            mr={3}
          >
            <Icon
              as={RiGithubFill}
              h='30px'
              w='30px'
              color='interfaceOrange.500'
              transition='all 0.15s linear'
              _hover={{ textDecoration: 'none', color: 'interfaceOrange.800' }}
            />
          </Link>
        )}

        {project?.dao?.meta?.links?.website && (
          <Link
            href={project.dao.meta.links.website}
            target='_blank'
            rel='noreferrer noopener'
            mr={3}
            ml={0}
          >
            <Icon
              as={RiGlobeLine}
              h='30px'
              w='30px'
              color='interfaceOrange.500'
              transition='all 0.15s linear'
              _hover={{ textDecoration: 'none', color: 'interfaceOrange.800' }}
            />
          </Link>
        )}

        {project?.dao?.meta?.links?.telegram && (
          <Link
            href={fixSocialLink('telegram', project.dao.meta.links.telegram)}
            target='_blank'
            rel='noreferrer noopener'
            mr={3}
          >
            <Icon
              as={RiTelegramFill}
              h='30px'
              w='30px'
              color='interfaceOrange.500'
              transition='all 0.15s linear'
              _hover={{ textDecoration: 'none', color: 'interfaceOrange.800' }}
            />
          </Link>
        )}

        {project?.dao?.meta?.links?.medium && (
          <Link
            href={fixSocialLink('medium', project.dao.meta.links.medium)}
            target='_blank'
            rel='noreferrer noopener'
            mr={3}
          >
            <Icon
              as={RiMediumFill}
              h='30px'
              w='30px'
              color='interfaceOrange.500'
              transition='all 0.15s linear'
              _hover={{ textDecoration: 'none', color: 'interfaceOrange.800' }}
            />
          </Link>
        )}
      </Flex>
      <Box marginTop={6}>
        {!daoid && (
          <RouterLink
            style={{}}
            to={`/dao/${project?.networkID}/${
              project?.dao?.id
            }/${project.yeeterNumber || '1'}`}
          >
            <Button
              paddingX={2}
              paddingY={1}
              width='94px'
              height='29px'
              borderRadius='lg'
              color='black'
              fontSize='11px'
              lineHeight='20px'
              fontWeight='400'
              align='center'
              transition='all 0.15s linear'
              _hover={{ color: 'gray.900', backgroundColor: 'secondary.600' }}
            >
              Visit Y33T
            </Button>
          </RouterLink>
        )}

        {daoid && <DaohausLink linkText='Visit the DAO' project={project} />}
      </Box>

      {daoid && Number(yeeternumber) > 1 && (
        <Box mt={2} fontSize='sm'>
          <RouterLink
            to={`/dao/${project?.networkID}/${project?.dao?.id}/${Number(
              yeeternumber - 1,
            )}`}
          >
            Visit Previous Yeet
          </RouterLink>
        </Box>
      )}
      {daoid && status === 'active' && !project.yeeterConfig.erc20Only && (
        <Flex mt={2} fontSize='sm'>
          Get Share Link{' '}
          <CopyButton
            text={`https://${window.location.host}/dao/${daochain}/${
              project.dao.id
            }/${yeeternumber || '1'}/yeet`}
            iconProps={{ height: '15px', width: '15px' }}
            customMessage='URL Copied to clipboard'
          />
        </Flex>
      )}
    </>
  );
};

export default ProjectOverview;
