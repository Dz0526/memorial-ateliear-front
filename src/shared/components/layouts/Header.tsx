import { Box, Center, Flex, Heading, Spacer } from '@chakra-ui/react';

export const Header = ({
  title,
  iconSrc,
}: {
  title: string;
  iconSrc?: string;
}) => (
  <Flex minWidth='max-content' alignItems='center' gap='2' paddingTop='8'>
    <Box>
      <Heading size='lg'>{title}</Heading>
    </Box>
    <Spacer />
    <Center
      bg='gray'
      h='16'
      w='16'
      alignContent='center'
      borderRadius='50%'
      marginRight='2'
    >
      image
    </Center>
  </Flex>
);
