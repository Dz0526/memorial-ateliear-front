import React from 'react';
import { Layout } from 'shared/components/layouts/Layout';
import type * as next from 'next';
import { BackAndKebabHeader } from 'shared/components/layouts/BackAndKebabHeader';
import {
  Text,
  Flex,
  HStack,
  Image,
  Heading,
  Stack,
  Box,
} from '@chakra-ui/react';
import { UserCardBanner } from 'shared/components/feed/UserCardBanner';
import { RainbowButton } from 'shared/components/RainbowButton';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { authClient } from 'libs/axios/client';
import { useRouter } from 'next/router';
import { ImageMemory } from 'pages/feed';
import { AxiosError } from 'axios';
import { getAuthorizationProps } from 'middleware/getAuthorizationProps';

const Memory: next.NextPageWithLayout = () => {
  const router = useRouter();
  const uuid = router.query.id;
  const { data } = useQuery<ImageMemory, AxiosError>({
    queryKey: [`memory-detail-${uuid}`],
    queryFn: () =>
      authClient(localStorage.getItem('access-token') as string)
        .get<ImageMemory>(`/image-memories/${uuid}`)
        .then(res => res.data),
    enabled: !!uuid,
  });
  return (
    <Box paddingBottom={'40'}>
      <BackAndKebabHeader />
      {/* Imamge */}
      {data && (
        <>
          <Flex justify='center'>
            <Image
              src={process.env.NEXT_PUBLIC_STORAGE_ORIGIN + data.imageUrl}
              alt='memory'
              maxHeight={'70vh'}
            />
          </Flex>

          {/* 詳細情報 */}
          <Stack spacing={'8'} paddingX={'4'} marginTop={'4'}>
            {/* caption and when */}
            <Stack>
              <Heading variant={'handwriting'} size={'lg'}>
                {data.caption}
              </Heading>
              <HStack alignItems={'end'} spacing={'1'}>
                <Text
                  variant={'handwriting'}
                  fontSize={'sm'}
                  fontWeight={'bold'}
                >
                  {data?.timeLabel}
                </Text>
                <Text variant={'handwriting'} fontSize={'sm'}>
                  の思い出
                </Text>
              </HStack>
            </Stack>

            {/* members */}
            <Stack spacing={4}>
              <Heading size={'sm'}>思い出のメンバー</Heading>
              <Stack spacing={4} paddingLeft={2}>
                {data.member_profiles.map(member => (
                  <UserCardBanner
                    key={member.uuid}
                    {...member}
                    iconImageUrl={
                      member.iconUrl
                        ? `${process.env.NEXT_PUBLIC_STORAGE_ORIGIN}${member.iconUrl}`
                        : ''
                    }
                  />
                ))}
              </Stack>
            </Stack>

            <RainbowButton>
              <Link href={`/memory/${data?.uuid}/quest/create`} passHref>
                この思い出からクエストを作成する
              </Link>
            </RainbowButton>
          </Stack>
        </>
      )}
    </Box>
  );
};

Memory.getLayout = page => <Layout>{page}</Layout>;

export const getServerSideProps: next.GetServerSideProps =
  getAuthorizationProps;
export default Memory;
