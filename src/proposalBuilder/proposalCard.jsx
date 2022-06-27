import React from 'react';
import { Flex, Center } from '@chakra-ui/react';
import { useWallet } from '@raidguild/quiver';

// import { useDaoMember } from '../contexts/DaoMemberContext';
// import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import ContentBox from '../components/contentBox';
// import PropActions from './proposalActionFactory';

import { getVoteData } from '../utils/proposalCardUtils';
// import useMinionAction from '../hooks/useMinionAction';
import ProposalCardBrief from './proposalBrief';
// import { PropActionBox, TopStatusBox } from './proposalActionPrimitives';
import VotingPeriod from './votingPeriod';

// const ProposalCard = ({ proposal, interaction }) => {
const ProposalCard = ({ proposal }) => {
  //   const { address } = useInjectedProvider();
  const { address } = useWallet();
  // const { daoMember, isMember } = useDaoMember();
  //   const { minionAction, executeTX } = proposal?.minion
  //     ? useMinionAction(proposal)
  //     : {};
  const minionAction = null;

  // const { canInteract } = interaction || {};

  // const voteData = getVoteData(proposal, address, daoMember);
  const voteData = getVoteData(proposal, address, false);

  return (
    <ContentBox p='1' mb={4} minHeight='10rem'>
      <Flex flexDir={['column', 'column', 'row']}>
        <ProposalCardBrief proposal={proposal} minionAction={minionAction} />
        <Center minHeight={['0', '0', '10rem']} />
        <Flex
          w={['100%', '100%', '45%']}
          mb={['4', '4', '0', '0']}
          mt={['4', '4', '0']}
        >
          {/* <PropActions
            proposal={proposal}
            canInteract={canInteract}
            voteData={voteData}
            isMember={isMember}
            minionAction={minionAction}
            executeTX={executeTX}
          /> */}
          <VotingPeriod proposal={proposal} voteData={voteData} />
        </Flex>
      </Flex>
    </ContentBox>
  );
};

export default ProposalCard;
