import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import Icon from '@chakra-ui/icon';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

const ProjectDetailsNotice = ({ children, title, toolLabel, toolContent }) => {
  return (
    <Box>
      <Flex justify='space-between' align='center' mb={2} fontSize='xs'>
        <Text textTransform='uppercase'>{title}</Text>

        <Tooltip
          hasArrow
          shouldWrapChildren
          padding={3}
          color='#ED963A'
          placement='bottom'
          label={toolContent}
        >
          <Flex alignItems='center' color='#ED963A'>
            <Icon mr={1} mt='2px' as={AiOutlineQuestionCircle} />
            {toolLabel}
          </Flex>
        </Tooltip>
      </Flex>
      <Flex
        direction='column'
        border='1px solid'
        borderColor='secondary.500'
        borderRadius='10'
        padding={5}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default ProjectDetailsNotice;