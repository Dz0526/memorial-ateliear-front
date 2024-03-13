import { Text } from '@chakra-ui/react';
import type { NextPageWithLayout } from 'next';
import { Layout } from 'shared/components/layouts/Layout';

const Home: NextPageWithLayout = () => {
  return <Text>aaa</Text>;
};

Home.getLayout = page => <Layout>{page}</Layout>;

export default Home;
