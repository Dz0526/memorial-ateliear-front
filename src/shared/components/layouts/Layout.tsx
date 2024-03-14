import { Box } from '@chakra-ui/react';
import { BottomMenu } from './BottomMenu';
import { ReactNode } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box height={'100%'}>
      {children}
      <Box pos={'fixed'} bottom={0} zIndex={'banner'}>
        <BottomMenu />
      </Box>
    </Box>
  );
};
