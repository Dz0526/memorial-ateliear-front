import { Avatar, Box, Flex, Heading } from '@chakra-ui/react';

type Props = {
  screenName: string;
  iconImageUrl: string | undefined;
};

export const UserCardBanner = ({ screenName, iconImageUrl }: Props) => {
  return (
    <Flex flex='1' gap='3' alignItems='center' flexWrap='wrap'>
      <Avatar size='sm' name={screenName} src={iconImageUrl} />

      <Box>
        <Heading size='sm'>{screenName}</Heading>
      </Box>
    </Flex>
  );
};
