import { Avatar, Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authClient } from 'libs/axios/client';

type Response = {
  uuid: string;
  screenName: string;
  iconUrl: string;
  linkedUser: {
    username: string;
  }
  memo: string;
}

export const Header = ({
  title,
}: {
  title: string;
  iconSrc?: string;
}) => {

  const { data } = useQuery<Response, AxiosError>({
    queryKey: ['myProfile'],
    queryFn: () =>
      authClient(localStorage.getItem('access-token') as string)
        .get<Response>('/profiles/me')
        .then(res => res.data),
  });
  console.log(`my profile: ${data}`)

  return (

    <Flex minWidth='max-content' alignItems='center' gap='2' paddingTop='8'>
      <Box>
        <Heading size='lg'>{title}</Heading>
      </Box>
      <Spacer />
      <Avatar size={'lg'} src={data && `${process.env.NEXT_PUBLIC_IMAGE_ORIGIN}${data.iconUrl}`} />
    </Flex>
  )
};
