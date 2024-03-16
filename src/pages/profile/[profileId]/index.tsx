import React from 'react'
import { Layout } from 'shared/components/layouts/Layout';
import type * as next from 'next';
import { BackAndKebabHeader } from 'shared/components/layouts/BackAndKebabHeader';
import { Text, VStack, HStack, Heading, Box, Button, Stack, Spinner, Center, Avatar } from '@chakra-ui/react';
import { FaUserCheck } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { AxiosError } from 'axios';
import { authClient } from 'libs/axios/client';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

type Profile = {
  uuid: string,
  screenName: string,
  iconUrl: string,
  linkedUser: {
    username?: string
  },
  memo: string
}

const Memory: next.NextPageWithLayout = () => {
  const router = useRouter();
  const { data, isLoading, error } = useQuery<Profile, AxiosError>({
    queryKey: ['profile'],
    queryFn: () =>
      authClient(localStorage.getItem('access-token') as string)
        .get<Profile>(`/profiles/${router.query.profileId}`)
        .then(res => res.data),
  });

  const isLinked = data && data.linkedUser && data.linkedUser.username;

  return (

    <Box paddingBottom={'40'}>
      <BackAndKebabHeader backHref='/profiles' kebabHref='edit' />
      {
        isLoading &&
        <Center minHeight={'50vh'}>
          <Spinner size='xl' />
        </Center>

      }
      {
        error && <Text color={'red'}>Error: {error.message}</Text>
      }
      {data && (
        <Stack spacing={8}>

          {/* icon and name */}
          <VStack paddingTop={8} spacing={'4'}>
            <Avatar src={`${process.env.NEXT_PUBLIC_IMAGE_ORIGIN}${data.iconUrl}`} name={data.screenName} boxSize={'100px'} />
            <Heading size="md">{data.screenName}</Heading>
          </VStack>

          <Stack spacing={4}>
            {/* linked user status */}
            {
              isLinked ? (
                <HStack justifyContent={'center'}>
                  <FaUserCheck color='green' size={16} />
                  <Text fontWeight={'semibold'}>{data.linkedUser.username}</Text>
                </HStack>
              ) : (
                <HStack justifyContent={'center'}>
                  <Button leftIcon={<FaUserPlus color='gray' size={16} />} size={'sm'}>ユーザと紐付ける</Button>
                </HStack>

              )
            }

            {/* edit button */}
            <HStack justifyContent={'center'}>
              <Button size={'sm'}>プロフィールを編集</Button>
            </HStack>
          </Stack>

        </Stack>
      )}

    </Box>
  );
}

Memory.getLayout = page => <Layout>{page}</Layout>;
export default Memory
