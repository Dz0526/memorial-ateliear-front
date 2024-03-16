import React from 'react'
import { Layout } from 'shared/components/layouts/Layout';
import type * as next from 'next';
import { BackAndKebabHeader } from 'shared/components/layouts/BackAndKebabHeader';
import { Heading, Stack, Box, Text, Button, HStack, } from '@chakra-ui/react';
import { UserCardBanner } from 'shared/components/feed/UserCardBanner';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authClient } from 'libs/axios/client';
import Link from 'next/link';
import { FaUserCheck, } from 'react-icons/fa6';

type Profile = {
  uuid: string;
  screenName: string;
  iconUrl: string;
  linkedUser: {
    username: string;
  }
  memo: string;
};

type Response = {
  profiles: Profile[];
  count: number;
}

const Memory: next.NextPageWithLayout = () => {

  const { data } = useQuery<Response, AxiosError>({
    queryKey: ['myProfile'],
    queryFn: () =>
      authClient(localStorage.getItem('access-token') as string)
        .get<Response>('/profiles/')
        .then(res => res.data),
  });

  return (
    <Box paddingBottom={'40'}>
      <BackAndKebabHeader backHref='/feed' kebabHref='edit' />
      <Stack spacing={'8'} paddingX={'4'} paddingBottom={40} marginTop={'8'}>

        {/* members */}
        <Heading size={'md'}>あなたが作成したプロフィール一覧</Heading>
        <Stack spacing={4} paddingLeft={2}>
          {
            data && data.profiles && (
              data.count === 0 ?
                <>
                  <Text>作成したプロフィールはありません</Text>
                  <Button size='sm' variant='outline'>プロフィールを作成する</Button>
                </>
                : (
                  data.profiles.map(({ uuid, screenName, iconUrl, linkedUser }) => (
                    <Link key={uuid} href={`profile/${uuid}`} passHref>
                      <HStack>
                        <UserCardBanner iconSize='md' iconImageUrl={iconUrl ? `${process.env.NEXT_PUBLIC_STORAGE_ORIGIN}${iconUrl}` : undefined} screenName={screenName} />
                        {
                          linkedUser &&
                          <FaUserCheck color='green' size={20} />
                        }
                      </HStack>
                    </Link>
                  ))
                )
            )

          }
        </Stack>
      </Stack>


    </Box>
  );
}

Memory.getLayout = page => <Layout>{page}</Layout>;
export default Memory
