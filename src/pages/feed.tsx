import {
  Box,
  Center,
  Flex,
  Heading,
  Spacer,
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
  members: Member[];
};

export type ImageMemory = {
  memoryType: 'image-memory';
  uuid: string;
  imageUrl: string;
  caption: string;
  timeLabel: string;
  members: Member[];
  description: string;
};

type Response = {
  memories: (TextMemory | ImageMemory)[];
};

const Feed: next.NextPageWithLayout = () => {
  return (
    <Box minHeight={'100vh'} width={'100vw'}>
      <TemporaryHeader />
      <FeedTab />
    </Box>
  );
};

const TemporaryHeader = () => (
  <Flex
    minWidth='max-content'
    alignItems='center'
    gap='2'
    paddingX='4'
    paddingTop='8'
  >
    <Box>
      <Heading size='lg'>Your Feed</Heading>
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
