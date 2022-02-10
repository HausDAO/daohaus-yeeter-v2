import React from 'react';
import { Flex, VStack, Heading, Text, Grid, Image } from '@chakra-ui/react';

const FeatureCard = ({
  title,
  content,
  fullWidthCopy,
  contentPosition,
  imgSrc,
  ...props
}) => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      p={{ base: 6, md: 10 }}
      backgroundColor='primary.500'
      borderRadius='17px'
      width='100%'
    >
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          lg: fullWidthCopy ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)',
        }}
        alignItems='center'
      >
        <Flex
          direction='column'
          spacing={8}
          maxW={imgSrc ? '400px' : 'auto'}
          h={{ base: imgSrc ? '300px' : '0', lg: imgSrc ? '360px' : '0' }}
          order={{ base: '1', lg: contentPosition === 'left' ? '2' : '1' }}
        >
          {imgSrc && (
            <Image
              alt=''
              w='full'
              h='full'
              objectFit='cover'
              objectPosition='center'
              src={imgSrc}
              ml={{ base: '0', lg: '25%' }}
            />
          )}
        </Flex>
        <Flex
          direction='column'
          justifyContent='center'
          alignItems='center'
          spacing={8}
          order={{ base: '2', lg: contentPosition === 'left' ? '1' : '2' }}
        >
          {title && (
            <Heading
              as='h2'
              fontSize={{ base: '20px', lg: '32px' }}
              lineHeight={{ base: '30px', lg: '42px' }}
              fontWeight={700}
              color='interfaceOrange.500'
              mb={10}
            >
              {title}
            </Heading>
          )}
          {content}
        </Flex>
      </Grid>
    </Flex>
  );
};

export default FeatureCard;
