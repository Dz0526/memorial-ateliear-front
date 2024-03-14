import { Flex, Icon, Link } from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';
import NextLink from 'next/link';

export const BackHeader = ({ href }: { href: string }) => {
  return (
    <Flex borderBottom={'1px'} borderColor={'gray.300'}>
      <Link as={NextLink} href={href} passHref>
        <Icon as={IoIosArrowBack} boxSize={'32px'} />
      </Link>
    </Flex>
  );
};
