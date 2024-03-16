import { Text } from '@chakra-ui/react';
import type { GetServerSideProps, NextPageWithLayout } from 'next';
import { Layout } from 'shared/components/layouts/Layout';

const Home: NextPageWithLayout = () => {
  return <Text>aaa</Text>;
};

Home.getLayout = page => <Layout>{page}</Layout>;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/feed',
      permanent: false,
    },
  };
};
export default Home;
