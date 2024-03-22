import { HStack, Icon } from '@chakra-ui/react';
import { RiTreasureMapLine } from 'react-icons/ri';
import { MdOutlineAddBox } from 'react-icons/md';
import { FiHome } from 'react-icons/fi';
import Link from 'next/link';

export const BottomMenu = () => {
  return (
    <HStack
      py={'16px'}
      px={'12%'}
      w='100vw'
      justifyContent={'space-between'}
      borderTop={'1px'}
      borderColor={'gray.300'}
      bg={'white'}
    >
      <Link href='/feed' passHref>
        <Icon as={FiHome} boxSize={'32px'} />
      </Link>
      <Link href={'/memory/create'} passHref>
        <Icon as={MdOutlineAddBox} boxSize={'32px'} />
      </Link>
      <Link href='/quest' passHref>
        <Icon as={RiTreasureMapLine} boxSize={'32px'} />
      </Link>
    </HStack>
  );
};
