import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

type Props = {
  title: string;
  imgSrc: string;
};

export const QuestCard = ({ title, imgSrc }: Props) => {
  return (
    <Flex
      borderRadius={'lg'}
      justifyContent={'space-between'}
      alignItems={'center'}
      bg={'navy'}
      w={'100%'}
      p={'16px'}
      gap={'8px'}
    >
      <ImageFrame transform='rotate(5deg)'>
        <Image
          alt={title}
          src={imgSrc}
          maxH={'80px'}
          maxW={'80px'}
          zIndex={2}
        />
      </ImageFrame>
      <Text
        fontWeight={'bold'}
        fontSize={'20px'}
        color={'white'}
        noOfLines={2}
        wordBreak={'break-all'}
      >
        {title}
      </Text>
      <Icon as={IoIosArrowForward} boxSize={'16px'} color={'main.gray'} />
    </Flex>
  );
};

const ImageFrame = ({
  transform,
  children,
}: {
  transform: string;
  children: ReactNode;
}) => {
  return (
    <Box
      p={'4px'}
      bg={'white'}
      position={'relative'}
      rotate={'30deg'}
      transform={transform}
    >
      {children}
      <Box
        zIndex={3}
        position={'absolute'}
        top={0}
        left={0}
        w={'full'}
        h={'full'}
        filter={'auto'}
        blur={'1px'}
        opacity={0.4}
        bg={'white'}
      />
    </Box>
  );
};
