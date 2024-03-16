
import { Box, Flex, Icon, Link, Spacer } from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export const BackAndKebabHeader = ({ kebabHref }: { backHref: string; kebabHref: string; }) => {
  const router = useRouter();
  return (
    <Flex borderBottom={'1px'} borderColor={'gray.300'}>
      <Box onClick={() => { router.back() }} paddingY={'2'}>
        <Icon as={IoIosArrowBack} boxSize={'32px'} />
      </Box>
      <Spacer />
      <Link as={NextLink} href={kebabHref} passHref paddingY={'2'} paddingX={'2'}>
        <Icon as={BsThreeDotsVertical} boxSize={'32px'} />
      </Link>
    </Flex>
  );
};
