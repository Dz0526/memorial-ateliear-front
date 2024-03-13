import { Image, Box, Card, CardBody, Center, Flex, Heading, Spacer, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import type { NextPageWithLayout } from 'next';
import { ChekiCard } from 'shared/components/feed/ChekiCard';
import { Layout } from 'shared/components/layouts/Layout';

const Feed: NextPageWithLayout = () => {
  return (
    <Box minHeight={'100vh'} width={'100vw'}>
      <TemporaryHeader />
      <FeedTab />
    </Box>
  );
};

const TemporaryHeader = () => (
  <Flex minWidth='max-content' alignItems='center' gap='2' paddingX='4' paddingTop='8'>
    <Box>
      <Heading size='lg'>Your Feed</Heading>
    </Box>
    <Spacer />
    <Center bg='gray' h='16' w='16' alignContent='center' borderRadius='50%' marginRight='2'>image</Center>
  </Flex>
)

const FeedTab = () => {
  return (
    <Tabs paddingTop='4' isFitted variant='enclosed'>
      <TabList>
        <Tab>
          <Text fontWeight='semibold'>Random</Text>
        </Tab>
        <Tab>
          <Text fontWeight='semibold'>Chronological</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <RandomFeedTabPanel />
        <TabPanel>
          Chronological panel content is here.
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

const RandomFeedTabPanel = () => {
  return (
    <TabPanel>
      <VStack spacing={4} paddingBottom={36}>

        <ChekiCard />
        <ChekiCard />

        <SoferCard />
        <SoferCard />
      </VStack>
    </TabPanel>
  );
}

const SoferCard = () => {
  return (
    <Card maxW='sm'>
      <CardBody>
        <Image
          src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          alt='Green double couch with wooden legs'
          borderRadius='sm'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>Living room Sofa</Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design with a
            sprinkle of vintage design.
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

Feed.getLayout = page => <Layout>{page}</Layout>;

export default Feed;
