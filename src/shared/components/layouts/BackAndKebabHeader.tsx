import { Box, Flex, Icon, Menu, MenuButton, Spacer } from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/router';
import { BsThreeDotsVertical } from 'react-icons/bs';

type Props = {
  children?: React.ReactNode
}
export const BackAndKebabHeader = ({ children }: Props) => {
  const router = useRouter();
  return (
    <Flex borderBottom={'1px'} borderColor={'gray.300'}>
      <Box onClick={() => { router.back() }} paddingY={'2'}>
        <Icon as={IoIosArrowBack} boxSize={'32px'} />
      </Box>
      <Spacer />
      {children &&
        <Menu>
          <MenuButton paddingY={'2'} paddingX={'2'}>
            <Icon as={BsThreeDotsVertical} boxSize={'32px'} />
          </MenuButton>
          {children}
        </Menu>
      }
    </Flex>
  );
};
