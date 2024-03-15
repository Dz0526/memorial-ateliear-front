import React from 'react'
import { Layout } from 'shared/components/layouts/Layout';
import type * as next from 'next';
import { BackAndKebabHeader } from 'shared/components/layouts/BackAndKebabHeader';
import { Text, Flex, HStack, Image, Heading, Stack, Box } from '@chakra-ui/react';
import { UserCardBanner } from 'shared/components/feed/UserCardBanner';
import { RainbowButton } from 'shared/components/RainbowButton';

const mockedMemory = {
  id: 'sampleMemoryId',
  imageUrl: 'https://i.postimg.cc/g0ffYX8d/IMG-6315.jpg',
  caption: 'キャンプの思い出',
  memoryTimeContext: '2024年3月',
  members: [
    {
      id: '1',
      screenName: 'Daiki Ito',
      iconImageUrl: '',
    },
    {
      id: '2',
      screenName: 'Manato Kato',
      iconImageUrl: '',
    },
    {
      id: '3',
      screenName: 'Taishi Naka',
      iconImageUrl: '',
    },
  ],
}


const Memory: next.NextPageWithLayout = () => {
  return (
    <Box paddingBottom={'40'}>
      <BackAndKebabHeader backHref='/feed' kebabHref='edit' />
      {/* Imamge */}
      <Flex justify="center">
        <Image
          src={mockedMemory.imageUrl}
          alt='memory'
          maxHeight={'70vh'}
        />
      </Flex>

      {/* 詳細情報 */}
      <Stack spacing={'8'} paddingX={'4'} marginTop={'4'}>

        {/* caption and when */}
        <Stack>
          <Heading size={'lg'}>{mockedMemory.caption}</Heading>
          <HStack alignItems={'end'} spacing={'1'}>
            <Text fontSize={'sm'} fontWeight={'bold'}>{mockedMemory.memoryTimeContext}</Text>
            <Text fontSize={'sm'}>の思い出</Text>
          </HStack>
        </Stack>

        {/* members */}
        <Stack spacing={4}>
          <Heading size={'sm'}>思い出のメンバー</Heading>
          <Stack spacing={4} paddingLeft={2}>
            {mockedMemory.members.map((member) => (
              <UserCardBanner key={member.id} {...member} />
            ))}
          </Stack>
        </Stack>

        <RainbowButton />
      </Stack>

    </Box>
  );
}

Memory.getLayout = page => <Layout>{page}</Layout>;
export default Memory
