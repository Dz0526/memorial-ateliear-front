import { HStack, Icon } from '@chakra-ui/react';
import { RiTreasureMapLine } from 'react-icons/ri';
import { BiPhotoAlbum } from 'react-icons/bi';
import { MdOutlineAddBox } from 'react-icons/md';
import { IoSearch } from 'react-icons/io5';
import { FiHome } from 'react-icons/fi';
import Link from 'next/link';

export const BottomMenu = () => {
  return (
    <HStack
      p={'16px'}
      w='100vw'
      justifyContent={'space-between'}
      borderTop={'1px'}
      borderColor={'gray.300'}
      bg={'white'}
    >
      <Link href='/feed' passHref>
        <Icon as={FiHome} boxSize={'32px'} />
      </Link>
      <Icon as={IoSearch} boxSize={'32px'} />
      <Icon as={MdOutlineAddBox} boxSize={'32px'} />
      <Icon as={BiPhotoAlbum} boxSize={'32px'} />
      <Link href='/quest' passHref>
        <Icon as={RiTreasureMapLine} boxSize={'32px'} />
      </Link>
    </HStack>
  );
};
