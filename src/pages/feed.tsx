import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { getAuthorizationProps } from 'middleware/getAuthorizationProps';
import type * as next from 'next';
import { ChekiCard } from 'shared/components/feed/ChekiCard';
import { StickeyNoteCard } from 'shared/components/feed/StickeyNoteCard';
import { Bridge } from 'shared/components/feed/bridge/Bridge';
import { Layout } from 'shared/components/layouts/Layout';
import { AxiosError } from 'axios';
import { authClient } from 'libs/axios/client';
import { useQuery } from '@tanstack/react-query';
import { Header } from 'shared/components/layouts/Header';
import { ChekiCardForBridgeNodeMemory } from 'shared/components/feed/ChekiCardForBridgeNodeMemory';

export type Member = {
  uuid: string;
  screenName: string;
  iconUrl: string | null;
};

export type TextMemory = {
  memoryType: 'text-memory';
  uuid: string;
  timeLabel: string;
  title: string;
  content: string;
  description: string;
  member_profiles: Member[];
};

export type ImageMemory = {
  memoryType: 'image-memory';
  uuid: string;
  imageUrl: string;
  caption: string;
  timeLabel: string;
  member_profiles: Member[];
  description: string;
};

export type QuestAchievedMemory = {
  memoryType: 'quest-achievement-memory';
  uuid: string;
  imageUrl: string;
  timeLabel: string;
  timestamp: string;
  member_profiles: Member[];
  description: string;
  text: string;
};

type Response = {
  memories: (TextMemory | ImageMemory | QuestAchievedMemory)[];
};

const Feed: next.NextPageWithLayout = () => {
  return (
    <Box minHeight={'100vh'} width={'100vw'}>
      <Box px={6}>
        <Header title='Your Feed' />
      </Box>
      <FeedTab />
    </Box>
  );
};

const FeedTab = () => {
  return (
    <Tabs paddingTop='4' isFitted variant='enclosed'>
      <TabList>
        <Tab>
          <Text fontWeight='semibold'>Random</Text>
        </Tab>
        <Tab>
          <Text fontWeight='semibold'>Bridge</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <RandomFeedTabPanel />
        <BridgeFeedTabPanel />
      </TabPanels>
    </Tabs>
  );
};

const RandomFeedTabPanel = () => {
  const { data } = useQuery<Response, AxiosError>({
    queryKey: ['random-feed'],
    queryFn: () =>
      authClient(localStorage.getItem('access-token') as string)
        .get<Response>('/memories/random')
        .then(res => res.data),
  });
  return (
    <TabPanel>
      <VStack spacing={4} paddingBottom={36}>
        {data &&
          data.memories.map(memory =>
            memory.memoryType == 'image-memory' ? (
              <ChekiCard {...(memory as ImageMemory)} />
            ) : memory.memoryType == 'quest-achievement-memory' ? (
              <ChekiCardForBridgeNodeMemory
                {...(memory as QuestAchievedMemory)}
              />
            ) : (
              <StickeyNoteCard {...(memory as TextMemory)} />
            ),
          )}
      </VStack>
    </TabPanel>
  );
};

const BridgeFeedTabPanel = () => {
  return (
    <TabPanel>
      <Bridge />
    </TabPanel>
  );
};

Feed.getLayout = page => <Layout>{page}</Layout>;

export const getServerSideProps: next.GetServerSideProps =
  getAuthorizationProps;

export default Feed;
