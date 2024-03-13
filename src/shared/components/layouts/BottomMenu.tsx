import { HStack, Icon } from '@chakra-ui/react';
import { RiTreasureMapLine } from 'react-icons/ri';
import { BiPhotoAlbum } from 'react-icons/bi';
import { MdOutlineAddBox } from 'react-icons/md';
import { IoSearch } from 'react-icons/io5';
import { FiHome } from 'react-icons/fi';

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
      <Icon as={FiHome} boxSize={'32px'} />
      <Icon as={IoSearch} boxSize={'32px'} />
      <Icon as={MdOutlineAddBox} boxSize={'32px'} />
      <Icon as={BiPhotoAlbum} boxSize={'32px'} />
      <Icon as={RiTreasureMapLine} boxSize={'32px'} />
    </HStack>
  );
};
