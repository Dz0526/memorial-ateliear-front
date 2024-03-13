import { Box, HStack, Select, VStack } from '@chakra-ui/react';
import { NextPageWithLayout } from 'next';
import { Header } from 'shared/components/layouts/Header';
import { Layout } from 'shared/components/layouts/Layout';
import { QuestCard } from 'shared/components/quest/list/QuestCard';

// mockData
const quests = [
  {
    title: 'みんなで集まる',
    src: 'https://i.postimg.cc/g0ffYX8d/IMG-6315.jpg',
  },
  {
    title: 'みんなで集まる',
    src: 'https://i.postimg.cc/g0ffYX8d/IMG-6315.jpg',
  },
  {
    title: 'みんなで集まる',
    src: 'https://i.postimg.cc/g0ffYX8d/IMG-6315.jpg',
  },
  {
    title: 'みんなで集まる',
    src: 'https://i.postimg.cc/g0ffYX8d/IMG-6315.jpg',
  },
  {
    title: 'みんなで集まる',
    src: 'https://i.postimg.cc/g0ffYX8d/IMG-6315.jpg',
  },
  {
    title: 'みんなで集まる',
    src: 'https://i.postimg.cc/g0ffYX8d/IMG-6315.jpg',
  },
];

const Quest: NextPageWithLayout = () => {
  return (
    <Box px={4}>
      <Header title='Your Quests' />
      <Select w={'150px'} my={'16px'}>
        <option value={'not_complete'}>未達成</option>
        <option value={'complete'}>達成</option>
      </Select>
      <VStack pb={32}>
        {quests.map(quest => (
          <QuestCard key={quest.title} title={quest.title} imgSrc={quest.src} />
        ))}
      </VStack>
    </Box>
  );
};

Quest.getLayout = page => <Layout>{page}</Layout>;

export default Quest;
