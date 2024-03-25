import { Box, Link, Select, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { GetServerSideProps, NextPageWithLayout } from 'next';
import { Header } from 'shared/components/layouts/Header';
import { Layout } from 'shared/components/layouts/Layout';
import { QuestCard } from 'shared/components/quest/list/QuestCard';
import { ImageMemory, TextMemory } from './feed';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { authClient } from 'libs/axios/client';
import { getAuthorizationProps } from 'middleware/getAuthorizationProps';
import { useState } from 'react';

type Requirement = {
  uuid: string;
  detail: string;
};

export type Bridge = {
  uuid: string;
  name: string;
  originMemory: ImageMemory | TextMemory;
  requirements: Requirement[];
};

type GetBridgesResponse = {
  bridges: Bridge[];
  count: number;
};

const Quest: NextPageWithLayout = () => {
  const [category, setCategory] = useState('not_achieved');
  const { data } = useQuery<GetBridgesResponse, AxiosError>({
    queryKey: [category + '-bridges'],
    queryFn: () =>
      authClient(localStorage.getItem('access-token') as string)
        .get<GetBridgesResponse>(`/bridges/?filter=${category}`)
        .then(res => res.data),
  });
  return (
    <Box px={4}>
      <Header title='Your Quests' />
      <Select
        w={'150px'}
        my={'16px'}
        onChange={e => setCategory(e.target.value)}
      >
        <option value={'not_achieved'}>未達成</option>
        <option value={'achieved'}>達成</option>
      </Select>
      <VStack pb={32}>
        {data &&
          data.bridges.map(
            bridge =>
              bridge.originMemory.memoryType == 'image-memory' && (
                <Link
                  as={NextLink}
                  key={bridge.uuid}
                  href={`/memory/${bridge.originMemory.uuid}/quest/${bridge.uuid}`}
                  w={'100%'}
                >
                  <QuestCard
                    title={bridge.name}
                    imgSrc={
                      process.env.NEXT_PUBLIC_STORAGE_ORIGIN +
                      bridge.originMemory.imageUrl
                    }
                  />
                </Link>
              ),
          )}
      </VStack>
    </Box>
  );
};

Quest.getLayout = page => <Layout>{page}</Layout>;

export const getServerSideProps: GetServerSideProps = getAuthorizationProps;
export default Quest;
