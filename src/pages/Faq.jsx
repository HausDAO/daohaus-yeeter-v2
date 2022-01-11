import React from 'react';
import { Box, Link, Text } from '@chakra-ui/layout';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion';

const ParagraphText = props => {
  const { children } = props;
  return (
    <Text mb={3} {...props}>
      {children}
    </Text>
  );
};

const Faq = () => {
  return (
    <Box p={10}>
      <Text fontSize='2xl' mb={5}>
        FAQ
      </Text>

      <Text fontSize='xl' textTransform='uppercase' mb={3} fontWeight='700'>
        General
      </Text>
      <Accordion allowToggle borderColor='gray.600'>
        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left' fontSize='lg'>
                What is DAOhaus Yeeter?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ParagraphText>
              The DAOhaus Yeeter is a trustless crowdfunding platform for web3
              projects.{' '}
            </ParagraphText>
            <ParagraphText>
              It is the easiest way for teams to fund their project and
              bootstrap their community into a DAO.
            </ParagraphText>

            <ParagraphText>
              Every DAOhaus Yeeter project comes with a DAO. When community
              members contribute funds to the project, they automatically become
              a member of the DAO and retain custody over their funds.
            </ParagraphText>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <AccordionButton>
            <Box flex='1' textAlign='left' fontSize='lg'>
              How does it work?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <ParagraphText>
              A DAOhaus Yeeter project consists of two main components: a Moloch
              DAO (accessible via the{' '}
              <Link to='https://app.daohaus.club' isExternal>
                DAOhaus app
              </Link>{' '}
              and a Yeeter smart contract.
            </ParagraphText>
            <ParagraphText>
              The Yeeter contract has special permissions within the Moloch DAO
              that allow it to create new Loot shares in the DAO when somebody
              sends funds to the Yeeter. The Yeeter also forwards funds it
              receives to the funds to the DAO treasury.
            </ParagraphText>
            <ParagraphText>
              When a contributor sends funds to a DAOhaus Yeeter project, two
              things happen:
            </ParagraphText>
            <ParagraphText pl={4}>
              1. They receive Loot shares in the DAO. This means that they are a
              member of the DAO, and can -- at any time! -- redeem
              (&quot;ragequit&quot;) their Loot shares to receive their portion
              of the funds. This is how they retain custody of their funds.
            </ParagraphText>
            <ParagraphText pl={4}>
              2. The funds end up in the DAO treasury. From here, the DAO can
              create proposals to spend the funds on the project.
            </ParagraphText>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <AccordionButton>
            <Box flex='1' textAlign='left' fontSize='lg'>
              Why use DAOhaus Yeeter?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <ParagraphText>
              These days, there are lots of ways for a project to quickly raise
              funds for a new web3 project. But most of them leave contributors
              to trust the project team with their funds.
            </ParagraphText>
            <ParagraphText>
              Instead, DAOhaus Yeeter empowers contributors by giving them a
              share of the DAO that controls the project&apos;s funds, including
              full custody over their portion.
            </ParagraphText>
            <ParagraphText>
              This is fantastic for contributors, who can contribute funds with
              much more confidence that they won&apos;t be squandered (or even
              rugged!). If they later see something they don&apos;t like, they
              can always pull their funds out.
            </ParagraphText>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <AccordionButton>
            <Box flex='1' textAlign='left' fontSize='lg'>
              What networks is DAOhaus Yeeter available on?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <ParagraphText>
              DAOhaus Yeeter is currently available on Rinkeby (testnet) and
              Gnosis Chain and soon on Ethereum Mainnet, Arbitrum, and Polygon.
            </ParagraphText>
            <ParagraphText>
              If you&apos;d like to use DAOhaus Yeeter on another network, let
              us know in the{' '}
              <Link to='https://discord.gg/daohaus' isExternal>
                DAOhaus Discord
              </Link>{' '}
            </ParagraphText>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <AccordionButton>
            <Box flex='1' textAlign='left' fontSize='lg'>
              What are the risks?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <ParagraphText>
              As a capital contributor to a DAOhaus Yeeter project, it is your
              responsibility to stay aware of the DAO proposals created by the
              project team. If you are not paying attention, you run the risk of
              a malicious project team passing and executing a proposal to steal
              the funds (or simply spend them in a way you don&apos;t like)
              before you are able to ragequit your Loot shares to withdraw your
              funds.
            </ParagraphText>
            <ParagraphText>
              You can see the list of active proposals in the DAO. If you want
              to receive push notifications for new proposals, ask the project
              team to set up Discord notifications for DAO proposals via the
              DAOhaus Discord Boost.
            </ParagraphText>
            <ParagraphText mb={1}>
              Always double check the following before sending funds to a
              DAOhaus Yeeter project:
            </ParagraphText>
            <ParagraphText pl={4} mb={1}>
              1. You have the correct Yeeter address for the project.
            </ParagraphText>
            <ParagraphText pl={4} mb={1}>
              2. Your wallet is connected to the correct network. Projects may
              be created on a number of different networks. If you send funds to
              the correct address on the wrong network, your funds will likely
              be lost.
            </ParagraphText>
            <ParagraphText pl={4}>
              3. The amount you are sending is within the min and max
              contribution range. The Yeeter contract will reject your
              transaction if you send too little or too much so your funds will
              be safe, but you will lose the gas fee for that transaction.
            </ParagraphText>
            <ParagraphText>
              As with any app built on smart contracts, there are also hack or
              bug risks. See the next question about audits for more info.
            </ParagraphText>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <AccordionButton>
            <Box flex='1' textAlign='left' fontSize='lg'>
              Are the smart contracts audited?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <ParagraphText>
              The DAOhaus Yeeter platform uses four smart contracts: the{' '}
              <Link
                to='https://github.com/HausDAO/Moloch2.5/blob/main/contracts/MolochSummoner.sol'
                isExternal
              >
                MolochV2.5
              </Link>
              , the{' '}
              <Link
                to='https://github.com/HausDAO/Moloch2.5/blob/main/contracts/Yeeter.sol'
                isExternal
              >
                Yeeter.sol
              </Link>{' '}
              contract, the{' '}
              <Link to='https://github.com/HausDAO/MinionSummonerV2' isExternal>
                Safe Minion
              </Link>{' '}
              contract, and the{' '}
              <Link to='https://github.com/gnosis/safe-contracts' isExternal>
                Gnosis Safe
              </Link>{' '}
              contract.
            </ParagraphText>
            <ParagraphText>
              The MolochV2.5 contract is based heavily on the{' '}
              <Link to='https://github.com/MolochVentures/moloch' isExternal>
                MolochV2 code
              </Link>
              , which has been audited and in heavy use for 2 years with no
              security incidents. The minimal changes introduced by V2.5,
              however, have not been audited.
            </ParagraphText>
            <ParagraphText>
              The Yeeter.sol contract has not yet been audited.
            </ParagraphText>
            <ParagraphText>
              The Safe Minion contract has been{' '}
              <Link to='https://hackmd.io/R5wgG1zuSZ-p6Sbne5eF6w' isExternal>
                audited by the Gnosis team
              </Link>{' '}
              It has been used by many DAOhaus DAOs since November 2021, with no
              security incidents.
            </ParagraphText>

            <ParagraphText>
              The Gnosis Safe contracts have received{' '}
              <Link
                to='https://github.com/gnosis/safe-contracts#audits-formal-verification'
                isExternal
              >
                multiple audits
              </Link>{' '}
              and have protected billions of dollars over multiple years without
              incident.
            </ParagraphText>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <AccordionButton>
            <Box flex='1' textAlign='left' fontSize='lg'>
              What is a DAO?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <ParagraphText>
              DAO stands for “Decentralized Autonomous Organization.” Because of
              the **“organization”** part, the term represents a group of people
              coming together to achieve a common purpose or goal. Unlike
              traditional organizations, the DAO is **decentralized** and
              software is used to coordinate DAO members toward the common
              purpose or goal <b>autonomously.</b>
            </ParagraphText>
            <ParagraphText mb={1}>
              To enable the organisation of DAO members in a decentralised and
              autonomous manner, most DAOs have the following characteristics:
            </ParagraphText>
            <ParagraphText pl={4} mb={1}>
              - Fluid Membership: Members can leave and join DAOs any time
            </ParagraphText>
            <ParagraphText pl={4} mb={1}>
              - Voting / Decision Process: Proposals and voting help DAO members
              decide collectively on all types of actions.
            </ParagraphText>
            <ParagraphText pl={4} mb={1}>
              - Shared Treasury: Community funds and assets (e.g. NFTs) are held
              and controlled by the DAO.
            </ParagraphText>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <AccordionButton>
            <Box flex='1' textAlign='left' fontSize='lg'>
              What are Shares and Loot Shares?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <ParagraphText>
              <b>Shares</b> grant Moloch DAO members two forms of power in the
              DAO. First, shares serve as voting rights on proposals to add new
              members, spend funds, etc. Second, they can be redeemed
              (&apos;ragequit&apos;) to receive a proportional amount of tokens
              from the DAO treasury. In a DAOhaus Yeeter project, members of the
              core project team typically have Shares in the DAO
            </ParagraphText>
            <ParagraphText>
              <b>Loot</b> is a type of Moloch DAO share that grants only the
              power to ragequit and receive proportional amount of tokens from
              the DAO treasury. In a DAOhaus Yeeter project, the capital
              contributors typically have Loot shares in the DAO.
            </ParagraphText>
            <ParagraphText>
              Neither Shares nor Loot can be tranfered or sold, even to other
              members of the DAO.
            </ParagraphText>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <AccordionButton>
            <Box flex='1' textAlign='left' fontSize='lg'>
              What is ragequit?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <ParagraphText>
              Ragequit allows a member of a Moloch DAO to redeem some or all of
              their shares (either Loot or full Shares) for a proportional
              amount of the tokens in the DAO treasury.
            </ParagraphText>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Text
        fontSize='xl'
        textTransform='uppercase'
        mb={3}
        mt={5}
        fontWeight='700'
      >
        For Project Teams
      </Text>
      <Accordion allowToggle borderColor='gray.600'>
        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left' fontSize='lg'>
                How much does it cost to use DAOhaus Yeeter?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ParagraphText>
              There is a 3% fee on all funds raised. This fee goes to{' '}
              <Link to='https://uberhaus.club/' isExternal>
                UberHaus
              </Link>
              , the DAO of DAOs that governs DAOhaus and it funds future upgrades, maintenance, and
              security audits. In your project DAO, a UberHaus-owned address will hold 3% of Loot (i.e. funds raised) 
            </ParagraphText>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left' fontSize='lg'>
                How does the DAOhaus Yeeter compare with other Web3 crowdfunding
                tools?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ParagraphText>todo</ParagraphText>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left' fontSize='lg'>
                How can we create a project on DAOhaus Yeeter?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ParagraphText>todo</ParagraphText>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Text
        fontSize='xl'
        textTransform='uppercase'
        mb={3}
        mt={5}
        fontWeight='700'
      >
        For Yeeters (aka Capital Contributors or Community Members)
      </Text>
      <Accordion allowToggle borderColor='gray.600'>
        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left' fontSize='lg'>
                How much does it cost to use DAOhaus Yeeter?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ParagraphText>
              For capital contributors, there are no fees from DAOhaus. The only
              cost to you are gas fees for sending funds to the project&apos;s
              address.
            </ParagraphText>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left' fontSize='lg'>
                How does the DAOhaus Yeeter compare with other Web3 crowdfunding
                tools?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ParagraphText>todo</ParagraphText>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderTopWidth='0px' borderBottomWidth='1px'>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left' fontSize='lg'>
                How can I start using DAOhaus Yeeter?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <ParagraphText>
              Head to the Projects page to explore current Yeeter projects that
              need your capital contributions.
            </ParagraphText>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default Faq;
