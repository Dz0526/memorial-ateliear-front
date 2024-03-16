import { Avatar, Box, Flex, Heading } from '@chakra-ui/react';

type Props = {
  screenName: string;
  iconImageUrl: string | undefined;
  iconSize?: string;
};

export const UserCardBanner = ({ screenName, iconImageUrl, iconSize }: Props) => {
  return (
    <Flex flex='1' gap='3' alignItems='center' flexWrap='wrap'>
      <Avatar size={iconSize ?? 'sm'} name={screenName} src={iconImageUrl} />

      <Box>
        <Heading size='sm'>{screenName}</Heading>
      </Box>
    </Flex>
  );
};
