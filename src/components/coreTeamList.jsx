import React, { useEffect, useState } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { Box, Flex, Icon, Spinner, Text, Tooltip } from '@chakra-ui/react';

import AddressAvatar from './addressAvatar';
import DaohausLink from './daohausLink';
import StaticAvatar from './staticAvatar';
import { fetchMetaData } from '../utils/metadata';

const TEAM_DISPLAY_COUNT = 4;
const MAX_MEMBER_LIST = 15;

const CoreTeamList = ({ coreTeam, totalShares, project, allMembers }) => {
  // const [loading, setLoading] = useState(false);
  const [memberList, setMemberList] = useState([]);

  const remainingCount = coreTeam
    ? coreTeam.length - TEAM_DISPLAY_COUNT
    : allMembers.length - MAX_MEMBER_LIST;

  // const memberList =
  //   coreTeam?.slice(0, TEAM_DISPLAY_COUNT) ||
  //   allMembers.slice(0, MAX_MEMBER_LIST);
  useEffect(() => {
    const fetchMembersMeta = async members => {
      console.log('MEMBERS PRE', members);
      // setLoading(true);
      const membersMeta = await Promise.all(
        members.map(async member => {
          if (member.isDao) {
            const [meta] = await fetchMetaData(member.memberAddress);
            return {
              ...member,
              name: meta.name,
              avatarImg: meta.avatarImg,
            };
          }
          if (member.isSafeMinion) {
            if (member.isSafeMinion.minions?.length === 1) {
              const [meta] = await fetchMetaData(
                member.isSafeMinion.minions[0].molochAddress,
              );
              return {
                ...member,
                name: meta.name,
                avatarImg: meta.avatarImg,
              };
            }
            return member;
          }
          return member;
        }),
      );
      // setLoading(false);
      // return memberList;
      setMemberList(membersMeta);
    };
    fetchMembersMeta(
      coreTeam?.slice(0, TEAM_DISPLAY_COUNT) ||
        allMembers.slice(0, MAX_MEMBER_LIST),
    );
  }, []);

  console.log('MEMBERS w/META', memberList);

  return (
    <Box backgroundColor='primary.500' mt={coreTeam ? 0 : 5}>
      {coreTeam && (
        <Flex mb={5} align='center'>
          <Text
            fontSize='md'
            lineHeight='24px'
            letterSpacing='11%'
            textTransform='uppercase'
          >
            Core Team
          </Text>
          <Tooltip
            hasArrow
            shouldWrapChildren
            padding={3}
            color='#ED963A'
            bgColor='black'
            placement='bottom'
            label='The Core Team are full shareholders in the DAO and are responsible for the goals of the project. Full shareholder membership is proposed through the DAOhaus interface. '
          >
            <Flex alignItems='center' color='#ED963A'>
              <Icon ml={2} mt='2px' as={AiOutlineQuestionCircle} />
            </Flex>
          </Tooltip>
        </Flex>
      )}
      {memberList.length ? (
        <>
          {memberList.map(member => (
            <Flex flexDirection='column' key={member.memberAddress}>
              {member.name ? (
                <StaticAvatar
                  address={member.memberAddress}
                  avatarImg={
                    member.avatarImg &&
                    `https://ipfs.infura.io/ipfs/${member.avatarImg}`
                  }
                  name={member.name}
                  hideCopy
                />
              ) : (
                <AddressAvatar
                  addr={member.memberAddress}
                  hideCopy
                  fontSize='lg'
                />
              )}
              <Flex
                alignItems='center'
                justifyContent='flex-start'
                ml={1}
                mt='10px'
                mb={6}
              >
                <Flex flexDirection='column' width='33%'>
                  <Text fontSize='lg'>{member.shares}</Text>
                  <Text fontSize='xs' color='gray.500' mt={1}>
                    Shares
                  </Text>
                </Flex>
                <Flex flexDirection='column' width='33%'>
                  <Text>
                    {((member.shares / totalShares) * 100).toFixed(2)}%
                  </Text>
                  <Text fontSize='xs' color='gray.500' mt={1}>
                    Voting Power
                  </Text>
                </Flex>
                <Flex flexDirection='column' width='33%'>
                  <Text>{member.loot}</Text>
                  <Text fontSize='xs' color='gray.500' mt={1}>
                    Loot
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          ))}

          {remainingCount > 0 && (
            <DaohausLink
              linkText={`View ${remainingCount} more on DAOHaus`}
              project={project}
              route='/members'
            />
          )}
        </>
      ) : (
        <Flex flexDirection='column' alignItems='center'>
          <Spinner color='secondary.500' />
          <Text>Loading</Text>
        </Flex>
      )}
    </Box>
  );
};

export default CoreTeamList;
