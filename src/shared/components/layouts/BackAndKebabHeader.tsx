
import { Flex, Icon, Link, Spacer } from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import NextLink from 'next/link';

export const BackAndKebabHeader = ({ backHref, kebabHref }: { backHref: string; kebabHref: string; }) => {
  return (
    <Flex borderBottom={'1px'} borderColor={'gray.300'}>
      <Link as={NextLink} href={backHref} passHref paddingY={'2'}>
        <Icon as={IoIosArrowBack} boxSize={'32px'} />
      </Link>
      <Spacer />
      <Link as={NextLink} href={kebabHref} passHref paddingY={'2'} paddingX={'2'}>
        <Icon as={BsThreeDotsVertical} boxSize={'32px'} />
      </Link>
    </Flex>
  );
};
